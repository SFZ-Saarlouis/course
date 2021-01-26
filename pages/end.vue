<template>
  <content>
    <section id="hero-background" class="hero">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Du hast den Kurs "{{ title }}" erfolgreich beendet!
          </h1>
          <b-button
            class="is-vcentered"
            label="Zurück zur Übersicht"
            tag="nuxt-link"
            to="/"
            type="is-link"
          >
            Docs
          </b-button>
          <br>
          <br>
          <p>
            <img style="zoom: 0.5" src="~/assets/finished.svg">
          </p>
        </div>
      </div>
    </section>
  </content>
</template>
<script>
export default {
  data() {
    return {
      title: process.env.courseName
    };
  }
}
</script>