export default {
  target: 'static',
  telemetry: false,
  ssr: false,
  components: true,
  env: {
    courseName: process.env.COURSE_NAME || 'Beispielkurs'
  },
  router: {
    base: process.env.NODE_ENV === 'github' ? '/course/' : '/',
  },
  content: {
    liveEdit: true
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
    '@nuxt/typescript-build',
    '@nuxtjs/color-mode'
  ],
  css: ['@/assets/main.css'],
  colorMode: {
    preference: 'light', // default value of $colorMode.preference
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode'
  },
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