// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-12-13',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      CFWorkerTwitchGetStatus: process.env.CF_WORKER_TWITCH_GET_STATUS
    }
  },

  nitro: {
    preset: "cloudflare-pages"
  },

  modules: ["@nuxtjs/tailwindcss", "nitro-cloudflare-dev"],
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],

  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-brands-svg-icons',
    ],
  },

})
