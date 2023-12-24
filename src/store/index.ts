import {createStore, Store} from 'vuex';

import State from '@/types/State';
import Note from '@/types/Note';
import Task from '@/types/Task.ts';

import generateUID from '@/utils/generateUID.ts';

import notes from '@/store/data/notes.json';

const store: Store<State> = createStore<State>({
  state: {
    notes: notes as Note[],
  },
  getters: {
    notes: (state) => state.notes,
  },
  actions: {
    addNote({state, commit}, { title = '', tasks = []}) {
      const note: Note = {
        id: generateUID(),
        created: Date.now(),
        title,
        tasks,
      };

      note.tasks.forEach((task: Task) => {
        task.created = task.created || Date.now();
      });

      const notes =  [...state.notes, note];

      commit('notes', notes);
    },

    updateNote({ state, commit }, { noteId, title, tasks }) {
      const note = state.notes.find((note) => note.id === noteId);

      if (note) {
        tasks.forEach((task: Task) => {
          task.created = task.created || Date.now();
        });

        commit('note', { note, title, tasks });
      }
    },

    deleteNote({ state, commit }, { noteId }) {
      const notes = state.notes.filter((note) => note.id !== noteId);

      commit('notes', notes);
    },

    toggleTaskDone({ state, commit}, { noteId, taskId }) {
      const note = state.notes.find((note) => note.id === noteId);
      const task = note?.tasks.find((task) => task.id === taskId);

      if (task) {
        commit('taskDone', task);
      }
    }
  },
  mutations: {
    notes: (state, notes: Note[]) => {
      state.notes = notes;
    },

    note: (_, { note, title, tasks }) => {
      note.title = title;
      note.tasks = tasks;
    },

    taskDone: (_, task: Task) => {
      task.isDone = !task.isDone;
    },
  },
})

export default store;
