<template>
  <section>
    <b-sidebar
      v-model="open"
      type="is-light"
      :fullheight="true"
      :overlay="true"
    >
      <div class="p-1">
        <img src="~/assets/completed_tasks.svg" />
        <br />
        <b-menu>
          <b-menu-list>
            <b-menu-item to="/" label="Übersicht" tag="nuxt-link" />
            <b-menu-item
              v-for="item in pages"
              :key="item.name"
              :active="$route.params.name === item.name"
              :label="$getPageName(item.name, pages)"
              :disabled="
                !isPreviousUnlocked(item) && !($route.params.name === item.name)
              "
              :to="'/' + ChapterName + '/' + item.name"
              tag="nuxt-link"
            />
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch, namespace } from "nuxt-property-decorator";
import { Chapter, Page } from "~/interfaces/Chapter";

import data from "~/assets/data.json";
const course = namespace("course");

@Component
export default class Sidebar extends Vue {
  open = false;
  chapters: Array<Chapter> = data;
  pages: Array<Page> = [];
  ChapterName: string = this.$route.params.chapter.toLowerCase();
  PageName: string = this.$route.params.name.toLowerCase();
  currentChapter = this.getCurrentChapter;

  @Watch("$route")
  routeChanged(): void {
    this.open = false;
    this.ChapterName = this.$route.params.chapter.toLowerCase();
    this.PageName = this.$route.params.name.toLowerCase();
    this.pages = this.getCurrentChapter.pages;
  }

  created(): void {
    this.pages = this.getCurrentChapter.pages;
    this.$nuxt.$on("openOverview", () => {
      this.open = true;
    });
  }

  public isPreviousUnlocked(page: Page): boolean {
    const foundChapter = this.$getChapter(this.ChapterName, this.chapters);
    const chapterIndex = this.$getChapterIndex(this.ChapterName, this.chapters);
    const pageIndex = this.$getPageIndex(page.name, foundChapter.pages);
    if (this.jumpedChapter.length !== 0 && this.jumpedPage.length !== 0) {
      const jumpedChapter = this.$getChapter(this.jumpedChapter, this.chapters);
      const jumpedChapterIndex = this.$getChapterIndex(
        this.jumpedChapter,
        this.chapters
      );
      const jumpedPageIndex = this.$getPageIndex(
        this.jumpedPage,
        jumpedChapter.pages
      );
      if (chapterIndex < jumpedChapterIndex) {
        return true;
      }
      if (chapterIndex == jumpedChapterIndex && pageIndex <= jumpedPageIndex) {
        return true;
      }
    }
    for (let i = pageIndex; i >= 0; i--) {
      const pages = foundChapter.pages[i];
      if (
        !pages.content &&
        !this.isExerciseUnlocked(
          foundChapter.name.toLowerCase(),
          pages.name.toLowerCase()
        )
      ) {
        return false;
      } else if (
        !pages.content &&
        this.isExerciseUnlocked(
          foundChapter.name.toLowerCase(),
          pages.name.toLowerCase()
        )
      ) {
        return true;
      }
    }
    return true;
  }

  get getCurrentChapter(): Chapter {
    return this.$getChapter(this.ChapterName, this.chapters);
  }

  @course.Getter
  public isExerciseUnlocked!: (chapter: string, page: string) => boolean;

  @course.State
  public jumpedPage!: string;

  @course.State
  public jumpedChapter!: string;
}
</script>

<style>
.p-1 {
  padding: 1em;
}
</style>
