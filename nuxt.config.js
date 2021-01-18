export default {
    target: 'static',
    telemetry: false,
    ssr: false,
    router: {
      base: process.env.NODE_ENV === 'github' ? '/course/' : '/',
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
    modules: [['nuxt-buefy', { css: true, materialDesignIcons: false }]],
  }