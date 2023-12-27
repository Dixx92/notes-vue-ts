import { computed } from 'vue';

import { useStore } from 'vuex';
import { useRoutes } from '@/composables/Routes.ts';

import Note from '@/types/Note.ts';
import Task from '@/types/Task.ts';

import generateUID from '@/utils/generateUID.ts';

export function useNotes() {
  const { toAllNotes, prevRouter } = useRoutes();

  const store = useStore();

  const notes = computed(() => store.getters.notes);

  const compareTasks = (a: Task, b: Task) => (Number(a.isDone) - Number(b.isDone)) || ((a.created ?? 0) - (b.created ?? 0));

  const sortedNotes = computed(() =>
    notes.value
      .map((note: Note) => ({ ...note, tasks: note.tasks.sort(compareTasks) }))
  );

  const getNote = (id: string): Note | undefined => notes.value.find((note: Note) => note.id === id);

  const addNote = async (title: string, tasks: Task[]) => {
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

      await toAllNotes();
    }
  }

  const toggleTaskDone = async (noteId: string, taskId: string) => {
    await store.dispatch('toggleTaskDone', { noteId, taskId });
  }

  const createTask = (text = ''): Task => ({
    id: generateUID(),
    text,
    ...(text && { created: Date.now() }),
    isDone: false,
  });

  return {
    notes,
    sortedNotes,
    getNote,
    addNote,
    updateNote,
    deleteNote,
    toggleTaskDone,
    createTask,
  }
}
