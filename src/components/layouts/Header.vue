<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #563F7A">
    <router-link to="/" tag="a" class="navbar-brand">{{ home }}</router-link>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <router-link active-class="active" to="/create" tag="li" class="nav-item">
          <a class="nav-link">{{ noteOperation }}</a>
        </router-link>
      </ul>
    </div>
    <div v-if="isUserLogged">
      <Dropdown
        @change="changeLanguage"
        v-model="selectedLang"
        :options="languages"
        optionLabel="name"
        :placeholder="selectedLang.name"
        class="mr-2"
      />
      <a @click.prevent="signOut" href class="navbar-brand">{{ logOut }}</a>
    </div>
  </nav>
</template>
<script>
import Dropdown from 'primevue/dropdown'
export default {
  data() {
    return {
      selectedLang: { name: 'Turkish', code: 'tr-TR' },
      languages: [
        { name: 'Turkish', code: 'tr-TR' },
        { name: 'English', code: 'en-US' }
      ],
      logOut: this.$t('nav.logOut'),
      noteOperation: this.$t('nav.noteOperation'),
      home: this.$t('nav.home'),
      isLogged: false
    }
  },
  created() {
    var lang = localStorage.getItem('lang')
    console.log(lang)
    lang = lang ?? window.navigator.language

    this.selectedLang = this.languages.filter(val => val.code == lang)[0]
  },
  computed: {
    isUserLogged() {
      return this.$store.getters.isUserLogged
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOut')
    },
    changeLanguage() {
      this.$store.dispatch('changeUserLang', this.selectedLang)
      location.reload()
    }
  },
  components: {
    Dropdown
  }
}
</script>
