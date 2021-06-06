import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const Layout = () => import('layouts/index.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('views/home/index.vue'),
        meta: {
          title: '首页',
          noCache: false,
          navbar: {
            title: '三舞餐厅'
          },
          showTab: true
        }
      },
      {
        path: 'kind',
        name: 'Kind',
        component: () => import('views/kind/index.vue'),
        meta: {
          title: '分类',
          navbar: {
            title: '三舞餐厅'
          },
          showTab: true
        }
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('views/order/index.vue'),
        meta: {
          title: '订单',
          noCache: true,
          navbar: {
            title: '三舞餐厅'
          },
          showTab: true
        }
      },
      {
        path: 'orderComment/:id(\\d+)',
        name: 'OrderComment',
        component: () => import('views/order/order-comment.vue'),
        meta: {
          title: '订单评论',
          noCache: true,
          navbar: {
            title: '订单评论',
            leftArrow: true
          }
        }
      },
      {
        path: 'orderConfirm',
        name: 'OrderConfirm',
        component: () => import('views/order-confirm/index.vue'),
        meta: {
          title: '订单确认',
          noCache: true,
          navbar: {
            title: '订单确认',
            leftArrow: true,
            backPath: '/kind'
          },
          showTab: false
        }
      },
      {
        path: 'orderDetail/:id(\\d+)',
        name: 'OrderDetail',
        component: () => import('views/order-detail/index.vue'),
        meta: {
          title: '订单详情'
        }
      },
      {
        path: 'address-list',
        name: 'AddressList',
        component: () => import('views/address-list/index.vue'),
        meta: {
          title: '地址列表',
          noCache: true,
          navbar: {
            title: '地址列表',
            leftArrow: true
          },
          showTab: false
        }
      },
      {
        path: 'address-edit-or-add',
        name: 'AddressEditOrAdd',
        component: () => import('views/address-edit-or-add/index.vue'),
        meta: {
          title: '编辑地址',
          showTab: false
        }
      },
      {
        path: 'pay',
        name: 'Pay',
        component: () => import('views/pay/index.vue'),
        meta: {
          title: '支付',
          navbar: {
            title: '付款',
            leftArrow: true,
            backPath: '/kind'
          },
          showTab: false
        }
      },
      {
        path: 'my',
        name: 'My',
        component: () => import('views/my/index.vue'),
        meta: {
          title: '我的',
          showTab: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Singin',
    meta: {
      title: '登录'
    },
    component: () => import('views/login/singin.vue')
  },
  {
    path: '/register',
    name: 'Singup',
    meta: {
      title: '注册'
    },
    component: () => import('views/login/singup.vue')
  },
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path(.*)*',
        component: () => import('views/redirect/index.vue'),
        meta: {
          noCache: true
        }
      }
    ]
  },
  {
    path: '/error/404',
    name: 'NotFound',
    meta: {
      title: '404'
    },
    component: () => import('views/error/404.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/error/404'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
