import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'examlist',
    component: () => import('../views/ExamList.vue')
  },
  {
    path: '/exam/:idx',
    name: 'exam',
    component: () => import('../views/Exam.vue')
  },
  {
    path: '/404',
    name: 'notfound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
