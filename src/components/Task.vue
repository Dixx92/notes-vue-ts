<template>
	<li class="task">
    <template v-if="readonly">
      {{ task.text }}
    </template>
    <label v-else>
      {{ task.text }}
		  <input name="task" type="checkbox" :checked="task.isDone" @change="handleChangeTask(task.id)" />
		</label>
	</li>
</template>

<script setup lang="ts">
import Task from '@/types/Task.ts';

defineProps<{
  task: Task,
  readonly?: boolean,
}>();

const emit = defineEmits<{
  change: [id: string],
}>()

const handleChangeTask = (taskId: string) => emit('change', taskId);
</script>

<style lang="stylus">
.task
  list-style none
  text-align start

  label
    display flex
    flex-direction row-reverse
    justify-content flex-end
    cursor pointer
</style>
