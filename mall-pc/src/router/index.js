import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import { useUserStore } from '../stores/user'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
      meta: { guest: true },
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/Home.vue'),
        },
        {
          path: 'products',
          name: 'ProductList',
          component: () => import('../views/ProductList.vue'),
        },
        {
          path: 'products/:id',
          name: 'ProductDetail',
          component: () => import('../views/ProductDetail.vue'),
        },
        {
          path: 'cart',
          name: 'Cart',
          component: () => import('../views/Cart.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'checkout',
          name: 'Checkout',
          component: () => import('../views/Checkout.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isLogin) {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    })
    return
  }

  if (to.meta.guest && userStore.isLogin) {
    next(typeof to.query.redirect === 'string' ? to.query.redirect : '/')
    return
  }

  next()
})

export default router
