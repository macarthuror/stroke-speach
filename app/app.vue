<script setup>
useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "es",
  },
});

const title = "Nuxt Starter Template";
const description =
  "A production-ready starter template powered by Nuxt UI. Build beautiful, accessible, and performant applications in minutes, not hours.";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: "https://ui.nuxt.com/assets/templates/nuxt/starter-light.png",
  twitterCard: "summary_large_image",
});

const route = useRoute();
const colorMode = useColorMode();
const { isDeleteMode, toggleDeleteMode, disableDeleteMode } = useDeleteMode();

const isDark = computed(() => colorMode.value === "dark");

function toggleTheme() {
  colorMode.preference = isDark.value ? "light" : "dark";
}

watch(
  () => route.path,
  () => {
    disableDeleteMode();
  },
);
</script>

<template>
  <UApp class="min-h-screen">
    <header class="border-b border-default bg-default">
      <div
        class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6"
      >
        <h1 class="text-base font-semibold">Mi Voz</h1>

        <div class="flex items-center gap-1">
          <UButton
            :icon="isDeleteMode ? 'i-lucide-trash-2' : 'i-lucide-trash'"
            :color="isDeleteMode ? 'error' : 'neutral'"
            variant="ghost"
            :aria-label="
              isDeleteMode
                ? 'Desactivar modo eliminar'
                : 'Activar modo eliminar'
            "
            @click="toggleDeleteMode"
          />

          <UButton
            :label="isDark ? '🌞' : '🌙'"
            color="neutral"
            variant="ghost"
            aria-label="Cambiar tema"
            @click="toggleTheme"
          />
        </div>
      </div>
    </header>

    <UMain class="pb-24">
      <NuxtPage />

      <USeparator icon="i-simple-icons-nuxtdotjs" class="mt-10" />

      <UFooter>
        <template #left>
          <p class="text-sm text-muted">
            Built with Nuxt UI • © {{ new Date().getFullYear() }}
          </p>
        </template>

        <template #right>
          <UButton
            to="https://github.com/nuxt-ui-templates/starter"
            target="_blank"
            icon="i-simple-icons-github"
            aria-label="GitHub"
            color="neutral"
            variant="ghost"
          />
        </template>
      </UFooter>
    </UMain>

    <footer
      class="fixed inset-x-0 bottom-0 z-50 border-t border-default bg-default/95 backdrop-blur supports-backdrop-filter:bg-default/80"
    >
      <nav
        class="mx-auto flex max-w-lg items-center justify-center gap-2 px-4 py-3"
      >
        <UButton
          to="/"
          label="Inicio"
          icon="i-lucide-house"
          variant="ghost"
          :color="route.path === '/' ? 'primary' : 'neutral'"
          class="flex-1 justify-center"
        />
        <UButton
          to="/phrases"
          label="Frases"
          icon="i-lucide-message-square"
          variant="ghost"
          :color="route.path.startsWith('/phrases') ? 'primary' : 'neutral'"
          class="flex-1 justify-center"
        />
      </nav>
    </footer>
  </UApp>
</template>
