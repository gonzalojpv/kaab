import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import filters from './utils/filters'

import './style.css'
import '@/assets/scss/app.scss'

const head = createHead()
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App).use(head).use(router).use(pinia)

app.config.globalProperties.$filters = filters

app.mount('#app')
