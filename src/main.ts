import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './style.css'
import '@/assets/scss/app.scss'

const head = createHead()
const store = createPinia()

const app = createApp(App).use(head).use(router).use(store)

app.mount('#app')
