import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import IndexBotView from '../views/bot/IndexBotView.vue'
import SelectorIsla from '../views/bot/SelectorIslaView.vue'
import NuevaAlerta from '../views/bot/NuevaAlertaView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/bot',
      name: 'bot',
      component: IndexBotView,
      meta: { hideHeader: true } 
    },
    {
      path: '/selectorisla',
      name: 'selectorisla',
      component: SelectorIsla,

      meta: { hideHeader: true } 
    },
    {
      path: '/nuevaalerta/:tipo',
      name: 'nuevaalerta:tipo',
      component: NuevaAlerta,
      meta: { hideHeader: true } 
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
