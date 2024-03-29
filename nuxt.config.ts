import path from "path";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/eslint-module",
    "@nuxtjs/stylelint-module",
    "@nuxtjs/tailwindcss",
    "nuxt-primevue",
  ],
  primevue: {
    unstyled: true,
    importPT: { from: path.resolve(__dirname, "./presets/wind/") }, //import and apply preset
  },

  runtimeConfig: {
    public: {
      backendUrl: process.env.BACKEND_URL || "http://127.0.0.1:8001",
      frontendUrl: process.env.FRONTEND_URL || "http://127.0.0.1:3000",
    },
  },

  experimental: {
    asyncContext: true,
  },
});
