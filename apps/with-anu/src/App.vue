<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import { ABtn, ARadio } from 'anu-vue'
import { ref } from 'vue'

const favoriteFruit = ref(null)
</script>

<template>
  <div>
    <ABtn>Button</ABtn>
    <ARadio
      v-model="favoriteFruit"
      name="fruit"
      value="banana"
      label="Banana"
    />
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
