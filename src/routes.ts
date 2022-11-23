import Home from './pages/Home.vue'
import Channel from './pages/Channel.vue'

import { RouterOptions } from 'vue-router'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { 
    path: '/', 
    component: Home
  },
  {
    name: 'channel',
    path: '/channel/:channelId',
    component: Channel,
  },
]
