<template>
	<div class="note">
    <p class="note__title">
      {{ note.title }}
    </p>
    <ul v-if="tasks.length" class="note__tasks">
      <Task v-for="task in tasks" :task="task" />
    </ul>
    <p v-else class="note__tasks-empty">
      Нет активных задач
    </p>
	</div>
</template>

<script setup lang="ts">
import Task from '@/components/Task.vue';

import Note from '@/types/Note.ts';

const props = defineProps<{
  note: Note,
  isShortTaskList: boolean,
}>();

const tasks = props.isShortTaskList
  ? props.note.tasks
    .filter((task) => !task.isDone)
    .slice(0, 3)
  : props.note.tasks;
</script>

<style lang="stylus">
.note
  border 1px solid #D9D9D9
  border-radius 8px
  cursor pointer

  &__task-wrapper
    list-style none
</style>
