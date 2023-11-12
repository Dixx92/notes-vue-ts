import { createApp } from 'vue';
import {createStore} from 'vuex';
import './style.css';
import App from './App.vue';

const store = createStore({});

createApp(App)
  .use(store)
  .mount('#app');
