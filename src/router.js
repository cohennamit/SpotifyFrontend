import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './views/Home.vue'
import Chat from './views/Chat.vue'
import StationIndex from './views/StationIndex.vue'
import ReviewIndex from './views/ReviewIndex.vue'
import LoginSignup from './views/LoginSignup.vue'
import UserDetails from './views/UserDetails.vue'
import SearchPage from './views/SearchPage.vue'
import GenreDetails from './views/GenreDetails.vue'
import StationDetails from './views/StationDetails.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/station',
    name: 'StationIndex',
    component: StationIndex
  },
  {
    path: '/station/:stationId',
    name: 'StationDetails',
    component: StationDetails
  },
  {
    path: '/review',
    name: 'ReviewIndex',
    component: ReviewIndex
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/login',
    name: 'LoginSignup',
    component: LoginSignup
  },
  {
    path: '/user/:id',
    name: 'UserDetails',
    component: UserDetails
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchPage
  },
  {
    path: '/genre/:label',
    name: 'genre',
    component: GenreDetails
  },

]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

