import {createStore, Store} from 'vuex';
import getters from '@/store/getters';

import State from '@/types/State';
import Note from '@/types/Note';

import Notes from '@/store/data/notes.json';

const store: Store<State> = createStore<State>({
  state: {
    notes: Notes as Note[]
  },
  getters,
})

export default store;
