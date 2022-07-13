import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // // 创建文章
  // {
  //   name: 'createArticle',
  //   path: '/createArticle',
  //   component: () => import('@/views/form/createArticle'),
  //   hidden: true
  // },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/draw',
    component: Layout,
    redirect: '/draw',
    children: [{
      path: 'draw',
      name: 'draw',
      component: () => import('@/views/draw/index'),
      meta: { title: 'Draw', icon: 'el-icon-brush' }
    }]
  },
  {
    path: '/articleList',
    component: Layout,
    redirect: '/articleList',
    children: [
      {
        name: 'articleList',
        path: 'articleList',
        component: () => import('@/views/form/index'),
        meta: { title: 'ArticleList', icon: 'form' },
      },
      {
        name: 'createArticle',
        path: 'createArticle',
        component: () => import('@/views/form/createArticle'),
        meta: {
          title: 'CreateArticle',
          icon: 'form'
        },
        hidden: true
      }
    ]
  },

  {
    path: '/paperjs',
    component: Layout,
    redirect: '/paperjs/tadpole',
    name: 'paperjs',
    meta: { title: 'PaperJs', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'tadpole',
        name: 'tadpole',
        component: () => import('@/views/paper/index'),
        meta: { title: 'Tadpole', icon: 'table' }
      },   
      {
        path: 'tank',
        name: 'Tank',
        component: () => import('@/views/paper/Tank/index'),
        meta: { title: 'Tank', icon: 'el-icon-aim' }
      },         

      {
        path: 'music',
        name: 'Music',
        component: () => import('@/views/paper/Music/index'),
        meta: { title: 'Music', icon: 'el-icon-headset' }
      },
      // 见缝插针
      {
        path: 'stickIn',
        name: 'StickIn',
        component: () => import('@/views/paper/StickIn/index'),
        meta: { title: 'StickIn', icon: 'table' }
      },
       // airplane
      {
        path: 'ariplane',
        name: 'Ariplane',
        component: () => import('@/views/paper/Airplane/index'),
        meta: { title: 'Airplane', icon: 'el-icon-s-promotion' }
      } 

    ]
  },
  // threejs
  {
    path: '/threejs',
    component: Layout,
    redirect: '/threejs/pcman',
    name: 'threejs',
    meta: { title: 'ThreeJs', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'pcman',
        name: 'pcman',
        component: () => import('@/views/threeJs/pcMan/index'),
        meta: { title: 'PcMan', icon: 'table' }
      }, 
      {
        path: 'circleEarth',
        name: 'circleEarth',
        component: () => import('@/views/threeJs/circleEarth'),
        meta: { title: 'CircleEarth', icon: 'el-icon-s-help'}
      }          
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },
// all kinds of toys...
{
  path: '/toys',
  component: Layout,
  redirect: '/toys/video',
  name: 'Toys',
  meta: {
    title: 'Toys',
    icon: 'nested'
  },
  children: [
    {
      path: 'video',
      component: () => import('@/views/Toys/VideoPractice/index'),
      name: 'Video',
      meta: { title: 'Video', icon: 'el-icon-video-camera' }
    }
  ]

  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
router.beforeEach((to, from, next) => {
  next()
})
export default router
