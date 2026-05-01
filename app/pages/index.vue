<script setup lang="ts">
import type { AddNewItem } from "~/typos";

const { t } = useI18n();

useSeoMeta({
  title: () => t("index.seoTitle"),
  description: () => t("index.seoDescription"),
});

const userLang = useLocalStorage<string>(
  "speech-lang",
  navigator.languages?.[0] || navigator.language || "es-MX",
);
const pitch = useLocalStorage<number>("speech-pitch", 1);
const rate = useLocalStorage<number>("speech-rate", 1);
const { speak } = useAacSpeech(userLang, pitch, rate);
const isStorageReady = ref(false);

type Word = {
  text: string;
  emoji: string;
  toneClass: string;
};

const words = useLocalStorage<Word[]>("words", [
  {
    text: t("index.defaults.yes"),
    emoji: "👍",
    toneClass: "bg-pastel-blue",
  },
  {
    text: t("index.defaults.no"),
    emoji: "👎",
    toneClass: "bg-pastel-pink",
  },
  {
    text: t("index.defaults.water"),
    emoji: "💧",
    toneClass: "bg-pastel-blue",
  },
  {
    text: t("index.defaults.food"),
    emoji: "🍽️",
    toneClass: "bg-pastel-green",
  },
  {
    text: t("index.defaults.bathroom"),
    emoji: "🚽",
    toneClass: "bg-pastel-purple",
  },
  {
    text: t("index.defaults.pain"),
    emoji: "🤕",
    toneClass: "bg-pastel-yellow",
  },
]);

const onCardSelect = (text: string) => {
  speak(text);
};

const onCardDelete = (index: number) => {
  words.value = words.value.filter((_, cardIndex) => cardIndex !== index);
};

const onAdding = (item: string) => {
  const newItem: AddNewItem = JSON.parse(item);
  words.value.push({
    text: newItem.text,
    emoji: newItem.emoji ?? "",
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
            v-for="(card, index) in words"
            :key="`${card.text}-${index}`"
            :text="card.text"
            :emoji="card.emoji"
            :tone-class="card.toneClass"
            :delete-aria-label="t('voiceCard.deleteAria')"
            @select="onCardSelect"
            @delete="onCardDelete(index)"
          />

          <AddCard :title="t('index.addCardTitle')" has-emoji is-word @adding="onAdding" />
        </template>

        <template v-else>
          <VoiceCardSkeleton v-for="index in 6" :key="index" />
        </template>
      </div>
    </main>
  </div>
</template>
