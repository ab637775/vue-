import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import getEl from './plugins'
import '@/request/api/mock.js'
import '@/assets/less/index.less'
import 'element-ui/lib/theme-chalk/index.css'

// 提交以后禁用按钮一段时间，防止重复提交
Vue.directive('noMoreClick', {
  inserted (el, binding) {
    el.addEventListener('click', e => {
      el.classList.add('is-disabled')
      el.disabled = true
      setTimeout(() => {
        el.disabled = false
        el.classList.remove('is-disabled')
      }, 2000)// 设置禁用时间为是2000毫秒，也就是2秒
    })
  }
})

Vue.config.productionTip = false
// 遍历安装获取所有element-ui插件
getEl()
router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.user.token
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})
new Vue({
  store,
  router,
  created () {
    store.commit('addMenu', router)
  },
  render: h => h(App)
}).$mount('#app')
