import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/main/main.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/about/about.vue')
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('@/views/terms/terms.vue')
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('@/views/privacy/privacy.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/contact/contact.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/views/order/order.vue')
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('@/views/shop-catalog/shop-catalog.vue')
    },
    {
      path: '/create-order',
      name: 'create-order',
      component: () => import('@/views/shop-checkout/shop-checkout.vue')
    },
    {
      path: '/event/:event_id',
      name: 'event',
      component: () => import('@/views/event-detail/event-detail.vue')
    },
    {
      path: '/project-detail/:project_id',
      name: 'project-detail',
      component: () => import('@/views/project-detail/project-detail.vue')
    },
    {
      path: '/application/:application_id',
      name: 'application',
      component: () => import('@/views/application/application.vue')
    },
    {
      path: '/payment/success',
      name: 'success',
      component: () => import('@/views/success/success.vue')
    },
    {
      path: '/payment/fail',
      name: 'fail',
      component: () => import('@/views/fail/fail.vue')
    },
    {
      path: '/payment/cancel',
      name: 'cancel',
      component: () => import('@/views/cancel/cancel.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/user/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/user/register.vue')
    },
    {
      path: '/forget-password',
      name: 'forget-password',
      component: () => import('@/views/user/forget-password.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/user/profile.vue')
    },
    {
      path: '/order-list',
      name: 'order-list',
      component: () => import('@/views/user/order-list.vue')
    },
    {
      path: '/order-detail/:order_id',
      name: 'order-detail',
      component: () => import('@/views/order/order-detail.vue')
    },
    {
      path: '/product-list',
      name: 'product-list',
      component: () => import('@/views/product/product-list.vue')
    },
    {
      path: '/product-detail/:id',
      name: 'product-detail',
      component: () => import('@/views/product/product-detail.vue')
    },
    {
      path: '/news-list',
      name: 'news-list',
      component: () => import('@/views/news/news-list.vue')
    },
    {
      path: '/news-detail/:news_id',
      name: 'news-detail',
      component: () => import('@/views/news/news-detail.vue')
    }
  ]
})

router.beforeEach((to) => {
  // document.body.scrollTop = 0 // firefox
  // document.documentElement.scrollTop = 0 // safari
})

// 在之後
router.afterEach((to) => {
  document.body.scrollTop = 0 // firefox
  document.documentElement.scrollTop = 0 // safari
})

export default router
