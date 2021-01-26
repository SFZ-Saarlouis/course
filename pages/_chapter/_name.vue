<template>
  <nuxt-content
    v-if="
      getPageInformation() !== undefined && getPageInformation().page.content
    "
    :document="page"
  />
  <component
    :is="getPageInformation() !== undefined && getPageInformation().page.path"
    v-else
  />
</template>

<script lang="ts">
import { Component, Vue, namespace } from "nuxt-property-decorator";
import data from "~/assets/data.json";
import { Chapter } from "~/interfaces/Chapter";
import { Exercise } from "~/interfaces/Excercise";

const course = namespace("course");
@Component
export default class ChapterView extends Vue {
  chapters: Array<Chapter> = data;

  public layout(context: any): string {
    return "course";
  }

  async asyncData(context: any) {
    const chapter = data.filter(
      (item) => item.name.toLowerCase() === context.params.chapter.toLowerCase()
    )[0];
    const pageData = chapter.pages.filter(
      (item) => item.name.toLowerCase() === context.params.name.toLowerCase()
    )[0];
    const page = await context
      .$content(
        chapter.name.toLowerCase() + "/" + pageData.path.toLowerCase()
      )
      .fetch()
      .catch((err: any) => {
        console.log(err);
      });
    return {
      page,
    };
  }

  created() {
    if (!this.locked) {
      this.switchLocked();
      this.setJumpedPage(this.$route.params.name.toLowerCase());
      this.setJumpedChapter(this.$route.params.chapter.toLowerCase());
    }
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

  public getPageInformation(): any {
    const chapter = this.$getChapter(this.$route.params.chapter, this.chapters);
    const page = this.$getPage(this.$route.params.name, chapter.pages);
    return {
      page: page,
      chapter: chapter.name,
    };
  }
}
</script>
