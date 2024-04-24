import path from "path";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    "@nuxtjs/eslint-module",
    "@nuxtjs/stylelint-module",
    "@nuxtjs/tailwindcss",
    "nuxt-primevue",
    "@pinia/nuxt",
  ],
  primevue: {
    unstyled: true,
    importPT: { from: path.resolve(__dirname, "./presets/wind/") }, //import and apply preset
  },

  runtimeConfig: {
    public: {
      backendUrl: "",
      frontendUrl: "",
    },
  },

  experimental: {
    asyncContext: true,
  },
});
