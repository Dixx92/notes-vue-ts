import router from '@/router';

export function useRoutes() {
  const toAllNotes = () =>
    router.push({ name: 'AllNotes' });

  const toViewNote = (id: string) =>
    router.push({ name: 'ViewNote', params: { id } });

  const toCreateNote = () =>
    router.push({ name: 'CreateNote' });

  const toEditNote = (id: string) =>
    router.push({ name: 'EditNote', params: { id } })

  const prevRouter = () => {
    router.back();
  }

  return {
    toAllNotes,
    toViewNote,
    toCreateNote,
    toEditNote,
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
