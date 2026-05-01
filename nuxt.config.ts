// https://nuxt.com/docs/api/configuration/nuxt-config
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const baseURL = isGitHubActions && repositoryName ? `/${repositoryName}/` : "/";

export default defineNuxtConfig({
  ssr: false,

  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    // "@nuxt/a11y", // disabled: alpha module known to crash vite-node worker
    "@nuxt/hints",
    "@vite-pwa/nuxt",
    "@vueuse/nuxt",
  ],

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

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

  pwa: {
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
      globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,json,txt,woff2}"],
      cleanupOutdatedCaches: true,
      skipWaiting: true,
      clientsClaim: true,
    },
    client: {
      installPrompt: true,
    },
  },

  routeRules: {
    "/": { prerender: true },
  },

  nitro: {
    preset: isGitHubActions ? "github_pages" : undefined,
  },

  compatibilityDate: "2025-01-15",

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
});
