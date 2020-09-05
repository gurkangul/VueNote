import { db } from '../../services/firebase'
import store from '../index'
import { v4 as uuidv4 } from 'uuid'
var jwtDecode = require('jwt-decode')
var short = require('short-uuid')

const state = {
  note: {
    id: '',
    noteName: '',
    content: '',
    createAt: '',
    author: '',
    authorEmail: '',
    isSpecial: true,
    groupId: ''
  },
  noteList: [],
  noteListFake: []
}

const getters = {
  getAllNotes(state) {
    return state.noteListFake
  },
  getAllNotesOrj(state) {
    return state.noteList
  }
}

const mutations = {
  SET_NOTE(state, data) {
    state.note = data
  },
  GET_NOTES(state, data) {
    console.log(state)
    state.noteList = data
  },
  GET_NOTES_FAKE(state, data) {
    console.log(state)
    state.noteListFake = data
  }
}

const actions = {
  async removeNote({ state, commit, dispatch }, payload) {
    var updateState = state.noteList.filter(val => val.id != payload.id)
    console.log(state, payload, updateState)

    commit('GET_NOTES', updateState)
    dispatch('getUserNotes')
    dispatch('getUserNotes')

    return await db.app
      .firestore()
      .collection('notes')
      .doc(payload.id)
      .delete()
  },
  async saveNote({ commit, state }, payload) {
    console.log(store, store.getters.getCurrentUser.uid)
    var grpId = short.generate()
    var noteRes = {
      id: uuidv4(),
      noteName: payload.noteName,
      content: payload.content,
      authorEmail: store.getters.getCurrentUser.email,
      createAt: new Date().getTime(),
      author: store.getters.getCurrentUser.uid,
      isSpecial: true,
      groupId: grpId
    }
    commit('SET_NOTE', noteRes)
    console.log(state)
    return await db.app
      .firestore()
      .collection('notes')
      .doc(state.note.id)
      .set(noteRes)
  },
  async getNotes({ commit, dispatch }) {
    let token = localStorage.getItem('token')
    var decoded = jwtDecode(token)
    console.log(decoded.user_id)
    return await db.app
      .firestore()
      .collection('notes')
      .get()
      .then(querySnapshot => {
        const documents = querySnapshot.docs.map(doc => doc.data())
        console.log(documents)
        commit('GET_NOTES', documents)
        dispatch('getUserNotes')
      })
  },
  async shareNote({ state }, payload) {
    console.log(store.getters.getCurrentUser.uid, state, payload)

    await db.app
      .firestore()
      .collection('users')
      .where('email', '==', payload.shareInput)
      .get()
      .then(querySnapshot => {
        const documents = querySnapshot.docs.map(doc => doc.data())
        console.log(documents)
        if (documents[0].groups.indexOf(payload.groupId) < 0) {
          db.app
            .firestore()
            .collection('users')
            .doc(documents[0].uid)
            .update({
              groups: [payload.groupId, ...documents[0].groups]
            })
        }
      })
  },
  getGroupNotes({ state, commit }) {
    console.log(store.getters.getCurrentUser, state)

    var grps = store.getters.getCurrentUser.groups
    var grpNote = state.noteList
      .map(val => {
        if (grps.indexOf(val.groupId) > -1) {
          return val
        }
      })
      .filter(item => item != undefined)
    console.log(grpNote)
    commit('GET_NOTES_FAKE', grpNote)
  },
  getUserNotes({ state, commit }) {
    var uid = store.getters.getCurrentUser.uid
    var userNote = state.noteList
      .map(val => {
        if (uid == val.author) {
          return val
        }
      })
      .filter(item => item != undefined)
    console.log(userNote)
    commit('GET_NOTES_FAKE', userNote)
  }
}

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions
}
