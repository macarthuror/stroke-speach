<template>
  <div class="pointer-events-none fixed inset-0 z-[9999]">
    <div
      class="absolute bottom-4 right-4 overflow-hidden rounded-xl border-2 border-slate-700 bg-black shadow-2xl"
    >
      <video
        ref="videoElement"
        autoplay
        playsinline
        class="h-32 w-48 object-cover opacity-80"
      />
      <div
        v-if="!isReady"
        class="absolute inset-0 flex items-center justify-center bg-black/50 text-xs text-white"
      >
        Cargando modelo...
      </div>
    </div>

    <div
      ref="cursorElement"
      class="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-blue-500/80 shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all"
      :class="{
        'scale-150 bg-green-500 shadow-[0_0_25px_rgba(34,197,94,1)]':
          isBlinking
      }"
      :style="{ left: `${cursorX}px`, top: `${cursorY}px` }"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { FilesetResolver, FaceLandmarker } from '@mediapipe/tasks-vision'

// 1. Referencias del DOM y Estado
const videoElement = ref(null)
const isReady = ref(false)
const isBlinking = ref(false)

// Variables para el suavizado (Lerp)
const cursorX = ref(window.innerWidth / 2)
const cursorY = ref(window.innerHeight / 2)
let targetX = window.innerWidth / 2
let targetY = window.innerHeight / 2

// Controladores de MediaPipe y Loop
let faceLandmarker = null
let animationFrameId = null
let lastVideoTime = -1

// Control de clics (Cooldown)
let lastClickTime = 0
const CLICK_COOLDOWN_MS = 1500 // Esperar 1.5s entre clics para evitar repeticiones

// 2. Inicialización al montar el componente
onMounted(async () => {
  await inicializarMediaPipe()
  await encenderCamara()
})

// Limpieza cuando el componente se destruye
onBeforeUnmount(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (videoElement.value && videoElement.value.srcObject) {
    videoElement.value.srcObject.getTracks().forEach(track => track.stop())
  }
})

// 3. Cargar el motor de MediaPipe
async function inicializarMediaPipe() {
  const vision = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
  )

  faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
      delegate: 'GPU'
    },
    outputFaceBlendshapes: true, // Necesario para detectar parpadeo
    runningMode: 'VIDEO',
    numFaces: 1
  })
}

// 4. Encender la Webcam
async function encenderCamara() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480, facingMode: 'user' }
    })

    if (videoElement.value) {
      videoElement.value.srcObject = stream
      videoElement.value.addEventListener('loadeddata', () => {
        isReady.value = true
        iniciarBuclePrediccion()
      })
    }
  } catch (error) {
    console.error('Permiso de cámara denegado o error:', error)
  }
}

// 5. El Bucle Principal
async function iniciarBuclePrediccion() {
  const video = videoElement.value
  if (!video || !faceLandmarker) return

  const startTimeMs = performance.now()

  if (lastVideoTime !== video.currentTime) {
    lastVideoTime = video.currentTime
    const resultados = faceLandmarker.detectForVideo(video, startTimeMs)

    if (resultados.faceLandmarks.length > 0) {
      procesarRostro(resultados)
    }
  }

  // Suavizar el movimiento del cursor en cada frame (Interpolación Lineal - LERP)
  // Esto evita que el cursor tiemble con los micro-movimientos de la cámara
  cursorX.value += (targetX - cursorX.value) * 0.15
  cursorY.value += (targetY - cursorY.value) * 0.15

  animationFrameId = requestAnimationFrame(iniciarBuclePrediccion)
}

// 6. Lógica de Movimiento y Clics
function procesarRostro(resultados) {
  // A. Movimiento: Extraer el punto de la nariz (Índice 1)
  const nariz = resultados.faceLandmarks[0][1]

  // Mapear al tamaño de la pantalla. Se invierte la X (1 - nariz.x) porque la cámara actúa como espejo.
  targetX = (1 - nariz.x) * window.innerWidth
  targetY = nariz.y * window.innerHeight

  // B. Detección de parpadeo para el Clic
  const blendshapes = resultados.faceBlendshapes[0].categories
  const ojoIzq
    = blendshapes.find(b => b.categoryName === 'eyeBlinkLeft')?.score || 0
  const ojoDer
    = blendshapes.find(b => b.categoryName === 'eyeBlinkRight')?.score || 0

  // Si ambos ojos están cerrados más del 50%
  if (ojoIzq > 0.5 && ojoDer > 0.5) {
    isBlinking.value = true
    ejecutarClic()
  } else {
    isBlinking.value = false
  }
}

// 7. Simular el Clic en la Interfaz
function ejecutarClic() {
  const ahora = Date.now()
  // Validar Cooldown para no clickear 10 veces en un parpadeo lento
  if (ahora - lastClickTime < CLICK_COOLDOWN_MS) return

  lastClickTime = ahora

  // Ocultar temporalmente el cursor para que document.elementFromPoint no detecte el cursor mismo
  const cursorDOM = document.querySelector(
    '.pointer-events-none.fixed.inset-0'
  )
  if (cursorDOM) cursorDOM.style.display = 'none'

  // Buscar qué elemento real de HTML está debajo del cursor en este momento
  const elementoDebajo = document.elementFromPoint(
    cursorX.value,
    cursorY.value
  )

  if (cursorDOM) cursorDOM.style.display = 'block'

  if (elementoDebajo) {
    // Si encontramos un elemento, buscamos si es un botón o está dentro de un botón
    const boton = elementoDebajo.closest('button, a, [role="button"]')
    if (boton) {
      boton.click() // Disparamos el clic nativo del navegador

      // Feedback visual / auditivo opcional (un beep cortito)
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)()
        const osc = ctx.createOscillator()
        osc.frequency.value = 800
        osc.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.1)
      } catch (e) {}
    }
  }
}
</script>
