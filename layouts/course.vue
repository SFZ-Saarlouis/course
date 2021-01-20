<template>
  <div id="app">
    <section class="hero is-fullheight">
      <Sidebar />
      <div class="hero-body">
        <div class="container">
          <Nuxt />
        </div>
      </div>
      <Footer />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Footer from "~/components/Footer.vue";
import Navbar from "~/components/Sidebar.vue";
@Component({
  components: {
    Footer,
    Navbar,
  },
})
export default class App extends Vue {}
</script>