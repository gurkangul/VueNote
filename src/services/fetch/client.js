import Vue from 'vue'
import axios from 'axios'
// import store from '../store'

const createAxiosInstance = baseURL =>
  axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    }
  })
console.log(process.env.VUE_APP_API_BASE)
const api = createAxiosInstance(process.env.VUE_APP_API_BASE)

api.interceptors.request.use(config => config)

api.interceptors.response.use(
  response => response,
  error => error
)

export default {
  install() {
    Vue.prototype.$api = api
    Vue['$api'] = api
  }
}
