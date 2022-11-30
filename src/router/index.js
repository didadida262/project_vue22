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
  {
    path: '/test',
    component: () => import('@/views/test/index'),
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
  // openLayer
  {
    path: '/openlayer',
    component: Layout,
    redirect: '/openlayer/gd',
    meta: { title: 'Map', icon: 'map' },
    children: [
      {
        path: 'bd',
        name: 'baidu',
        component: () => import('@/views/openLayer/BaiduMap/index'),
        meta: { title: 'BaiduMap', icon: 'map' }
      },
      {
        path: 'gd',
        name: 'gaode',
        component: () => import('@/views/openLayer/GaodeMap/index'),
        meta: { title: 'GaodeMap', icon: 'map' }
      }
    ]
  },
  // article
  {
    path: '/articleList',
    component: Layout,
    redirect: '/articleList',
    children: [
      {
        name: 'articleList',
        path: 'articleList',
        component: () => import('@/views/form/index'),
        meta: { title: 'ArticleList', icon: 'form' }
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
  // paperjs
  {
    path: '/paperjs',
    component: Layout,
    redirect: '/paperjs/tadpole',
    name: 'paperjs',
    meta: { title: 'PaperJs', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'cyberfont',
        name: 'cyberfont',
        component: () => import('@/views/paper/CyberFont/index'),
        meta: { title: 'CyberFont', icon: 'shell' }
      },
      {
        path: 'snake',
        name: 'snake',
        component: () => import('@/views/paper/Snake/index'),
        meta: { title: 'Snake', icon: 'Snake' }
      },
      {
        path: 'vector',
        name: 'vector',
        component: () => import('@/views/paper/Vector/index'),
        meta: { title: 'vector', icon: 'vector' }
      },
      {
        path: 'diagram',
        name: 'diagram',
        component: () => import('@/views/paper/Diagram/index'),
        meta: { title: 'DiaGram', icon: 'tadpole' }
      },
      {
        path: 'darkball',
        name: 'darkball',
        component: () => import('@/views/paper/DarkBall/index'),
        meta: { title: 'DarkBall', icon: 'tadpole' }
      },
      {
        path: 'tadpole',
        name: 'tadpole',
        component: () => import('@/views/paper/index'),
        meta: { title: 'Tadpole', icon: 'tadpole' }
      },
      {
        path: 'tank',
        name: 'Tank',
        component: () => import('@/views/paper/Tank/index'),
        meta: { title: 'Tank', icon: 'tank' }
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
        meta: { title: 'StickIn', icon: 'line' }
      },
      // cricle点
      {
        path: 'circle',
        name: 'Circle',
        component: () => import('@/views/paper/Circle/index'),
        meta: { title: 'Circle', icon: 'circle' }
      },
      // airplane
      {
        path: 'ariplane',
        name: 'Ariplane',
        component: () => import('@/views/paper/Airplane/index'),
        meta: { title: 'Airplane', icon: 'el-icon-s-promotion' }
      },

      {
        path: 'pcman',
        name: 'pcman',
        component: () => import('@/views/paper/pcMan/index'),
        meta: { title: 'PcMan', icon: 'man' }
      },
      {
        path: 'radio',
        name: 'radio',
        component: () => import('@/views/paper/Radio/index'),
        meta: { title: 'Radio', icon: 'el-icon-headset' }
      },
      {
        path: 'watch',
        name: 'watch',
        component: () => import('@/views/paper/Watch/index'),
        meta: { title: 'Watch', icon: 'watch' }
      },
      // picturewall
      {
        path: 'picturewall',
        name: 'Picturewall',
        component: () => import('@/views/paper/PictureWall/index'),
        meta: { title: 'Picturewall', icon: 'table' }
      }
    ]
  },
  // threejs
  {
    path: '/threejs',
    component: Layout,
    redirect: '/threejs/circleEarth',
    name: 'threejs',
    meta: { title: 'ThreeJs', icon: 'el-icon-s-help' },
    children: [

      {
        path: 'circleEarth',
        name: 'circleEarth',
        component: () => import('@/views/threeJs/circleEarth'),
        meta: { title: 'CircleEarth', icon: 'earth' }
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
        path: 'records',
        component: () => import('@/views/Toys/Records/index'),
        name: 'Records',
        meta: { title: 'Records', icon: 'el-icon-video-camera' }
      },
      {
        path: 'video',
        component: () => import('@/views/Toys/VideoPractice/index'),
        name: 'Video',
        meta: { title: 'Video', icon: 'el-icon-video-camera' }
      },
      {
        path: 'Chars',
        component: () => import('@/views/Toys/Chars/index'),
        name: 'Chars',
        meta: { title: 'Chars', icon: 'el-icon-video-camera' }
      },
      {
        path: 'test',
        component: () => import('@/views/Toys/Test/index'),
        name: 'Test',
        meta: { title: 'Test', icon: 'el-icon-video-camera' }
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
