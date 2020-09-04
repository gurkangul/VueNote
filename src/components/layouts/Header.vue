<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark"
    style="background-color: #563F7A"
  >
    <router-link to="/" tag="a" class="navbar-brand">{{ home }}</router-link>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <router-link
          active-class="active"
          to="/create"
          tag="li"
          class="nav-item"
        >
          <a class="nav-link">{{ noteOperation }}</a>
        </router-link>
      </ul>
    </div>
    <a @click.prevent="signOut" href class="navbar-brand">{{ logOut }}</a>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      logOut: this.$t('nav.logOut'),
      noteOperation: this.$t('nav.noteOperation'),
      home: this.$t('nav.home')
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOut')
    }
  }
}
</script>
