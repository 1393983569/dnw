import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import deteilsId from './module/deteils_id'
import informDetails from './module/inform_details'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    deteilsId,
    informDetails
  }
})
