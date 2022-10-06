<template>
  <div id="app">
    <Nav></Nav>
    <transition>
      <router-view/>
    </transition>
  </div>
</template>
<script>
  import Nav from '@/components/nav.vue'

  export default {
    components: {
      Nav
    }
  }
</script>
<style lang="stylus">

  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color #2c3e50

  body
    margin 0px
</style>
