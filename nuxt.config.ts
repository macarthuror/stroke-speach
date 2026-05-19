// https://nuxt.com/docs/api/configuration/nuxt-config
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const isPreviewDeploy = process.env.PR_PREVIEW === "true";
const baseURL =
  process.env.NUXT_APP_BASE_URL ||
  (isGitHubActions && repositoryName ? `/${repositoryName}/` : "/");
const previewPathRegex = repositoryName
  ? new RegExp(`^/${repositoryName}/pr-preview/`)
  : /^\/pr-preview\//;

export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxtjs/i18n",
    // "@nuxt/a11y", // disabled: alpha module known to crash vite-node worker
    "@nuxt/hints",
    "@vite-pwa/nuxt",
    "@vueuse/nuxt",
  ],
  ssr: false,

  devtools: {
    enabled: true,
  },

  app: {
    baseURL,
    head: {
      link: [
        {
          rel: "manifest",
          href: `${baseURL}manifest.webmanifest`,
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: `${baseURL}apple-touch-icon.png`,
        },
      ],
    },
  },

  css: ["~/assets/css/main.css"],

  routeRules: {
    "/": { prerender: true },
  },

  compatibilityDate: "2025-01-15",

  nitro: {
    preset: isGitHubActions ? "github_pages" : undefined,
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },

  i18n: {
    strategy: "no_prefix",
    defaultLocale: "es",
    langDir: "locales",
    locales: [
      { code: "es", language: "es-MX", name: "Español", file: "es.json" },
      { code: "en", language: "en-US", name: "English", file: "en.json" },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "stroke_speech_locale",
      redirectOn: "root",
    },
  },

  pwa: {
    disable: isPreviewDeploy,
    registerType: "autoUpdate",
    manifest: {
      name: "Stroke Speech",
      short_name: "StrokeSpeech",
      description:
        "Comunicación asistida por voz para rehabilitación del habla.",
      theme_color: "#0f172a",
      background_color: "#ffffff",
      display: "standalone",
      scope: baseURL,
      start_url: baseURL,
      icons: [
        {
          src: "pwa-192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-icon.svg",
          sizes: "any",
          type: "image/svg+xml",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      navigateFallback: `${baseURL}index.html`,
      navigateFallbackDenylist: [previewPathRegex],
      globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,json,txt,woff2}"],
      cleanupOutdatedCaches: true,
      skipWaiting: true,
      clientsClaim: true,
    },
    client: {
      installPrompt: true,
    },
  },
});
