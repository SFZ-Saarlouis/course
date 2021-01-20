export default {
  target: 'static',
  telemetry: false,
  ssr: false,
  router: {
    base: process.env.NODE_ENV === 'github' ? '/course/' : '/',
    middleware: 'router'
  },
  build: {
    parallel: true,
    terser: true,
    sourceMap: true,
    typescript: {
      typeCheck: {
        eslint: true
      }
    }
  },
  buildModules: [
    '@nuxt/typescript-build'
  ],
  modules: [
    ['nuxt-buefy', { css: true, materialDesignIcons: false }],
    ['@nuxt/content']
  ],
  head: {
    htmlAttrs: {
      lang: 'de'
    },
    title: 'Schülerforschungszentrum Saarlouis',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ]
  },
}