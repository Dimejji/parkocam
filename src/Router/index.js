import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import EntryGate from '../views/EntryGate.vue'

const routes = [
  {
    path: '/',
    component: Dashboard,
    children: [
      {
        path: '',
        redirect: '/entrygate',
      },
      {
        path: 'entrygate',
        component: EntryGate,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router