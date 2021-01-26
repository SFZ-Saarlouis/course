export default {
  target: 'static',
  telemetry: false,
  ssr: false,
  components: true,
  router: {
    base: process.env.NODE_ENV === 'github' ? '/course/' : '/',
  },
  content: {
    liveEdit: false
  },
  generate: {
    fallback: '404.html'
  },
  plugins: ['~/plugins/index'],
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