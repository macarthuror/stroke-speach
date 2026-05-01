<script setup lang="ts">
import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";

type Emoji = {
  n: string[];
  u: string;
  r: string;
  t: string;
  i: string;
};

const newInput = ref("");
const hasErrors = ref("");
const selectedEmoji = ref("");
const isOpen = ref(false);

const props = withDefaults(
  defineProps<{
    title: string;
    hasEmoji?: boolean;
    isWord?: boolean;
  }>(),
  {
    title: undefined,
    hasEmoji: false,
    isWord: false,
  },
);

const emit = defineEmits<{
  adding: [text: string];
}>();

const onSelectEmoji = (emoji: Emoji) => {
  selectedEmoji.value = emoji.i;
  hasErrors.value = "";
};

const onInput = () => {
  hasErrors.value = "";
};

const onClose = () => {
  newInput.value = "";
  selectedEmoji.value = "";
  hasErrors.value = "";
  isOpen.value = false;
};

const onAdding = () => {
  if (newInput.value.trim() === "") {
    hasErrors.value = "El texto no puede estar vacío.";
    return;
  }

  if (props.hasEmoji && selectedEmoji.value === "") {
    hasErrors.value = "Por favor, selecciona un emoji.";
    return;
  }

  // TODO: Validate to not contain special characters, only letters without spaces JUST ONE WORD
  if (props.isWord && !/^[a-zA-Z]+$/.test(newInput.value)) {
    hasErrors.value = "El texto solo puede contener letras sin espacios.";
    return;
  }

  emit(
    "adding",
    JSON.stringify({
      text: newInput.value,
      emoji: selectedEmoji.value,
      toneClass: "bg-pastel-blue",
    }),
  );
  onClose();
};
</script>

<template>
  <button
    type="button"
    aria-label="Agregar nueva tarjeta"
    class="rounded-2xl min-h-[180px] flex flex-col items-center justify-center gap-3 p-4 border-4 border-dashed border-[#CBD5E1] dark:border-[#3f4450] text-[#64748B] dark:text-[#6b7280] hover:border-[#94A3B8] dark:hover:border-[#6b7280] hover:bg-[#f0eded] dark:hover:bg-[#1e2028] hover:text-[#475569] dark:hover:text-[#9ca3af] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#94A3B8]"
    @click="isOpen = true"
  >
    <span class="text-5xl leading-none font-light select-none">+</span>
    <span class="text-sm font-medium">Agregar</span>
  </button>

  <UModal
    v-model:open="isOpen"
    :title="title || 'Nueva tarjeta'"
    @update:open="(v) => !v && onClose()"
  >
    <template #body>
      <div class="flex flex-col gap-4 pt-1">
        <!-- Text input -->
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-[#374151] dark:text-[#d1d5db]">
            Texto de la tarjeta
          </label>
          <UInput
            v-model.trim="newInput"
            color="neutral"
            highlight
            size="lg"
            placeholder="Escribe aquí..."
            :ui="{ base: 'w-full' }"
            @input="onInput"
            @keydown.enter="onAdding"
          />
        </div>

        <!-- Emoji picker -->
        <div v-if="hasEmoji" class="flex flex-col gap-2">
          <label class="text-sm font-medium text-[#374151] dark:text-[#d1d5db]">
            Emoji
          </label>
          <div class="flex items-start gap-4">
            <div
              class="flex flex-col items-center justify-center gap-1 w-16 shrink-0"
            >
              <div
                class="w-14 h-14 rounded-xl border-2 flex items-center justify-center text-4xl"
                :class="
                  selectedEmoji
                    ? 'border-[#94A3B8] dark:border-[#4b5563] bg-[#f8fafc] dark:bg-[#1e2028]'
                    : 'border-dashed border-[#CBD5E1] dark:border-[#3f4450] bg-[#f8fafc] dark:bg-[#1e2028]'
                "
              >
                <span v-if="selectedEmoji">{{ selectedEmoji }}</span>
                <span v-else class="text-2xl text-[#CBD5E1] dark:text-[#3f4450]"
                  >?</span
                >
              </div>
              <span class="text-xs text-[#94A3B8] dark:text-[#6b7280]">
                {{ selectedEmoji ? "Seleccionado" : "Sin elegir" }}
              </span>
            </div>
            <EmojiPicker
              native
              hide-group-names
              hide-search
              disable-skin-tones
              @select="onSelectEmoji"
              class="!shadow-none !border !border-[#e2e8f0] dark:!border-[#2d3748] !rounded-xl overflow-hidden"
            />
          </div>
        </div>

        <!-- Error message -->
        <Transition name="fade-slide">
          <UAlert
            v-if="hasErrors"
            color="error"
            variant="soft"
            :description="hasErrors"
            icon="i-lucide-circle-alert"
          />
        </Transition>

        <!-- Action buttons -->
        <div class="flex gap-2 pt-1">
          <UButton
            variant="ghost"
            color="neutral"
            class="flex-1 justify-center"
            @click="onClose"
          >
            Cancelar
          </UButton>
          <UButton class="flex-1 justify-center" @click="onAdding">
            Agregar tarjeta
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>

<style>
.v3-footer {
  display: none !important;
  height: 0 !important;
}

.v3-emoji-picker {
  width: 100% !important;
  max-width: 280px !important;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
