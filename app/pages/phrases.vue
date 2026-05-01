<script setup lang="ts">
import type { AddNewItem } from "~/typos";

const { t } = useI18n();

useSeoMeta({
  title: () => t("phrases.seoTitle"),
  description: () => t("phrases.seoDescription"),
});

const speechLang = useLocalStorage<string>("speech-lang", "es-MX");
const pitch = useLocalStorage<number>("speech-pitch", 1);
const rate = useLocalStorage<number>("speech-rate", 1);
const { speak } = useAacSpeech(speechLang, pitch, rate);
const isStorageReady = ref(false);

type Phrase = {
  text: string;
  toneClass: string;
};

const phrases = useLocalStorage<Phrase[]>("phrases", [
  {
    text: t("phrases.defaults.cold"),
    toneClass: "bg-pastel-blue",
  },
  {
    text: t("phrases.defaults.hot"),
    toneClass: "bg-pastel-blue",
  },
  {
    text: t("phrases.defaults.painHere"),
    toneClass: "bg-pastel-blue",
  },
  {
    text: t("phrases.defaults.family"),
    toneClass: "bg-pastel-blue",
  },
]);

const onCardSelect = (text: string) => {
  speak(text);
};

const onCardDelete = (index: number) => {
  phrases.value = phrases.value.filter((_, cardIndex) => cardIndex !== index);
};

const onAdding = (item: string) => {
  const newItem: Omit<AddNewItem, "emoji"> = JSON.parse(item);
  phrases.value.push({
    text: newItem.text,
    toneClass: newItem.toneClass ?? "bg-pastel-blue",
  });
};

onMounted(() => {
  isStorageReady.value = true;
});
</script>

<template>
  <div
    class="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] dark:bg-[#111113] dark:text-[#f4f4f5]"
  >
    <main class="mx-auto w-full max-w-7xl px-6 py-8 pb-32">
      <div
        class="grid gap-stack-gap w-full gap-2"
        style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr))"
      >
        <template v-if="isStorageReady">
          <VoiceCard
            v-for="(card, index) in phrases"
            :key="`${card.text}-${index}`"
            :text="card.text"
            :tone-class="card.toneClass"
            :delete-aria-label="t('voiceCard.deleteAria')"
            @select="onCardSelect"
            @delete="onCardDelete(index)"
          />

          <AddCard :title="t('phrases.addCardTitle')" @adding="onAdding" />
        </template>

        <template v-else>
          <VoiceCardSkeleton v-for="index in 6" :key="index" />
        </template>
      </div>
    </main>
  </div>
</template>
