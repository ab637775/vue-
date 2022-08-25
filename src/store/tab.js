// import router from '@/router'
import Cookie from 'js-cookie'
export default {
  state: {
    isCollapse: false,
    tabsList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ],
    currentMenu: null,
    menu: []
  },
  mutations: {
    updateIsCollapse (state) {
      state.isCollapse = !state.isCollapse
    },
    selectMenu (state, value) {
      if (value.name !== 'home') {
        state.currentMenu = value
        const result = state.tabsList.findIndex(item => item.name === value.name)
        if (result === -1) {
          state.tabsList.push(value)
        }
      } else {
        state.currentMenu = null
      }
    },
    closeTag (state, value) {
      const result = state.tabsList.findIndex(item => item.path === value.path)
      state.tabsList.splice(result, 1)
    },
    setMenu (state, value) {
      state.menu = value
      Cookie.set('menu', JSON.stringify(value))
    },
    clearMenu (state) {
      state.menu = []
      Cookie.remove('menu')
    },
    addMenu (state, router) {
      if (!Cookie.get('menu')) {
        return
      }
      const menu = JSON.parse((Cookie.get('menu')))
      state.menu = menu
      const menuArray = []
      // 遍历menu数组，区分有无子组件
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            // 动态拼接子路由
            item.component = () => import(`../views/${item.url}`)
            return item
          })
          menuArray.push(...item.children)
        } else {
          // 动态拼接路由
          item.component = () => import(`../views/${item.url}`)
          menuArray.push(item)
        }
      })
      console.log('menuArray', menuArray)
      // 把生成的动态路由添加到routes里
      menuArray.forEach(item => {
        if (item.name != 'home') {
          router.addRoute('Main', item)
          // console.log(item)
        }
      })

      console.log('menu', state.menu)
    }
  }
}
