<script setup lang="ts">
useSeoMeta({
  title: "Stroke Speech | About this project",
  description:
    "Aplicación AAC accesible para comunicación asistida, con soporte PWA, modo offline y síntesis de voz para rehabilitación del habla.",
});
</script>

<template>
  <section
    class="mx-auto w-full max-w-4xl px-6 py-8 text-[#1c1b1b] dark:text-[#f4f4f5]"
  >
    <div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
      <img
        src="/pwa-icon.svg"
        alt="Stroke Speech logo"
        class="h-16 w-16 rounded-2xl border border-default bg-default p-2"
      />

      <div>
        <h2 class="text-2xl font-semibold tracking-tight">
          About this project
        </h2>
        <p class="mt-1 text-sm text-[#4b5563] dark:text-[#d1d5db]">
          Stroke Speech - AAC (Augmentative and Alternative Communication)
        </p>
      </div>
    </div>

    <p class="mt-4 text-sm leading-6 text-[#4b5563] dark:text-[#d1d5db]">
      Stroke Speech es una aplicación web accesible para apoyar la comunicación
      de personas con dificultades del habla, especialmente en contextos de
      recuperación post-ictus. Permite seleccionar tarjetas de palabras y frases
      para expresar necesidades cotidianas mediante síntesis de voz.
    </p>

    <p class="mt-3 text-sm leading-6 text-[#4b5563] dark:text-[#d1d5db]">
      También funciona como Progressive Web App (PWA), por lo que puede
      instalarse en móvil y escritorio, trabajar offline y mantenerse
      actualizada automáticamente tras cada despliegue.
    </p>

    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <article class="rounded-xl border border-default bg-default p-4">
        <h3 class="text-sm font-semibold">Objetivos clave</h3>
        <p class="mt-2 text-sm text-[#4b5563] dark:text-[#d1d5db]">
          Comunicación inmediata, accesibilidad máxima y disponibilidad total
          con experiencia instalable y soporte sin conexión.
        </p>
      </article>

      <article class="rounded-xl border border-default bg-default p-4">
        <h3 class="text-sm font-semibold">Características principales</h3>
        <p class="mt-2 text-sm text-[#4b5563] dark:text-[#d1d5db]">
          Tarjetas personalizables, síntesis de voz, colores y emojis por
          tarjeta, modo eliminar seguro y PWA con auto-update.
        </p>
      </article>

      <article
        class="rounded-xl border border-default bg-default p-4 sm:col-span-2"
      >
        <h3 class="text-sm font-semibold">Tecnologías usadas</h3>
        <p class="mt-2 text-sm text-[#4b5563] dark:text-[#d1d5db]">
          Nuxt 4, Vue 3, Nuxt UI, Tailwind CSS 4, @vite-pwa/nuxt (Workbox),
          VueUse, TypeScript, ESLint y Vitest.
        </p>
      </article>
    </div>
  </section>
</template>
