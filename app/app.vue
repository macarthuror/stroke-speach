<script setup>
const siteName = 'Stroke Speech'
const siteUrl = 'https://macarthuror.github.io/stroke-speach'
const defaultTitle = 'Comunicación asistida AAC'
const defaultDescription
  = 'Aplicación AAC accesible con síntesis de voz, PWA instalable y soporte offline para rehabilitación del habla.'
const socialImage = `${siteUrl}/pwa-512.png`

const route = useRoute()
const canonicalUrl = computed(
  () => `${siteUrl}${route.path === '/' ? '' : route.path}`
)
const structuredData = computed(() =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': siteName,
    'applicationCategory': 'HealthApplication',
    'operatingSystem': 'Web',
    'inLanguage': 'es',
    'description': defaultDescription,
    'url': siteUrl,
    'image': socialImage,
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'author': {
      '@type': 'Person',
      'name': 'MacArthur Orozco'
    }
  })
)

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'canonical', href: () => canonicalUrl.value }
  ],
  script: [
    { type: 'application/ld+json', children: () => structuredData.value }
  ],
  htmlAttrs: {
    lang: 'es'
  }
})

useSeoMeta({
  title: defaultTitle,
  titleTemplate: `%s | ${siteName}`,
  description: defaultDescription,
  applicationName: siteName,
  author: 'MacArthur Orozco',
  keywords:
    'stroke speech, AAC, comunicación asistida, rehabilitación del habla, post ictus, text to speech, PWA, accesibilidad',
  robots:
    'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  ogType: 'website',
  ogSiteName: siteName,
  ogLocale: 'es_MX',
  ogTitle: `${siteName} - ${defaultTitle}`,
  ogDescription: defaultDescription,
  ogUrl: () => canonicalUrl.value,
  ogImage: socialImage,
  ogImageAlt: 'Stroke Speech logo',
  twitterCard: 'summary_large_image',
  twitterTitle: `${siteName} - ${defaultTitle}`,
  twitterDescription: defaultDescription,
  twitterImage: socialImage,
  twitterImageAlt: 'Stroke Speech logo'
})

const colorMode = useColorMode()
const { isDeleteMode, toggleDeleteMode, disableDeleteMode } = useDeleteMode()

const isDark = computed(() => colorMode.value === 'dark')

function toggleTheme() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

watch(
  () => route.path,
  () => {
    disableDeleteMode()
  }
)
</script>

<template>
  <UApp class="min-h-screen">
    <header class="border-b border-default bg-default">
      <div
        class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6"
      >
        <h1 class="text-base font-semibold">
          Mi Voz
        </h1>

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

      <USeparator
        icon="i-simple-icons-nuxtdotjs"
        class="mt-10"
      />

      <UFooter>
        <template #left>
          <p class="text-sm text-muted">
            Made with ❤️
          </p>
        </template>

        <template #right>
          <div class="flex items-center gap-1">
            <UButton
              to="/about"
              label="About"
              icon="i-lucide-info"
              variant="ghost"
              color="neutral"
            />
            <UButton
              to="/settings"
              label="Ajustes"
              icon="i-lucide-settings"
              variant="ghost"
              color="neutral"
            />
            <UButton
              to="https://github.com/macarthuror/stroke-speach"
              target="_blank"
              icon="i-simple-icons-github"
              aria-label="GitHub"
              color="neutral"
              variant="ghost"
            />
          </div>
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
