<template>
  <div id="login">
    <div class="row justify-content-center">
      <div class="col-3 card shadow">
        <div class="card-body">
          <h3>{{ Title }}</h3>
          <hr />
          <form>
            <div v-if="!isUser" class="form-group">
              <label for="username">{{usernameLabel}}</label>
              <input
                id="username"
                type="text"
                class="form-control"
                aria-describedby="emailHelp"
                :placeholder="usernamePlaceholder"
                v-model="user.username"
                required
              />
            </div>
            <div class="form-group">
              <label for="email">{{emailLabel}}</label>
              <input
                id="email"
                type="email"
                class="form-control"
                aria-describedby="emailHelp"
                :placeholder="emailPlaceholder"
                v-model="user.email"
                required
              />
            </div>
            <div class="form-group">
              <label for="password">{{passwordLabel}}</label>
              <input
                id="password"
                type="password"
                class="form-control"
                :placeholder="passwordPlaceholder"
                v-model="user.password"
                required
              />
            </div>
            <div class="row justify-content-">
              <Button
                v-if="isUser"
                :disabled="checkForm"
                @click.prevent="loginUser"
                :label="loginButton"
                class="ml-3 p-button-sm"
              />

              <Button
                v-else
                :disabled="checkForm"
                @click.prevent="saveUser"
                :label="signUpButton"
                class="ml-3 p-button-sm"
              />

              <a
                class="ml-2 mt-2"
                @click.prevent="changeType"
                href
                v-text="isUser ? loginP : signUpP"
              ></a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from 'primevue/button'
export default {
  name: 'Login',
  data() {
    return {
      titleSignUp: this.$t('text.signUpTitle'),
      titleLogin: this.$t('text.loginTitle'),
      usernameLabel: this.$t('text.username'),
      emailLabel: this.$t('text.email'),
      passwordLabel: this.$t('text.password'),
      usernamePlaceholder: this.$t('text.usernamePlaceholder'),
      emailPlaceholder: this.$t('text.emailPlaceholder'),
      passwordPlaceholder: this.$t('text.passwordPlaceholder'),
      loginButton: this.$t('button.login'),
      signUpButton: this.$t('button.signUp'),
      loginP: this.$t('text.loginParag'),
      signUpP: this.$t('text.signUpParag'),
      user: {
        username: '',
        email: '',
        password: ''
      },
      isUser: true
    }
  },

  methods: {
    saveUser() {
      this.$store.dispatch('setUser', this.user)
    },
    loginUser() {
      console.log(this.user)
      this.$store.dispatch('loginUser', this.user)
    },
    changeType() {
      this.isUser = !this.isUser
    }
  },
  computed: {
    Title() {
      return this.isUser ? this.titleLogin : this.titleSignUp
    },
    checkForm() {
      if (this.isUser) {
        if (this.user.email.length > 0 && this.user.password.length > 0) {
          return false
        } else {
          return true
        }
      } else {
        if (
          this.user.email.length > 0 &&
          this.user.password.length > 0 &&
          this.user.username.length > 0
        ) {
          return false
        } else {
          return true
        }
      }
    }
  },
  components: {
    Button
  }
}
</script>

  <style scoped>
#login {
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>