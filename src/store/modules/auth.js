import { db } from '../../services/firebase'
import router from '../../router/index'
var jwtDecode = require('jwt-decode')

const state = {
  user: {
    email: '',
    uid: '',
    username: '',
    createAt: '',
    groups: []
  },
  isLogged: false,
  token: ''
}

const getters = {
  getCurrentUser(state) {
    return state.user
  },
  isUserLogged(state) {
    return state.token !== ''
  }
}

const mutations = {
  SET_USER(state, data) {
    state.user = data
  },
  USER_AUTH(state, data) {
    state.isLogged = data
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
  CLEAR_TOKEN(state) {
    state.token = ''
  }
}

const actions = {
  initAuth({ commit, dispatch }) {
    let token = localStorage.getItem('token')
    if (token) {
      commit('SET_TOKEN', token)
      var decoded = jwtDecode(token)
      dispatch('getUserFromDb', decoded.user_id)

      dispatch('checkTokenExp', token)
      router.push('/')
    } else {
      router.push('/login').catch(() => {})
      return false
    }
  },
  async setUser({ commit }, payload) {
    db.app
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(async res => {
        console.log(res)
        let user = {
          email: res.user.email,
          uid: res.user.uid,
          username: payload.username,
          createAt: new Date().getTime(),
          groups: []
        }
        await db.app
          .firestore()
          .collection('users')
          .doc(res.user.uid)
          .set(user)
        commit('SET_USER', user)
      })
  },
  loginUser({ dispatch, commit }, payload) {
    db.app
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(res => {
        res.user
          .getIdToken()
          .then(token => {
            localStorage.setItem('token', token)
            var decoded = jwtDecode(token)
            console.log(decoded)
            var expTime = decoded.exp - decoded.auth_time
            console.log(expTime)
            dispatch('setTokenExp', expTime)

            let user = { email: res.user.email, uid: res.user.uid }
            commit('SET_TOKEN', token)
            dispatch('getUserFromDb', user.uid)
          })
          .then(() => {
            router.replace('/')
          })
      })
  },
  signOut({ commit }) {
    db.app.auth().signOut()
    commit('CLEAR_TOKEN')
    localStorage.removeItem('token')
    router.replace('/login')
  },
  async getUserFromDb({ commit }, payload) {
    var userDb = await db.app
      .firestore()
      .collection('users')
      .doc(payload)
      .get()

    console.log(userDb.data(), '33333333333')
    commit('SET_USER', userDb.data())
  },
  setTokenExp({ dispatch }, exp) {
    setTimeout(() => {
      dispatch('signOut')
    }, exp * 1000)
  },
  checkTokenExp({ dispatch, state }) {
    var decoded = jwtDecode(state.token)
    var currentDate = Math.round(new Date().getTime() / 1000)
    var expTime = decoded.exp
    console.log(currentDate - expTime)
    if (currentDate > expTime) {
      dispatch('signOut')
    }
  }
}

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions
}
