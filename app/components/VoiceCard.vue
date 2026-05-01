<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string;
    emoji?: string;
    text: string;
    toneClass?: string;
  }>(),
  {
    title: undefined,
    toneClass: "bg-pastel-blue",
  },
);

const emit = defineEmits<{
  select: [text: string];
  delete: [];
}>();

const onSelect = () => {
  emit("select", props.text);
};

const onDelete = () => {
  emit("delete");
};

const { isDeleteMode } = useDeleteMode();
</script>

<template>
  <div
    class="relative rounded-2xl shadow-ambient min-h-[180px] border-2 border-transparent"
    :class="toneClass"
  >
    <button
      type="button"
      :aria-label="title || text"
      class="w-full h-full min-h-[180px] rounded-2xl flex flex-col items-center justify-center gap-4 p-4 transition-all duration-150 active:scale-95 active:brightness-90 cursor-pointer"
      @click="onSelect"
    >
      <span aria-hidden="true" class="text-6xl">{{ emoji }}</span>
      <span
        class="font-button-text text-button-text text-[#1A1A1A] dark:text-[#F0F0F0]"
      >
        {{ title || text }}
      </span>
    </button>

    <button
      v-if="isDeleteMode"
      type="button"
      aria-label="Eliminar tarjeta"
      class="absolute top-2 right-2 h-9 w-9 rounded-full bg-white/90 dark:bg-[#22242b]/90 border border-[#d8dee9] dark:border-[#3f4450] text-[#9b1c1c] dark:text-[#fca5a5] text-xl leading-none flex items-center justify-center hover:brightness-95 transition"
      @click.stop="onDelete"
    >
      ×
    </button>
  </div>
</template>
