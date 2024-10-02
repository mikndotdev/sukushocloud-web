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
    authJs: {
      secret: process.env.NUXT_NEXTAUTH_SECRET
    },
    public: {
      authJs: {
        baseUrl: process.env.NUXT_PUBLIC_AUTHJS_BASE_URL,
        verifyClientOnEveryRequest: true
      }
    },
  },
  modules: [
    '@nuxt/ui',
    '@hebilicious/authjs-nuxt'
  ],
})