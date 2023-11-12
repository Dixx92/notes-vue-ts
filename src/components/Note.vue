<template>
	<div class="note">
		<p class="note__title">
			{{ note.title }}
		</p>
		<ul class="tasks__wrapper">
			<Task v-for="task in note.tasks" :task="task" />
		</ul>
	</div>
</template>

<script setup lang="ts">
import Task from '@/components/Task.vue';

defineProps<{ note: object }>();

const tasks = note.tasks
</script>

<style lang="stylus">
.note
  border 1px solid #D9D9D9
  border-radius 8px
</style>
