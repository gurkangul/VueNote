<template>
  <div>
    <Toast />

    <div class="loading" :style="$store.state.isLoading">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
    <app-header></app-header>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import { db } from './services/firebase'
import Header from './components/layouts/Header'
import Toast from 'primevue/toast'

export default {
  data() {
    return {}
  },
  computed: {
    isLoading() {
      console.log(this.$store.state)
      return this.$store.state.isLoading
    }
  },
  components: {
    appHeader: Header,
    Toast
  },
  created() {
    // var user = JSON.parse(localStorage.getItem('user'))
    this.$store.state.isLoading.display = 'block'
    this.$store.dispatch('initAuth')

    this.$store.state.isLoading.display = 'none'
  }
}
</script>

  <style>
body {
  margin: 0;
}
</style>
