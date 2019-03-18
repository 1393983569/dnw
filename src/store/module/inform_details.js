export default {
  state: {
    setInformId: '',
    setInformApi: ''
  },
  mutations: {
    SET_INFORM_Id (state, token) {
      state.setInformId = token
    },
    SET_INFORM_API (state, token) {
      state.setInformApi = token
    }
  }
}
