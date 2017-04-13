<template lang="pug">
.list-container
  Task(
    v-for='(task, index) in tasks',
    :class="{ 'hidden': isHidden(index), 'show': !isHidden(index)}",
    :task='task',
    :tasks='tasks',
    :key='index',
    :index='index'
  )
</template>

<script>
import Task from './Task.vue'

export default {
  props: ['tasks', 'activeIndex'],
  methods: {
    isHidden (index) {
      if (this.activeIndex == 2 && this.tasks[index].isDone || this.activeIndex == 3 && !this.tasks[index].isDone) {
        return true
      }
      return false
    }
  },
  components: {
    Task
  }
}
</script>

<style lang="stylus">
shadow = 0px 1px 3px 0px rgba(0, 0, 0, 0.2)

// .nothing 
//   color #bbb
//   font-style italic
//   text-align center
//   margin-top 60px

.list-container
  box-shadow shadow

.task-container.hidden
  opacity 0
  height 0
  pointer-events none
  border 0

.task-container.show
  opacity 100
</style>