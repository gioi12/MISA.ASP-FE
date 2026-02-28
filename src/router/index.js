import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'employee',
      component: () => import('@/views/employee/EmployeeView.vue'),
    },
  ],
})

export default router
