import {createRouter, createWebHistory, Router, RouteRecordRaw} from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import NoteView from '@/views/NoteView.vue';
import NoteFormView from '@/views/NoteFormView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AllNotes',
    component: HomeView
  },
  {
    path: '/note',
    name: 'CreateNote',
    component: NoteFormView,
  },
  {
    path: '/note/:id',
    name: 'ViewNote',
    component: NoteView,
  },
  {
    path: '/note/:id/edit',
    name: 'EditNote',
    component: NoteFormView,
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
