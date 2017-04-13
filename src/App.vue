<template lang="pug">
#app
  el-menu.task-menu(
    theme='dark',
    :default-active='activeIndex',
    mode='horizontal',
    @select='switchList'
  )
    span.title Todolist
    el-menu-item(index='1') All
    el-menu-item(index='2') Active
    el-menu-item(index='3') Finished
  div.add-button(@click='addTask')
    i.el-icon-plus
  TaskList.task-list(
    :tasks='tasks',
    :activeIndex='activeIndex',
    v-if='tasks.length > 0'
  )
  .nothing(
    v-else,
  ) Add some todos
</template>

<script>
import Store from './store'
// import TaskMenu from './components/TaskMenu.vue'
import TaskList from './components/TaskList.vue'

export default {
  data () {
    return {
      activeIndex: '1',
      tasks: Store.fetch(),
      // tasks: [
      //   { label: 'A unfinished task', isDone: false, date: '00-00 00:00' },
      //   { label: 'Click the checkbox to finish this task', isDone: true, date: '11-11 11:11' },
      //   { label: 'Doubleclick to edit', isDone: false, date: '22-22 22:22' },
      //   { label: 'Click the + button to add a task', isDone: false, date: '00-00 00:00' },
      // ]
    }
  },

  methods: {
    switchList (key) {
      this.activeIndex = key
    },
    addTask () {
      let create = new Date(),
          cMonth = fix(create.getMonth() + 1, 2),
          cDate = fix(create.getDate(), 2),
          cHour = fix(create.getHours(), 2),
          cMinute = fix(create.getMinutes(), 2)
      function fix(num, length) {
        return (Array(length).join('0') + num).slice(-length)
      }
      this.tasks.push({ label: '', isDone: false, date: cMonth + '-' + cDate + ' ' + cHour + ':' + cMinute })
    }
  },

  watch: {
    tasks: {
      handler: function(val, oldVal){
        Store.save(this.tasks)
      },
      deep: true
    }
  },

  components: {
    TaskList,
    // TaskMenu,
  },
}
</script>

<style lang="stylus">
*
  margin 0
  padding 0
  box-sizing border-box
  font-family "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif

body
  background-color #f6f6f6

.task-menu
  position fixed
  width 100%
  top 0
  left 0
  z-index 999
  height 60px
  line-height 60px
  
span.title
  color #eee
  float left
  text-align center
  padding 0 40px
  font-size 35px
  font-weight 300
  cursor default
  
.add-button
  position fixed
  right 40px
  bottom @right
  border-radius 50%
  height 60px
  width @height
  line-height @height
  font-size 20px
  font-weight 300
  background-color #ffee58
  color #fff
  text-align center
  box-shadow 0px 2px 5px 1px rgba(0, 0, 0, 0.2)
  transition background-color 0.3s 
  &:hover
    background-color #ffff72
  
.task-list
  margin 70px auto 30px auto
  max-width 800px
  
.nothing
  margin 180px auto 0 auto
  text-align center
  font-size 20px
  font-style italic
  color #bbb
</style>
