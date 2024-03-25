import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DefaultRoute from '@/router/default'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import EmptyLayout from '@/layouts/EmptyLayout.vue'
import FormulaRoute from './formula'
import PageNotFoundView from '@/views/PageNotFoundView.vue'
import ToolRoute from './tool'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: DefaultLayout,
    children: DefaultRoute
  },
  {
    path: '/formula/',
    name: 'formula',
    component: EmptyLayout,
    children: FormulaRoute
  },
  {
    path: '/tool/',
    name: 'tool',
    component: EmptyLayout,
    children: ToolRoute
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: PageNotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
