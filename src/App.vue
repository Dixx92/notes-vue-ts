<template>
  <div>
    <div class="header">
      <a href="/" @click.prevent="allNotes">
        <img
          src="/vite.svg"
          class="logo"
          alt="Vite logo"
        >
      </a>
      <a href="/" @click.prevent="allNotes">
        <img
          src="./assets/vue.svg"
          class="logo vue"
          alt="Vue logo"
        >
      </a>
    </div>
  </div>
  <router-view />
</template>

<script setup lang="ts">
import { useRoutes } from '@/composables/Routes.ts';

const { allNotes } = useRoutes();
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
