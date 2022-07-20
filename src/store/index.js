import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab.js'
import user from './user.js'
import page1 from './page1.js'
import home from './home.js'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    tab,
    user,
    page1,
    home
  }
})
