import { createRouter, createWebHistory } from 'vue-router'
import ACCESS_ENUM from '@/access/accessEnum'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '主页',
      component: () => import('@/layouts/BasicLayout.vue'),
      children: [
        {
          path: '/',
          name: '浏览题目',
          component: () => import('@/views/HomeView.vue'),
          meta: {
            access: ACCESS_ENUM.NOT_LOGIN
          }
        },
        {
          path: '/noAuth',
          name: '无权限',
          component: () => import('@/views/NoAuthView.vue'),
          meta: {
            access: ACCESS_ENUM.NOT_LOGIN,
            roles: ['user']
          }
        },
        {
          path: '/admin',
          name: '管理员可见',
          component: () => import('@/views/AdminView.vue'),
          meta: {
            requiresAuth: true,
            roles: ['admin'],
            access: ACCESS_ENUM.ADMIN
          }
        },
        {
          path: '/about',
          name: '关于',
          component: () => import('@/views/AboutView.vue'),
          meta: {
            access: ACCESS_ENUM.NOT_LOGIN
          }
        },
        {
          path: '/add/question',
          name: '创建题目',
          component: () => import('@/views/question/AddQuestion.vue'),
          meta: {
            access: ACCESS_ENUM.ADMIN
          }
        },
      ]
    },
    {
      path: '/user',
      name: '登录页',
      component: () => import('@/layouts/UserLayout.vue'),
      children: [
        {
          path: '/user/login',
          name: '登录',
          component: () => import('@/views/user/LoginView.vue'),
          meta: {
            access: ACCESS_ENUM.NOT_LOGIN
          }
        }
      ]
    }
  ]
})

export default router
