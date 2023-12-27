<template>
  <Header title="Просмотр заметки" hidden-button />

  <div v-if="note" class="note-view">
    <div class="note-view__header">
      <div class="note-view__title">{{ note.title }}</div>
      <div class="note-view__actions">
        <Button @click="toEditNote(noteId)">Редактировать</Button>
        <Button @click="deleteNote(noteId)">Удалить</Button>
      </div>
    </div>
    <ul class="note-view__tasks">
      <Task
        v-for="task in note.tasks"
        :task="task"
        @change="(taskId) => toggleTaskDone(noteId, taskId)"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useRoutes, useRouteParam } from '@/composables/Routes.ts'
import { useNotes } from '@/composables/Notes.ts';

import Header from '@/components/Header.vue';
import Button from '@/components/ui/Button.vue';
import Task from '@/components/Task.vue';

const { toAllNotes, toEditNote } = useRoutes();
const { getNote, deleteNote, toggleTaskDone } = useNotes();

const noteId = useRouteParam('id').value;
const note = computed(() => getNote(noteId));

if (!note) toAllNotes();
</script>

<style lang="stylus">
.note-view
  display flex
  flex-direction column

  &__header
    display flex
    justify-content space-between
    align-items center
    padding 16px 16px 0 24px

  &__title
    font-size 18px
    line-height 24px
    font-weight 600

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
    gap 16px

    .button
      font-size 14px
      line-height 20px
</style>
