<template>
  <div class="card">
    <button type="button" @click="createNote">
      Добавить заметку
    </button>
    <div class="notes__wrapper">
      <Note
        v-for="note in sortedNotes"
        :note="note"
        :is-short-task-list="true"
        @click="viewNote(note.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoutes } from '@/composables/Routes.ts';
import { useNotes } from '@/composables/Notes.ts';

import Note from '@/components/Note.vue';

const { createNote, viewNote } = useRoutes();
const { sortedNotes } = useNotes();
</script>

<style lang="stylus">
.notes__wrapper
  display grid
  gap 8px
</style>
