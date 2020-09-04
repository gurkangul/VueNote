import Vue from 'vue'

export const login = data => {
  let { email, password } = data
  return Vue.$api.get('/login', { email, password })
}
