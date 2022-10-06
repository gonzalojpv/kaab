import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './style.css'

const head = createHead()
const store = createPinia()

createApp(App).use(head).use(router).use(store).mount('#app')
