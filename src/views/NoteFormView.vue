<template>
  <Header
    :title="note ? 'Форма редактирования' : 'Форма добавления'"
    hidden-button
  />

  <div class="note-form">
    <div class="note-form__title">
      <label>
        Название заметки:
        <input class="note-form__field" v-model="title"/>
      </label>
    </div>
    <div class="note-form__tasks">
      <label v-for="(task, index) in tasks">
        Задача {{ index + 1 }}
        <input
          class="note-form__field"
          :value="task.text"
          @input="(event) => changeTask(task, event)"
        />
      </label>
    </div>
    <div class="note-form__actions">
      <Button v-if="noteId" @click="updateNoteHandle">Изменить</Button>
      <Button v-else @click="addNoteHandle">Создать</Button>
      <Button @click="prevRouter">Отмена</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import Header from '@/components/Header.vue';
import Button from '@/components/ui/Button.vue';

import { useRoutes, useRouteParam } from '@/composables/Routes.ts';
import { useNotes } from '@/composables/Notes.ts';

import Task from "@/types/Task.ts";

const MIN_DISPLAY_TASKS_LENGTH = 3;

const { prevRouter } = useRoutes();

const { getNote, addNote, updateNote, createTask } = useNotes();

const noteId = useRouteParam('id').value;
const note = getNote(noteId);

const title = ref(note?.title ?? '');
const tasks = ref(note?.tasks ?? []);

// Заполняем массив с задачами до необходимого минимального размера MIN_DISPLAY_TASKS_LENGTH,
// если массив нужного размера добавляем новую пустую задачу
const numberTasksToAdd = Math.max(MIN_DISPLAY_TASKS_LENGTH - tasks.value.length, 1);
tasks.value = [...tasks.value, ...Array.from(Array(numberTasksToAdd), createTask)];

const filledTasks = computed(() => tasks.value.filter((task) => task.text));

const changeTask = (task: Task, event: Event) => {
  task.text = (<HTMLInputElement>event.target).value;

  if (tasks.value.length === filledTasks.value.length) {
    tasks.value.push(createTask());
  }
};

const processValidateForm = () => {
  if (!title.value) {
    alert('Не заполнено обязательное поле "Название заметки"!');
    return false;
  }

  return true;
};

const addNoteHandle = () => {
  if (processValidateForm())
    addNote(title.value, filledTasks.value)
};

const updateNoteHandle = () => {
  if (processValidateForm())
    updateNote(noteId, title.value, filledTasks.value)
}
</script>

<style lang="stylus">
.note-form
  display flex
  flex-direction column
  gap 16px

  &__title
    padding 16px

    input
      width 265px

  &__tasks
    display grid
    gap 8px

    input
      width 340px

  &__field
    padding 8px
    margin-left 8px
    border 1px solid #d9d9d9
    border-radius 8px
    line-height 24px
    font-size 16px

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
</style>
