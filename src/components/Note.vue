<template>
	<div class="note">
    <div class="note__header">
      <div class="note__title">{{ note.title }}</div>
      <div class="note__actions">
        <Button class="note__btn" @click.stop="toEditNote(note.id)">
          Редактировать
        </Button>
        <Button class="note__btn" @click.stop="deleteNote(note.id)">
          Удалить
        </Button>
      </div>
    </div>
    <div class="note__tasks">
      <ul class="note__tasks-list" v-if="tasks.length">
        <Task v-for="task in tasks" :task="task" readonly />
      </ul>
      <p v-else>Нет активных задач</p>
    </div>
	</div>
</template>

<script setup lang="ts">
import Task from '@/components/Task.vue';

import { useRoutes } from '@/composables/Routes.ts';
import { useNotes } from '@/composables/Notes.ts';

import Note from '@/types/Note.ts';
import Button from '@/components/ui/Button.vue';

const props = defineProps<{
  note: Note,
  isShortTaskList: boolean,
}>();

const tasks = props.isShortTaskList
  ? props.note.tasks
    .filter((task) => !task.isDone)
    .slice(0, 3)
  : props.note.tasks;

const { toEditNote } = useRoutes();
const { deleteNote } = useNotes();
</script>

<style lang="stylus">
.note
  &__header
    display flex
    justify-content space-between
    align-items center
    padding 8px 8px 0
    gap 8px

  &__title
    font-size 18px
    line-height 36px

  &__actions
    display flex
    gap 8px

  &__btn
    padding 4px 8px
    font-size 14px
    line-height 20px

  &__tasks
    border 1px solid #D9D9D9
    border-radius 8px

    &-list
      padding 0 40px
</style>
