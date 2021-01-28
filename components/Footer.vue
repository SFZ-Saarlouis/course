<template>
  <div class="hero-foot">
    <nav class="tabs is-boxed rounded is-fullwidth">
      <div class="container">
        <ul>
          <li class="is-active" @click='$nuxt.$emit("openOverview")'>
            <a>Übersicht</a>
          </li>
          <li v-if="!isUnlocked" @click.prevent="checkChapter">
            <a>Abgabe überprüfen</a>
          </li>
          <li v-if="isUnlocked && !isLastPage" @click.prevent="nextPage">
            <a>Weiter</a>
          </li>
          <li
            v-if="isUnlocked && !isLastChapter && isLastPage"
            @click.prevent="nextPage"
          >
            <a>Nächstes Kapitel</a>
          </li>
          <li>
            <NuxtLink
              v-if="isUnlocked && isLastChapter && isLastPage"
              to="/end"
            >
              Zur Abschlussseite
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue, namespace, Watch } from "nuxt-property-decorator";
import { Chapter } from "~/interfaces/Chapter";
import data from "~/assets/data.json";

const course = namespace("course");
@Component
export default class Footer extends Vue {
  chapters: Array<Chapter> = data;
  ChapterName: string = this.$route.params.chapter.toLowerCase();
  PageName: string = this.$route.params.name.toLowerCase();

  @Watch("$route")
  routeChanged(): void {
    this.ChapterName = this.$route.params.chapter.toLowerCase();
    this.PageName = this.$route.params.name.toLowerCase();
  }

  public checkChapter(): void {
    this.$nuxt.$emit("checkPage", this.ChapterName, this.PageName);
  }

  get isUnlocked(): boolean {
    if (!this.isExcercise) {
      return true;
    }
    return this.isExerciseUnlocked(this.ChapterName, this.PageName);
  }

  get isExcercise(): boolean {
    const chapter = this.$getChapter(this.ChapterName, this.chapters);
    const page = this.$getPage(this.PageName, chapter.pages);
    return !page.content;
  }

  get isLastChapter(): boolean {
    return (
      this.chapters.length - 1 ===
      this.$getChapterIndex(this.ChapterName, this.chapters)
    );
  }

  get isLastPage(): boolean {
    const chapter = this.$getChapter(this.ChapterName, this.chapters);
    return (
      chapter.pages.length - 1 ===
      this.$getPageIndex(this.PageName, chapter.pages)
    );
  }

  public nextPage(): void {
    if (this.isLastPage && !this.isLastChapter) {
      const chapter = this.chapters[
        this.$getChapterIndex(this.ChapterName, this.chapters) + 1
      ];
      this.$router.push({
        path: "/" + chapter.name + "/" + chapter.pages[0].name,
      });
    } else {
      const chapter = this.$getChapter(this.ChapterName, this.chapters);
      const index = this.$getPageIndex(this.PageName, chapter.pages);
      this.$router.push({
        path: "/" + this.ChapterName + "/" + chapter.pages[index + 1].name,
      });
    }
  }

  @course.Getter
  public isExerciseUnlocked!: (chapter: string, page: string) => boolean;
}
</script>
