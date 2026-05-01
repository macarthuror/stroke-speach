<script setup>
const { t, locale, setLocale } = useI18n()

const siteName = 'Stroke Speech'
const siteUrl = 'https://macarthuror.github.io/stroke-speach'

const defaultTitle = computed(() => t('app.seo.defaultTitle'))
const defaultDescription = computed(() => t('app.seo.defaultDescription'))
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
    'inLanguage': locale.value,
    'description': defaultDescription.value,
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
    lang: () => locale.value
  }
})

useSeoMeta({
  title: () => defaultTitle.value,
  titleTemplate: `%s | ${siteName}`,
  description: () => defaultDescription.value,
  applicationName: siteName,
  author: 'MacArthur Orozco',
  keywords: () => t('app.seo.keywords'),
  robots:
    'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  ogType: 'website',
  ogSiteName: siteName,
  ogLocale: () => locale.value === 'en' ? 'en_US' : 'es_MX',
  ogTitle: () => `${siteName} - ${defaultTitle.value}`,
  ogDescription: () => defaultDescription.value,
  ogUrl: () => canonicalUrl.value,
  ogImage: socialImage,
  ogImageAlt: () => t('app.seo.ogImageAlt'),
  twitterCard: 'summary_large_image',
  twitterTitle: () => `${siteName} - ${defaultTitle.value}`,
  twitterDescription: () => defaultDescription.value,
  twitterImage: socialImage,
  twitterImageAlt: () => t('app.seo.ogImageAlt')
})

const uiLocaleOptions = computed(() => [
  { label: t('language.spanish'), value: 'es' },
  { label: t('language.english'), value: 'en' }
])

const onUiLocaleChange = (value) => {
  if (value === locale.value) {
    return
  }
  setLocale(value)
}

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
          {{ t('app.brand') }}
        </h1>

        <div class="flex items-center gap-2">
          <USelect
            :model-value="locale"
            :items="uiLocaleOptions"
            value-key="value"
            label-key="label"
            size="xs"
            class="w-32"
            @update:model-value="onUiLocaleChange"
          />

          <UButton
            :icon="isDeleteMode ? 'i-lucide-trash-2' : 'i-lucide-trash'"
            :color="isDeleteMode ? 'error' : 'neutral'"
            variant="ghost"
            :aria-label="
              isDeleteMode
                ? t('app.aria.deleteModeOff')
                : t('app.aria.deleteModeOn')
            "
            @click="toggleDeleteMode"
          />

          <UButton
            :label="isDark ? '🌞' : '🌙'"
            color="neutral"
            variant="ghost"
            :aria-label="t('app.aria.changeTheme')"
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
            {{ t('app.madeWith') }}
          </p>
        </template>

        <template #right>
          <div class="flex items-center gap-1">
            <UButton
              to="/about"
              :label="t('app.nav.about')"
              icon="i-lucide-info"
              variant="ghost"
              color="neutral"
            />
            <UButton
              to="/settings"
              :label="t('app.nav.settings')"
              icon="i-lucide-settings"
              variant="ghost"
              color="neutral"
            />
            <UButton
              to="https://github.com/macarthuror/stroke-speach"
              target="_blank"
              icon="i-simple-icons-github"
              :aria-label="t('app.aria.github')"
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
          :label="t('app.nav.home')"
          icon="i-lucide-house"
          variant="ghost"
          :color="route.path === '/' ? 'primary' : 'neutral'"
          class="flex-1 justify-center"
        />
        <UButton
          to="/phrases"
          :label="t('app.nav.phrases')"
          icon="i-lucide-message-square"
          variant="ghost"
          :color="route.path.startsWith('/phrases') ? 'primary' : 'neutral'"
          class="flex-1 justify-center"
        />
      </nav>
    </footer>
  </UApp>
</template>
