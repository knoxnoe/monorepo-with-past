<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import HelloButton from './components/HelloButton.vue';
import { specialButton } from './usage/specialButton';
import './usage/my-counter';
import './usage/my-greeting';
</script>

<template>
    <my-counterr></my-counterr>
    <name-tag greeting="Hola"></name-tag>
    <div>12345</div>
  <!-- <HelloButton>12345</HelloButton> -->
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
