import { createRouter, createWebHashHistory } from 'vue-router' //createWebHistory,
import store from '@/store';
import HomeView from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/itemmusic',
    name: 'itemmusic',
    component: () => import('../views/ItemMusic.vue')
  },
  {
    path: '/search',
    name: 'mysearch',
    component: () => import('../views/MySearch.vue')
  },
  {
    path: '/cun',
    name: 'mycun',
    component: () => import('../views/MyCun.vue')
  },
  {
    path: '/video',
    name: 'myvideo',
    component: () => import('../views/MyVideo.vue')
  },
  {
    path: '/login',
    name: 'mylogin',
    component: () => import('../views/MyLogin.vue')
  },
  {
    path: '/user',
    name: 'myuser',
    component: () => import('../views/MyUser.vue'),
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/list',
    name: 'mylist',
    component: () => import('../views/MyPlayList.vue')
  }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),   //项目开发时使用
  history: createWebHashHistory(),   //打包程序时使用
  routes
})

router.beforeEach((to) => {
  if (to.path == '/login') {
    store.state.isFooterMusic = false
  } else {
    store.state.isFooterMusic = true
  }
})

export default router
