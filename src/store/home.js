export default {
  state: {
    username: '',
    imgSrc: ''
  },
  mutations: {
    updateUsername (state, value) {
      state.username = value
    },
    updateImgSrc (state, value) {
      state.imgSrc = value
    }
  }
}
