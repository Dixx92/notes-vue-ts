<template>
  <h1>Vite + Vue</h1>

  <div class="card">
    <button
      type="button"
      @click="count++"
    >
      count is {{ count }}
    </button>
    <div class="notes__wrapper">
      <Note
        v-for="note in notes"
        :note="note"
        :mode="APP_MODES.VIEW_NOTES"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {useStore} from 'vuex';

import Note from '@/components/Note.vue';
import APP_MODES from '@/enums/AppModes';

const store = useStore();

const count = ref(0);
const notes = computed(() => store.getters.notes);
</script>

<style lang="stylus">
.notes__wrapper
  display grid
  gap 8px
</style>
