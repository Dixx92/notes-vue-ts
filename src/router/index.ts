import {createRouter, createWebHistory, Router, RouteRecordRaw} from 'vue-router';
import Notes from '@/components/Notes.vue';
import Note from '@/components/Note.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AllNotes',
    component: Notes
  },
  {
    path: '/note',
    name: 'CreateNote',
    component: Note,
  },
  {
    path: '/note/:id',
    name: 'ViewNote',
    component: Note,
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    redirect: '/',
  },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
