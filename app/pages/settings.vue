<script setup lang="ts">
useSeoMeta({
  title: "Ajustes generales",
  description:
    "Configuración general de Stroke Speech: tema visual y preferencias de uso.",
});

const lang = useLocalStorage<string>("speech-lang", "es-MX");
const pitch = useLocalStorage<number>("speech-pitch", 1);
const rate = useLocalStorage<number>("speech-rate", 1);

const langs = [
  { label: "Español (México)", value: "es-MX" },
  { label: "Español (España)", value: "es-ES" },
  { label: "English (US)", value: "en-US" },
  { label: "English (UK)", value: "en-GB" },
  { label: "中文 (Mandarin)", value: "zh-CN" },
  { label: "हिन्दी", value: "hi-IN" },
  { label: "Français", value: "fr-FR" },
  { label: "العربية", value: "ar-SA" },
  { label: "Português (BR)", value: "pt-BR" },
  { label: "Русский", value: "ru-RU" },
  { label: "Deutsch", value: "de-DE" },
  { label: "日本語", value: "ja-JP" },
  { label: "Indonesia", value: "id-ID" },
];

// TODO: Completar con los idiomas que soporta la API de voz, idealmente detectarlos dinámicamente
const langsTest = [
  {
    label: "Español (México)",
    text: "¡Hola! Soy una demo de voz",
    value: "es-MX",
  },
  {
    label: "Español (España)",
    text: "¡Hola! Soy una demo de voz",
    value: "es-ES",
  },
  { label: "English (US)", text: "Hello! I am a voice demo", value: "en-US" },
  { label: "English (UK)", text: "Hello! I am a voice demo", value: "en-GB" },
  { label: "中文 (Mandarin)", text: "你好！我是语音演示", value: "zh-CN" },
  { label: "हिन्दी", text: "नमस्ते! मैं एक आवाज़ डेमो हूँ", value: "hi-IN" },
  {
    label: "Français",
    text: "Bonjour ! Je suis une démo vocale",
    value: "fr-FR",
  },
  { label: "العربية", text: "مرحبا! أنا عرض صوتي", value: "ar-SA" },
  {
    label: "Português (BR)",
    text: "Olá! Sou uma demonstração de voz",
    value: "pt-BR",
  },
  {
    label: "Русский",
    text: "Привет! Я голосовая демонстрация",
    value: "ru-RU",
  },
  { label: "Deutsch", text: "Hallo! Ich bin eine Sprachdemo", value: "de-DE" },
  { label: "日本語", text: "こんにちは！音声デモです", value: "ja-JP" },
  { label: "Indonesia", text: "Halo! Saya demo suara", value: "id-ID" },
];

// USlider works with 0–100; map to actual speech ranges
// pitch: 0–2  → slider 0–100
// rate:  0.5–2 → slider 0–100
const pitchSlider = computed({
  get: () => Math.round((pitch.value / 2) * 100),
  set: (v: number) => {
    pitch.value = parseFloat(((v / 100) * 2).toFixed(2));
  },
});

const rateSlider = computed({
  get: () => Math.round(((rate.value - 0.5) / 1.5) * 100),
  set: (v: number) => {
    rate.value = parseFloat((0.5 + (v / 100) * 1.5).toFixed(2));
  },
});

const { speak } = useAacSpeech(lang, pitch, rate);

const resetDefaults = () => {
  pitch.value = 1;
  rate.value = 1;
};

const currentLangDemo = computed(
  () => langsTest.find((l) => l.value === lang.value) ?? langsTest[0],
);
</script>

<template>
  <section
    class="mx-auto w-full max-w-4xl px-6 py-8 text-[#1c1b1b] dark:text-[#f4f4f5]"
  >
    <h2 class="text-2xl font-semibold tracking-tight">Ajustes generales</h2>

    <p class="mt-4 text-sm leading-6 text-[#4b5563] dark:text-[#d1d5db]">
      Esta sección agrupa la configuración general de la app. Puedes usar el
      botón de tema en el header y aquí centralizar futuras preferencias de uso.
    </p>

    <div class="mt-6 space-y-3">
      <div class="rounded-xl border border-default bg-default p-4">
        <p class="text-sm font-medium">Idioma de voz</p>
        <p class="mt-2 text-sm text-[#4b5563] dark:text-[#d1d5db]">
          <USelect
            v-model="lang"
            :items="langs"
            value-key="value"
            label-key="label"
          />
        </p>
      </div>

      <div class="rounded-xl border border-default bg-default p-4 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium">Tono y velocidad</span>
          <UButton
            size="xs"
            variant="ghost"
            color="neutral"
            @click="resetDefaults"
          >
            Restaurar predeterminados
          </UButton>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium">Tono (pitch)</p>
            <span class="text-xs text-[#4b5563] dark:text-[#d1d5db]">{{
              pitch
            }}</span>
          </div>
          <p class="mt-2 text-xs text-[#4b5563] dark:text-[#d1d5db] mb-2">
            Grave ← → Agudo
          </p>
          <USlider v-model="pitchSlider" :min="0" :max="100" :step="10" />
        </div>

        <div>
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium">Velocidad (rate)</p>
            <span class="text-xs text-[#4b5563] dark:text-[#d1d5db]">{{
              rate
            }}</span>
          </div>
          <p class="mt-2 text-xs text-[#4b5563] dark:text-[#d1d5db] mb-2">
            Lento ← → Rápido
          </p>
          <USlider v-model="rateSlider" :min="0" :max="100" :step="10" />
        </div>
      </div>

      <div class="rounded-xl border border-default bg-default p-4 space-y-4">
        <div>
          <p class="text-sm font-medium">Probar voz</p>
          <p class="mt-1 text-xs text-[#4b5563] dark:text-[#d1d5db] mb-3">
            Toca la tarjeta para escuchar la voz con el idioma, tono y velocidad
            actuales.
          </p>
          <VoiceCard
            :text="currentLangDemo.text"
            emoji="🗣️"
            tone-class="bg-pastel-blue"
            @select="speak(currentLangDemo.text)"
          />
        </div>
      </div>
    </div>
  </section>
</template>
