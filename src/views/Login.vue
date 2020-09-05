<template>
  <div id="login">
    <div class="row justify-content-center">
      <div class="col-3 card shadow">
        <div class="card-body">
          <h3>{{ Title }}</h3>
          <hr />
          <form>
            <div v-if="!isUser" class="form-group">
              <label for="exampleInputEmail1">Username</label>
              <input
                type="text"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Username"
                v-model="user.username"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                v-model="user.email"
              />
              <small class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                v-model="user.password"
              />
            </div>
            <div class="row justify-content-">
              <Button
                v-if="isUser"
                :disabled="checkForm"
                @click.prevent="loginUser"
                label="Giriş Yap"
                class="ml-3 p-button-sm"
              />

              <Button
                v-else
                :disabled="checkForm"
                @click.prevent="saveUser"
                label="Kayıt Ol"
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
      titleSignUp: 'Üye Kayıt',
      titleLogin: 'Üye Girişi',
      loginP: 'kayıt olmak için tıklayınız.',
      signUpP: 'Zaten üyeliğim var.',
      user: {
        username: '',
        email: 'gurkan@gmail.com',
        password: '123456'
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
      if (this.user.email.length > 0 && this.user.password.length > 0) {
        return false
      } else if (
        this.user.email.length > 0 &&
        this.user.password.length > 0 &&
        this.user.username.length > 0
      ) {
        return false
      } else {
        return true
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
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>