import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { Exercise } from '~/interfaces/Excercise'

@Module({
  name: 'course',
  stateFactory: true,
  namespaced: true
})
export default class Course extends VuexModule {
  locked = true;
  jumpedPage = '';
  jumpedChapter = '';
  unlockedExercise: Array<Exercise> = JSON.parse(localStorage.getItem(process.env.courseName + '-unlockedChapters') || '[]');

  get isExerciseUnlocked() {
    return (chapter: string, page: string): boolean => {
      return this.unlockedExercise.filter(item => item.chapter === chapter && item.page === page).length > 0
    }
  }

  @Mutation
  public unlockExercise(exercise: Exercise): void {
    if (this.unlockedExercise.filter(item => item.chapter === exercise.chapter && item.page === exercise.page).length > 0) {
      return
    }
    this.unlockedExercise.push(exercise)
    localStorage.setItem(process.env.courseName +
      '-unlockedChapters',
      JSON.stringify(this.unlockedExercise)
    )
  }

  @Mutation
  public switchLocked(): void {
    this.locked = !this.locked
  }

  @Mutation
  public setJumpedPage(page: string): void {
    this.jumpedPage = page;
  }

  @Mutation
  public setJumpedChapter(chapter: string): void {
    this.jumpedChapter = chapter;
  }

  @Mutation
  public resetCourse(): void {
    localStorage.removeItem(process.env.courseName + '-unlockedChapters')
  }
}
