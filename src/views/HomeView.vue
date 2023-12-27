<template>
  <Header title="Список заметок" />

  <div class="home-view">
    <div class="notes__wrapper">
      <Note
        class="notes__note-item"
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
.notes
  &__wrapper
    display grid
    gap 8px

  &__note-item
    border-radius 8px
    cursor pointer

    &:hover
      background-color #E0F2F1
</style>
