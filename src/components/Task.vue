<template>
	<li class="task">
    <label>
      {{ task.text }}
		  <input type="checkbox" :checked="task.isDone" @change="handleChangeTask(task.id)" />
		</label>
	</li>
</template>

<script setup lang="ts">
import Task from '@/types/Task.ts';

defineProps<{ task: Task }>();

const emit = defineEmits<{
  change: [id: string],
}>()

const handleChangeTask = (taskId: string) => emit('change', taskId);
</script>

<style lang="stylus">
.task
  list-style none

  label
    display flex
    flex-direction row-reverse
    justify-content flex-end
</style>
