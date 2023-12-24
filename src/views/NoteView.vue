<template>
  <div v-if="note" class="note-view">
    <h2 class="note-view__title">
      Название заметки: {{ note.title }}
    </h2>
    <ul class="note-view__tasks">
      <Task
        v-for="task in note.tasks"
        :task="task"
        @change="(taskId) => toggleTaskDone(noteId, taskId)"
      />
    </ul>
    <div class="note-view__actions">
      <button @click="editNote(noteId)">Редактировать</button>
      <button @click="deleteNote(noteId)">Удалить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useRoutes, useRouteParam } from '@/composables/Routes.ts'
import { useNotes } from '@/composables/Notes.ts';

import Task from '@/components/Task.vue';

const { editNote } = useRoutes();
const { getNote, deleteNote, toggleTaskDone } = useNotes();

const noteId = useRouteParam('id').value;
const note = computed(() => getNote(noteId));
</script>

<style lang="stylus">
.note-view
  display grid
  gap 16px

  &__tasks
    display grid
    padding 0 16px
    gap 8px

    .task
      display flex
      padding 16px
      border 1px solid #d9d9d9
      border-radius 8px

      input
        width 20px
        height 20px
        margin 0 8px 0 0

      label
        line-height 20px

  &__actions
    display flex
    justify-content center
    padding 16px 0
    gap 16px

  &__button
    padding 8px 16px
    border 2px solid green
    border-radius 8px

    &--inactive
      background-color #808080
      border 2px solid #808080
</style>
