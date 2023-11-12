<template>
	<li class="task">
		<input type="checkbox" name="task" :checked="task.isDone" />
		<label for="task">{{ task.label }}</label>
	</li>
</template>

<script setup lang="ts">
defineProps<{ task: object }>();
</script>

<style lang="stylus">
.task
  text-align start
  list-style none
</style>
