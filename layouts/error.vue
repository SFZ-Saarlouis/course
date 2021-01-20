<template>
  <div class="hero is-fullheight-with-navbar">
    <div class="hero-body container">
      <div class="columns is-vcentered">
        <div class="column is-6 is-narrow">
          <div class="container">
            <h1 class="title is-size-1">{{ error.statusCode }}</h1>
            <h1 class="subtitle">
              {{ error.message }}
            </h1>
             <NuxtLink to="/">Zurück zur Übersicht</NuxtLink>
          </div>
        </div>
        <div class="column is-6">
          <b-image
            :src="require('~/assets/undraw_processing.svg')"
            width="550"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { NuxtError } from "@nuxt/types";
import { Component, Prop, Vue } from "nuxt-property-decorator";
@Component
export default class Error extends Vue {
  @Prop({ required: true }) readonly error!: NuxtError;
  get siteName(): string {
    return decodeURIComponent(window.location.pathname);
  }
}
</script>