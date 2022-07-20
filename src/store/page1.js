import Cookie from 'js-cookie'
export default {
  state: {
    temp: [],
    record: []
  },
  mutations: {
    updateTemp (state, value) {
      state.temp = value
    },
    setRecord (state, value) {
      state.record = value
    },
    getRecord (state) {
      // state.record = JSON.parse(Cookie.get('learningRecord'))
    }
  //   clearToken (state) {
  //     state.token = ''
  //     Cookie.remove('token')
  //   },
  //   getToken (state) {
  //     state.token = state.token || Cookie.get('token')
  //   }
  }
}
