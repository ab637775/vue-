import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Cookie from 'js-cookie'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/MainContent.vue'),
    // redirect: { name: 'home' },
    redirect: 'home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/home/Home')
      }
      // {
      //   path: '/user',
      //   name: 'user',
      //   component: () => import('../views/user/User')
      // },
      // {
      //   path: '/mall',
      //   name: 'mall',
      //   component: () => import('../views/mall/Mall')
      // },
      // {
      //   path: '/page1',
      //   name: 'pageone',
      //   component: () => import('../views/other/PageOne')
      // },
      // {
      //   path: '/page2',
      //   name: 'pagetwo',
      //   component: () => import('../views/other/PageTwo')
      // }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login')
  }

]
// 通过读取cookie中从mock后端传来的menu数据，来重塑route路由，使得进行页面跳转时不会发生页面丢失

// console.log('routes', routes)
// const newMenu = []
// const menu = JSON.parse((Cookie.get('menu')))
// // console.log('routemenu', menu)
// // console.log('menu0', menu[1].path)
// // console.log('find', menu[3].children)
// const noChildren = menu.filter(value => !value.children)
// const hasChildren = menu.filter(value => value.children)
// // console.log('no', noChildren)
// // console.log('has', hasChildren)
// const { children: kids } = hasChildren[0]
// console.log('kids', kids)
// for (let i = 1; i < noChildren.length; i++) {
//   const temp = {
//     path: noChildren[i].path,
//     name: noChildren[i].name,
//     component: () => import(`../views/${noChildren[i].url}`)
//   }
//   newMenu.push(temp)
// }
// for (let i = 0; i < kids.length; i++) {
//   const temp = {
//     path: kids[i].path,
//     name: kids[i].name,
//     component: () => import(`../views/${kids[i].url}`)
//   }
//   newMenu.push(temp)
// }
// console.log('newMenu', newMenu)
// routes[0].children.push(...newMenu)
// console.log('routechildren', routes[0].children)

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
