<template lang="pug">
el-menu(
  theme='dark'
  v-bind:default-active='index'
  mode='horizontal'
  @select='handleSelect'
)
  span.title Todolist
  el-menu-item(index='1') All
  el-menu-item(index='2') Active
  el-menu-item(index='3') Finished
  //- el-input.search(
  //-   placeholder='Search'
  //-   icon='search'
  //-   vbind:on-icon-click='search'
  //- )
</template>

<script>
export default {
  data () {
    return {
      index: '1',
    }
  },

  methods: {
    handleSelect(key, keyPath) {
      console.log(key,
      keyPath)
    },
    search() {

    }
  }
}
</script>

<style lang="stylus">

  
// .search
//   position absolute
//   width 90px
//   right 0
//   top 50%
//   margin -18px 40px 0 0
//   // transition-duration 0.2s
//   &:focus
//     width 180px
</style>