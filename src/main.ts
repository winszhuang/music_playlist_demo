import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { routes } from './routes'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { setupWsUrl } from './hooks/useSocketio'

const isDev = import.meta.env.DEV

console.log(import.meta.env.VITE_API_URL);
setupWsUrl(import.meta.env.VITE_API_URL)

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)
  .use(router)
  .use(createPinia())


app.mount('#app')
