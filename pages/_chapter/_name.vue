<template>
  <nuxt-content
    v-if="
      getPageInformation() !== undefined && getPageInformation().page.content
    "
    :document="page"
  />
  <component class="excercise"
    :is="getPageInformation() !== undefined && getPageInformation().page.path"
    v-else
  />
</template>

<script lang="ts">
import { Component, Vue, namespace } from "nuxt-property-decorator";
import data from "~/assets/data.json";
import { Exercise } from "~/interfaces/Excercise";

const course = namespace("course");
@Component({
  head() {
    return {
      title: this.$getChapter(this.$route.params.chapter, data).name
    };
  },
})
export default class ChapterView extends Vue {
  public layout(context: any): string {
    return "course";
  }

  async asyncData(context: any) {
    const chapter = context.$getChapter(context.params.chapter, data);
    const pageData = context.$getPage(context.params.name, chapter.pages);
    if (pageData.content) {
      const page = await context
        .$content(
          chapter.name.toLowerCase() + "/" + pageData.path.toLowerCase()
        )
        .fetch();
      return {
        page,
      };
    }
  }

  created() {
    if (!this.locked) {
      this.switchLocked();
      this.setJumpedPage(this.$route.params.name.toLowerCase());
      this.setJumpedChapter(this.$route.params.chapter.toLowerCase());
    }
  }

  public getPageInformation(): any {
    const chapter = this.$getChapter(this.$route.params.chapter, data);
    const page = this.$getPage(this.$route.params.name, chapter.pages);
    return {
      page: page,
      chapter: chapter.name,
    };
  }

  @course.Mutation
  public unlockExercise!: (exercise: Exercise) => void;

  @course.Mutation
  public setJumpedPage!: (page: string) => void;

  @course.Mutation
  public setJumpedChapter!: (page: string) => void;

  @course.Getter
  public isExerciseUnlocked!: (chapter: string, page: string) => boolean;

  @course.State
  public locked!: boolean;

  @course.Mutation
  public switchLocked!: () => void;
}
</script>
