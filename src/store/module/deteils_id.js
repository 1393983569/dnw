export default {
  state: {
    setDeteilsId: '',
    setDeteilsApi: '',
    setDeteilsEditapi: '',
    visitAll: '',
    visitYes: '',
    visitNo: ''
  },
  mutations: {
    SET_DETEILS_Id (state, token) {
      state.setDeteilsId = token
    },
    SET_DETEILS_API (state, token) {
      state.setDeteilsApi = token
    },
    SET_DETEILS_EDITCASE (state, token) {
      state.setDeteilsEditapi = token
    },
    // 总访问顾客
    SET_VISIT_ALL (state, visitAll) {
      state.visitAll = visitAll
    },
    // 已完成访问的顾客
    SET_VISIT_YES (state, visitYes) {
      state.visitYes = visitYes
    },
    // 还没访问的顾客
    SET_VISIT_NO (state, visitNo) {
      state.visitNo = visitNo
    }
  }
}
