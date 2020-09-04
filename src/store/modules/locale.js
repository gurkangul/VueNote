import i18n from '../../services/i18n/i18n'

export default {
  namespaced: true,
  state: {
    lang: 'tr',
    locales: ['tr', 'en']
  },
  getters: {
    lang: state => state.lang
  },
  mutations: {
    SET_LANG(state, data) {
      state.lang = data
      i18n.locale = data
      localStorage.setItem('lang', data)
    }
  },
  actions: {
    setLang({ commit }, lang) {
      commit('SET_LANG', lang)
    }
  }
}
