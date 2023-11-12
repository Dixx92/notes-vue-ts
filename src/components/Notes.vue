<template>
	<h1>{{ msg }}</h1>

	<div class="card">
		<button
			type="button"
			@click="count++"
		>
			count is {{ count }}
		</button>
		<div class="notes__wrapper">
			<Note v-for="note in notes" :note="note" />
		</div>
	</div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

import Note from '@/components/Note.vue';

import NotesData from '@/data/notes.json';

defineProps<{ msg: string }>();

const count = ref(0);
const notes = ref(NotesData);
</script>

<style lang="stylus">
.notes__wrapper
  display grid
  gap 8px
</style>
