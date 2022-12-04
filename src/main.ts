import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { routes } from './routes'
import { createWebHistory, createRouter } from 'vue-router'
import { createPinia } from 'pinia'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
  .use(router)
  .use(createPinia())

app.mount('#app')
