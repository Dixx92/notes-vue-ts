<template>
	<div class="note">
		<p class="note__title">
			{{ note.title }}
		</p>
		<ul class="tasks__wrapper">
			<Task v-for="task in tasks" :task="task" />
		</ul>
	</div>
</template>

<script setup lang="ts">
import Task from '@/components/Task.vue';

import APP_MODES from '@/enums/AppModes';

const props = defineProps<{
  note: {
    title: string,
    tasks: typeof Task[],
  },
  mode: string,
}>();

const tasks = props.mode === APP_MODES.VIEW_NOTES
  ? props.note.tasks.slice(0, 3)
  : props.note.tasks;
</script>

<style lang="stylus">
.note
  border 1px solid #D9D9D9
  border-radius 8px
</style>
