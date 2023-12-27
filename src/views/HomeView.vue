<template>
  <Header title="Список заметок" />

  <div class="home-view">
    <div class="notes__wrapper">
      <Note
        v-for="note in sortedNotes"
        :note="note"
        :is-short-task-list="true"
        @click="toViewNote(note.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoutes } from '@/composables/Routes.ts';
import { useNotes } from '@/composables/Notes.ts';

import Header from '@/components/Header.vue';
import Note from '@/components/Note.vue';

const { toViewNote } = useRoutes();
const { sortedNotes } = useNotes();
</script>

<style lang="stylus">
.notes__wrapper
  display grid
  gap 8px
</style>
