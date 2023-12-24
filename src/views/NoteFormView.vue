<template>
  <div class="note-form">
    <div class="note-form__title">
      <label>
        Название заметки:
        <input v-model="title"/>
      </label>
    </div>
    <div class="note-form__tasks">
      <label v-for="(task, index) in tasks">
        Задача {{ index + 1 }}
        <input
          :value="task.text"
          @input="(event) => changeTask(task, event)"
        />
      </label>
    </div>
    <div class="note-form__actions">
      <button
        v-if="noteId"
        class="note-form__button"
        :class="{ 'note-form__button--inactive': !validateForm }"
        @click="updateNote(noteId, title, filledTasks)"
      >
        Изменить
      </button>
      <button
        v-else
        class="note-form__button"
        :class="{ 'note-form__button--inactive': !validateForm }"
        @click="saveNote(title, filledTasks)"
      >
        Создать
      </button>
      <button class="note-form__button" @click="prevRouter">
        Отмена
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';

import { useRoutes, useRouteParam } from '@/composables/Routes.ts';
import { useNotes } from '@/composables/Notes.ts';

import Task from "@/types/Task.ts";

import generateUID from '@/utils/generateUID.ts';

const MIN_DISPLAY_TASKS_LENGTH = 3;

const { prevRouter } = useRoutes();

const createTask = (text = ''): Task => ({
  id: generateUID(),
  text,
  ...(text && { created: Date.now() }),
  isDone: false,
});

const { getNote, saveNote, updateNote } = useNotes();

const noteId = useRouteParam('id').value;
const note = getNote(noteId);

const title = ref(note?.title ?? '');
const tasks = ref(note?.tasks ?? []);

if (tasks.value.length < 3) {
  const numberTasksToAdd = Math.max(MIN_DISPLAY_TASKS_LENGTH - tasks.value.length, 0);

  tasks.value = [...tasks.value, ...Array.from(Array(numberTasksToAdd), createTask)];
}

const filledTasks = computed(() => tasks.value.filter((task) => task.text));
const validateForm = computed(() => Boolean(title.value && filledTasks.value.length));

const changeTask = (task: Task, event: Event) => {
  task.text = (<HTMLInputElement>event.target).value;

  if (tasks.value.length === filledTasks.value.length) {
    tasks.value.push(createTask());
  }
};
</script>

<style lang="stylus">
.note-form
  display flex
  flex-direction column
  gap 16px

  &__title
    padding 16px

  &__tasks
    display grid
    gap 8px

  &__actions
    display flex
    justify-content center
    padding 16px 0
    gap 16px

  &__button
    padding 8px 16px
    border 2px solid green
    border-radius 8px
    text-transform uppercase

    &--inactive
      background-color #808080
      border 2px solid #808080
</style>
