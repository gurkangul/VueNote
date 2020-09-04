import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import locale from './modules/locale'
import note from './modules/note'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: { display: 'none' }
  },
  getters,
  mutations,
  actions,
  modules: { auth, locale, note }
})
