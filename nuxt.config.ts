// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
      prerender: {
        autoSubfolderIndex: false
    },
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    logtoClientId: '',
    logtoClientSecret: '',
    nextauthSecret: '',
  },
  modules: [
    '@nuxt/ui',
    '@hebilicious/authjs-nuxt'
  ],
})