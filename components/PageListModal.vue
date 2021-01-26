<template>
  <b-modal
    v-model="isActive"
    trap-focus
    has-modal-card
    scroll="keep"
    @close="closeModal"
  >
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title" style="text-align: center">
          {{ chapter.name }}
        </p>
      </header>
      <section class="modal-card-body" style="text-align: left">
        <div
          v-for="item in chapter.pages"
          :key="item.name"
          class="tile is-parent"
          @click="openPage(item)"
        >
          <article
            class="tile is-child notification is-danger"
            :style="{ backgroundColor: getColor(item) }"
          >
            <p class="title">
              {{ $getPageName(item.name, chapter.pages) }}
            </p>
          </article>
        </div>
      </section>
      <footer class="modal-card-foot" />
    </div>
  </b-modal>
</template>
<script lang="ts">
import { Vue, Component, Prop, namespace } from "nuxt-property-decorator";
import { Chapter, Page } from "~/interfaces/Chapter";
const course = namespace("course");
import data from "~/assets/data.json";

@Component
export default class PageListModal extends Vue {
  @Prop({ required: true }) readonly chapter!: Chapter;
  isActive = true;
  chapters: Array<Chapter> = data;

  public closeModal(): void {
    this.$emit("closePageModal");
  }

  public openPage(page: Page): void {
    if (this.allowedToJump(page)) {
      this.$router.push({ path: "/" + this.chapter.name + "/" + page.name });
    }
  }

  public getColor(page: Page): string {
    if (this.jumpedPage.length === 0 && this.jumpedChapter.length === 0) {
      return "hsl(141, 53%, 53%)";
    }
    if (this.allowedToJump(page)) {
      return "hsl(141, 53%, 53%)";
    }
    return "hsl(0, 0%, 21%)";
  }

  get allowedToJump() {
    return (page: Page): boolean => {
      if(!this.locked){
        return true;
      }
      if(this.isExerciseUnlocked(this.chapter.name, page.name)){
        return true;
      }
      if (this.jumpedChapter.length !== 0 && this.jumpedPage.length !== 0) {
        const chapterIndex = this.$getChapterIndex(
          this.chapter.name,
          this.chapters
        );
        const pageIndex = this.$getPageIndex(page.name, this.chapter.pages);
        const jumpedChapter = this.$getChapter(
          this.jumpedChapter,
          this.chapters
        );
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
        if (
          chapterIndex == jumpedChapterIndex &&
          pageIndex <= jumpedPageIndex
        ) {
          return true;
        }
      }
      return false;
    };
  }

  @course.State
  public locked!: boolean;

  @course.Getter
  public isExerciseUnlocked!: (chapter: string, page: string) => boolean;

  @course.State
  public jumpedPage!: string;

  @course.State
  public jumpedChapter!: string;
}
</script>

<style>
.card-content .content {
  font-size: 14px;
  margin: 1rem 1rem;
}
.card-content .content h4 {
  font-size: 16px;
  font-weight: 700;
}
.card {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
  margin-bottom: 2rem;
}
.animation-content {
  overflow-y: hidden;
}
.modal-card-head,
.modal-card-foot {
  background-color: white;
  border-color: white;
}
</style>
