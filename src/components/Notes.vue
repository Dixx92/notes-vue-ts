<template>
  <h1>{{ msg }}</h1>

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
import {ref} from 'vue';
import {useStore} from '@/store';

import Note from '@/components/Note.vue';
import APP_MODES from '@/enums/AppModes';

defineProps<{ msg: string }>();

const store = useStore();

const count = ref(0);
const notes = store.state.notes;
</script>

<style lang="stylus">
.notes__wrapper
  display grid
  gap 8px
</style>
