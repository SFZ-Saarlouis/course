import { Plugin } from '@nuxt/types'
import { Chapter, Page } from '~/interfaces/Chapter'

declare module 'vue/types/vue' {
  // inject into Vue instances
  interface Vue {
    $getChapterIndex(chapter_name: string, chapters: Array<Chapter>): number
    $getPageIndex(page_name: string, pages: Array<Page>): number
    $getPageName(page_name: string, pages: Array<Page>): string
    $getChapterName(chapter_name: string, chapters: Array<Chapter>): string
    $getChapter(chapter_name: string, chapters: Array<Chapter>): Chapter
    $getPage(page_name: string, pages: Array<Page>): Page
  }
}

declare module '@nuxt/types' {
  // inject into nuxtjs context
  interface Context {
    $getChapter(chapter_name: string, chapters: Array<Chapter>): Chapter
    $getPage(page_name: string, pages: Array<Page>): Page
  }
}

const myPlugin: Plugin = (context, inject) => {
  inject('getChapterIndex', (chapter_name: string, chapters: Array<Chapter>): number => {
    return chapters
      .map((item) => item.name.toLowerCase())
      .indexOf(chapter_name.toLowerCase());
  })
  inject('getPageIndex', (page_name: string, pages: Array<Page>): number => {
    return pages
      .map((item) => item.name.toLowerCase())
      .indexOf(page_name.toLowerCase());
  })
  inject('getPageName', (page_name: string, pages: Array<Page>): string => {
    return (
      pages.map((item) => item.name.toLowerCase()).indexOf(page_name.toLowerCase()) +
      1 +
      ". " +
      page_name
    );
  })
  inject('getChapterName', (chapter_name: string, chapters: Array<Chapter>): string => {
    return (
      chapters.map((item) => item.name.toLowerCase()).indexOf(chapter_name.toLowerCase()) +
      1 +
      ". " +
      chapter_name
    );
  })
  inject('getChapter', (chapter_name: string, chapters: Array<Chapter>): Chapter => {
    return chapters.filter(
      (item) => item.name.toLowerCase() === chapter_name.toLowerCase()
    )[0];
  })
  inject('getPage', (page_name: string, pages: Array<Page>): Page => {
    return pages.filter(
      item => item.name.toLowerCase() === page_name.toLowerCase()
    )[0];
  })
}

export default myPlugin