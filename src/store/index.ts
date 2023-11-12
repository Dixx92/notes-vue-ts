import {InjectionKey} from 'vue';
import {createStore, useStore as baseUseStore, Store} from 'vuex';

import Notes from '@/store/data/notes.json';

export interface State {
  notes: Note[]
}

export interface Note {
  title: string,
  created: bigint,
  tasks: Task[],
}

export interface Task {
  label: string,
  created: bigint,
  isDone: boolean
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    notes: Notes
  }
})

export function useStore() {
  return baseUseStore(key)
}
