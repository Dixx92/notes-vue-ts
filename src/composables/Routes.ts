import router from '@/router';

export function useRoutes() {
  const allNotes = () =>
    router.push({ name: 'AllNotes' });

  const viewNote = (id: string) =>
    router.push({ name: 'ViewNote', params: { id } });

  const createNote = () =>
    router.push({ name: 'CreateNote' });

  const editNote = (id: string) =>
    router.push({ name: 'EditNote', params: { id } })

  const prevRouter = () => {
    router.back();
  }

  return {
    allNotes,
    viewNote,
    createNote,
    editNote,
    prevRouter,
  }
}

import { computed, Ref } from 'vue'
import { useRoute } from 'vue-router'

export function useRouteParam(param: string): Ref<string> {
  const route = useRoute()

  return computed(() => {
    const paramValue = route.params[param];

    return !Array.isArray(paramValue) ? paramValue : paramValue[0];
  });
}
