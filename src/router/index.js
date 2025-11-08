import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewsDetailView from '../views/NewsDetailView.vue'
import SubmitNewsView from '../views/SubmitNewsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/news/:id',
    name: 'newsDetail',
    component: NewsDetailView,
    props: true
  },
  {
    path: '/submit',
    name: 'submitNews',
    component: SubmitNewsView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router