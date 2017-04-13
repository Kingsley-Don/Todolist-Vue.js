<template lang="pug">
.task-container(
  @click='doFocus',
  :class="{ 'isFocused': isFocused }"
)
  el-checkbox.task-checkbox(
    v-model='task.isDone'
  )
  span.task-label(
    v-show='!isEditing',
    :class="{'done': task.isDone}",
    v-text='task.label',
    @dblclick='doEdit'
  )
  input.task-edit(
    v-show='isEditing',
    type='text',
    v-focus='isEditing',
    resize='none',
    @blur='saveEdit',
    @keyup.enter='saveEdit',
    @keyup.esc='exitEdit',
    placeholder='edit this task',
    v-model='editedTask'
  )
  i.el-icon-circle-close.del-button(
    @click='del'
  )
  span.task-date(
    v-text='task.date'
  )
</template>

<script>
export default{
  props: ['tasks', 'task', 'index'],
  data () {
    return {
      editedTask: '',
      isEditing: false,
      isFocused: false
    }
  },
  methods: {
    doEdit () {
      this.editedTask = this.task.label
      this.isEditing = true
    },
    saveEdit () {
      if (!this.editedTask == "") {
        this.task.label = this.editedTask
      } else {
        this.tasks.splice(this.index, 1)
      }
      this.isEditing = false
    },
    exitEdit () {
      if (this.editedTask == "") {
        this.tasks.splice(this.index, 1)
      } else {
        this.isEditing = false
      }
    },
    doFocus () {
      this.isFocused = true
    },
    del () {
      this.tasks.splice(this.index, 1)
    }
  },
  directives: {
    focus (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  },
  mounted () {
    if (this.task.label == "") {
      this.isEditing = true
    }
  }
}
</script>

<style lang="stylus">
inset-shadow = inset 0 0 1px 1px rgba(0, 0, 0, 0.2)
text-color = #666
done-color = #ccc
date-color = #ddd
font-size = 20px
font-weight = 300
line-height = font-size * 1.5
p = 17px

.task-container
  width 100%
  padding 0 17px
  display flex
  align-items center
  background-color #fff
  border-bottom 1px solid #eee
  transition 0.25s ease-out 0.05s
  transition-property opacity, height
  height 65px
  // &.isFocused
    // height initial
  &:focus .task-label
    overflow initial
    word-break break-all
    white-space pre-wrap

.task-checkbox
  margin-right 10px

.task-label
  flex 1
  transition-duration 0.2s
  color text-color
  line-height line-height
  font-size font-size
  cursor default
  // word-break break-all
  text-overflow ellipsis
  padding p 8px
  white-space pre
  font-weight font-weight
  overflow hidden
  // min-width 0

.task-edit 
  flex 1
  line-height line-height
  font-size font-size
  padding p 8px
  border 0
  color text-color
  cursor auto
  font-weight font-weight
  &:focus
    outline 0
    outline-offset 0
    box-shadow inset-shadow
    
.task-date
  text-align right
  font-size 16px
  font-style italic
  color date-color
  font-weight 400
  width 90px
  overflow hidden

.done
  text-decoration line-through
  color done-color

.del-button
  display none
  width 30px
  text-align center
  color done-color

.task-container:hover .del-button
  display block
</style>