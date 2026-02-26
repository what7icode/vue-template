// 常量路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/LoginIndex.vue'),
    name: 'login',
    meta: { title: '登录', hidden: true },
  },
  {
    path: '/',
    component: () => import('@/layout/LayoutIndex.vue'),
    name: 'layout',
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/HomeIndex.vue'),
        name: 'home',
        meta: { title: '首页', hidden: false, icon: 'HomeFilled' },
      },
    ],
    meta: { title: '', hidden: false, icon: '' },
  },
  {
    path: '/acl',
    component: () => import('@/layout/LayoutIndex.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      icon: 'Lock',
    },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/AclUser.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          icon: 'User',
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/AclRole.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          icon: 'UserFilled',
        },
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/AclPermission.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          icon: 'Monitor',
        },
      },
    ],
  },
  {
    path: '/product',
    component: () => import('@/layout/LayoutIndex.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      icon: 'Goods',
    },
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/ProTrademark.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCartFull',
        },
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/ProAttr.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          icon: 'ChromeFilled',
        },
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/ProSpu.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          icon: 'Calendar',
        },
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/ProSku.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          icon: 'Orange',
        },
      },
    ],
  },

  {
    path: '/screen',
    component: () => import('@/views/screen/ScreenIndex.vue'),
    name: 'screen',
    meta: { title: '数据大屏', hidden: false, icon: 'Monitor' },
  },
  {
    path: '/404',
    component: () => import('@/views/404/404Index.vue'),
    name: 'notFound',
    meta: { title: '404', hidden: true },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'notFound',
    meta: { title: '任意路由', hidden: true },
  },
]
