<template>
  <div id="app">
    <headers class="header" v-if="isRouterAlive"></headers>
    <router-view v-if="isRouterAlive" class="main"/>
    <footers class="footer"></footers>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Headers from "@/components/headers/Headers.vue";
import Footers from "@/components/footers/Footers.vue";
export default {
  name: 'app',
  components: {
    Headers,
    Footers
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })

    }
  }
}
</script>

<style>
/*全局样式*/
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
li {
  list-style: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.main {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
