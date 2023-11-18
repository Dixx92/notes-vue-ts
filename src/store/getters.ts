import {GetterTree} from 'vuex';

import State from '@/types/State'
import Note from '@/types/Note';

const getters: GetterTree<State, State> = {
  notes: (state: State) : Note[] => state.notes,
}

export default getters;
