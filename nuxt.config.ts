import { $fetch } from "ofetch";
import path from "path";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    experimental: {
      tasks: true,
    },
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
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

  nkAuth: {
    providers: ["github"],
  },

  runtimeConfig: {
    public: {
      backendUrl: "",
      frontendUrl: "",
    },
    dbAuthToken: "",
    dbUrl: "",
    oauth: {
      github: {
        clientId: "",
        clientSecret: "",
      },
    },
  },

  experimental: {
    asyncContext: true,
  },
});