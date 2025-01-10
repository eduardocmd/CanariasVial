import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import IndexBotView from '../views/bot/IndexBotView.vue'
import SelectorIsla from '../views/bot/SelectorIslaView.vue'
import NuevaAlerta from '../views/bot/NuevaAlertaView.vue'
import SettingsView from '../views/bot/SettingsBotView.vue'
import CamerasView from '../views/bot/CamerasView.vue'
import AdminMenu from '../views/bot/AdminView.vue';
import Alertas from '../views/AlertasView.vue';
import About from '@/views/AboutView.vue'
import RoadMap from '@/views/RoadMapView.vue';
import CookiesView from '@/views/CookiesView.vue'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,

    },
    {
      path: '/alertas',
      name: 'alertas',
      component: Alertas,

    },
    {
      path: '/about',
      name: 'about',
      component: About,

    },
    {
      path: '/roadmap',
      name: 'roadmap',
      component: RoadMap,

    },
    {
      path: '/cookies',
      name: 'cookies',
      component: CookiesView,

    },


    //Mini App / BOT Telegram
    {
      path: '/bot',
      name: 'bot',
      component: IndexBotView,
      meta: { hideHeader: true, noCache: true }

    },
    {
      path: '/bot/adminmemu',
      name: 'bot-adminmemu',
      component: AdminMenu,
      meta: { hideHeader: true, noCache: true }
    },
    {
      path: '/bot/cameras',
      name: 'bot-cameras',
      component: CamerasView,
      meta: { hideHeader: true },

    },
    {
      path: '/bot/settingsbot',
      name: 'bot-settings',
      component: SettingsView,
      meta: { hideHeader: true, noCache: true },
    },
    {
      path: '/bot/selectorisla',
      name: 'bot-selectorisla',
      component: SelectorIsla,
      meta: { hideHeader: true, noCache: true }
    },
    {
      path: '/bot/nuevaalerta/',
      name: 'bot-nuevaalerta',
      component: NuevaAlerta,
      meta: { hideHeader: true, noCache: true }
    }
  ]
  
  
})



export default router
