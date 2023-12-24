import { computed } from 'vue';
import { useStore } from 'vuex';

import Note from '@/types/Note.ts';
import Task from '@/types/Task.ts';
import {useRoutes} from '@/composables/Routes.ts';

export function useNotes() {
  const { prevRouter } = useRoutes();

  const store = useStore();

  const notes = computed(() => store.getters.notes);

  const compareTasks = (a: Task, b: Task) => (Number(a.isDone) - Number(b.isDone)) || ((a.created ?? 0) - (b.created ?? 0));

  const sortedNotes = computed(() =>
    notes.value
      .map((note: Note) => ({ ...note, tasks: note.tasks.sort(compareTasks) }))
  );

  const getNote = (id: string): Note | undefined => notes.value.find((note: Note) => note.id === id);

  const saveNote = async (title: string, tasks: Task[]) => {
    await store.dispatch('addNote', { title, tasks });

    prevRouter();
  };

  const updateNote = async (noteId: string, title: string, tasks: Task[]) => {
    await store.dispatch('updateNote', { noteId, title, tasks });

    prevRouter();
  }

  const deleteNote = async (noteId: string) => {
    const note = notes.value.find((note: Note) => note.id === noteId);
    const confirmNote = () => confirm(`Удалить заметку: "${note.title}"?`);

    if (note && confirmNote()) {
      await store.dispatch('deleteNote', { noteId });

      prevRouter();
    }
  }

  const toggleTaskDone = async (noteId: string, taskId: string) => {
    await store.dispatch('toggleTaskDone', { noteId, taskId });
  }

  return {
    notes,
    sortedNotes,
    getNote,
    saveNote,
    updateNote,
    deleteNote,
    toggleTaskDone,
  }
}
