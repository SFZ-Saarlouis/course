<template>
  <div>
    <p>{{ this.$route.params.name }}</p>

    <section>
      <b-field label="2*3=?">
        <b-input v-model="input" type="number" />
      </b-field>
    </section>
  </div>
</template>
<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import { Exercise } from '~/interfaces/Excercise'

const course = namespace('course')
@Component
export default class ExampleMultiselect extends Vue {
  name = 'kürzen';
  input = '';

  created () {
    this.$nuxt.$on('checkPage', (chapter: string, page: string) => {
      if (chapter !== this.name.toLowerCase()) {
        return
      }
      if (this.input === '6') {
        const exercise: Exercise = {
          chapter,
          page,
          solution: []
        }
        this.input = '';
        this.unlockExercise(exercise)
      }
    })
  }

  @course.Mutation
  public unlockExercise!: (exercise: Exercise) => void;
}
</script>
