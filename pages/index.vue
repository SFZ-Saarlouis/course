<template>
  <content>
    <section id="hero-background" class="hero">
      <div class="hero-body">
        <div class="container has-text-centered">
          <p id="title" class="title">Übersicht</p>
        </div>
      </div>
      <div class="tile is-ancestor is-vertical is-vcentered">
        <div
          v-for="item in chapters"
          :key="item.name"
          class="tile is-parent"
          @click="openChapter(item)"
        >
          <article class="tile is-child notification" :class="getClass(item)">
            <p class="title">
              {{ $getChapterName(item.name, chapters) }}
            </p>
          </article>
        </div>
        <div class="tile is-parent" @click="reset">
          <article
            class="tile is-child notification"
            style="background-color: #7957d5; color: white"
          >
            <p class="title">Kurs zurücksetzen</p>
          </article>
        </div>
      </div>
    </section>
    <a class="float" @click="switchLocked">
      <img class="my-float" :src="lockImage" />
    </a>
    <page-list-modal
      v-if="clickedChapter != null && isImageModalActive"
      :chapter="clickedChapter"
      @closePageModal="closeEvent"
    />
  </content>
</template>

<script lang="ts">
import { Component, Vue, namespace, Watch } from "nuxt-property-decorator";
import { Chapter } from "~/interfaces/Chapter";
import PageListModal from "~/components/PageListModal.vue";

import data from "~/assets/data.json";
const course = namespace("course");
@Component({
  components: {
    PageListModal,
  },
})
export default class Overview extends Vue {
  chapters: Array<Chapter> = data;
  password = "";
  isImageModalActive = false;
  clickedChapter: Chapter = this.chapters[0];
  lockImage: any = require("~/assets/icons/lock_closed.svg");

  @Watch('locked')
  routeChanged(): void {
    this.lockImage = this.locked
      ? require("~/assets/icons/lock_closed.svg")
      : require("~/assets/icons/lock_open.svg");
  }

  public openChapter(chapter: Chapter): void {
    if (
      !this.locked ||
      (this.jumpedChapter.length !== 0 && this.jumpedPage.length !== 0)
    ) {
      this.openPageModal(chapter);
      return;
    }
    if (
      this.chapters.map((item) => item.name).indexOf(chapter.name) === 0 ||
      this.isChapterUnlocked(this.getPreviousChapter(chapter)) ||
      this.isChapterUnlocked(chapter)
    ) {
      this.$router.push({ path: chapter.name + "/" + chapter.pages[0].name });
    }
  }

  public getClass(chapter: Chapter): string {
    if (!this.locked) {
      return "overview-unlocked";
    }
    if (!this.isChapterUnlocked(chapter)) {
      return "chapter-locked";
    }
    return "chapter-unlocked";
  }

  public reset(): void {
    this.resetCourse();
    this.$router.go(0);
  }

  public isChapterUnlocked(chapter: Chapter): boolean {
    if (this.$getChapterIndex(chapter.name, this.chapters) == 0) {
      return true;
    }
    for (let i = 0; i < chapter.pages.length; i++) {
      if (
        !chapter.pages[i].content &&
        !this.isExerciseUnlocked(
          chapter.name.toLowerCase(),
          chapter.pages[i].name.toLowerCase()
        )
      ) {
        return false;
      }
    }
    return true;
  }

  public getPreviousChapter(chapter: Chapter): Chapter {
    const index = this.$getChapterIndex(chapter.name, this.chapters);
    return index === 0 ? this.chapters[0] : this.chapters[index - 1];
  }

  public openPageModal(chapter: Chapter): void {
    this.clickedChapter = chapter;
    this.isImageModalActive = true;
  }

  public closeEvent(): void {
    this.isImageModalActive = false;
  }

  @course.State
  public jumpedPage!: string;

  @course.State
  public jumpedChapter!: string;

  @course.Getter
  public isExerciseUnlocked!: (chapter: string, page: string) => boolean;

  @course.Mutation
  public switchLocked!: () => void;

  @course.Mutation
  public resetCourse!: () => void;

  @course.State
  public locked!: boolean;
}
</script>

<style scoped>
.float {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  background-color: #0c9;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
}
.my-float {
  vertical-align: middle;
  margin-top: 18px;
}
</style>
