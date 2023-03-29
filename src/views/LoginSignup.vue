<template>
  <section class="login-signup">
    <section class="login-signup-logo">
      <span>Spotify</span>
    </section>
    <div class="login-signup-wrapper">
      <p>To continue, connect to Spotify.</p>
      <section class="login-out-src">
        <div class="login-out-src-btn facebook">
          <div>
            <span>CONTINUE WITH FACEBOOK
            </span>
            <div class="facebook-icon" v-html="getSvg('facebook')"></div>
          </div>
        </div>
        <div class="login-out-src-btn google">
          <div>
            <span>CONTINUE WITH GOOGLE</span>
            <span class="google-icon-img"></span>
          </div>
        </div>
        <div class="or">
          <hr />
          <span>OR</span>
          <hr />
        </div>
      </section>
      <!-- <div v-if="loggedinUser">
      <h3>
        Loggedin User:
        {{ loggedinUser.fullname }}
        <button @click="doLogout">Logout</button>
      </h3>
    </div> -->
      <section>
        <form @submit.prevent="doLogin">
          <label for="username"></label>
          <div class="input-wrapper">
            <input v-model="loginCred.username" placeholder="username" type="text" name="username" />
          </div>
          <label for="password"></label>
          <div class="input-wrapper">
            <div class="eye-icon" v-html="getSvg('eye')"></div>
            <input placeholder="password" type="password" name="password" v-model="loginCred.password" />
          </div>
          <option value="">Select User</option>
          <option v-for="user in users" :key="user._id" :value="user.username">{{ user.fullname }}</option>
          <input type="text" v-model="loginCred.username" placeholder="User name" />
          <input type="text" v-model="loginCred.password" placeholder="Password" />
          <button>Connection</button>

        </form>
        <!-- <form @submit.prevent="doSignup">
        <h2>Signup</h2>
        <input type="text" v-model="signupCred.fullname" placeholder="Your full name" />
        <input type="text" v-model="signupCred.username" placeholder="Username" />
        <input type="password" v-model="signupCred.password" placeholder="Password" />
        <ImgUploader @uploaded="onUploaded" />
        <button>Signup</button>
      </form> -->
        <h2>Don't have an account?</h2>
      </section>
      <!-- <details>
      <summary>
        Admin Section
      </summary>
      <ul>
        <li v-for="user in users" :key="user._id">
          <pre>{{ user }}</pre>
          <button @click="removeUser(user._id)">x</button>
        </li>
      </ul>
    </details> -->
    </div>
  </section>
</template>
<script>

import ImgUploader from '../cmps/ImgUploader.vue'
import { svgService } from '../services/svg.service.js'
export default {
  name: 'login-signup',
  data() {
    return {
      msg: '',
      loginCred: { username: 'user1', password: '123' },
      signupCred: { username: '', password: '', fullname: '', imgUrl: '' },
    }
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },
  created() {
    this.loadUsers()
  },
  methods: {
    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = 'Oops! Something went wrong, check Username or Password.'
        return
      }
      try {
        await this.$store.dispatch({ type: "login", userCred: this.loginCred })
        this.$router.push('/')
      } catch (err) {
        console.log(err)
        this.msg = 'Failed to login'
      }
    },
    doLogout() {
      this.$store.dispatch({ type: 'logout' })
    },
    async doSignup() {
      if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.username) {
        this.msg = 'Please fill up the form'
        return
      }
      await this.$store.dispatch({ type: 'signup', userCred: this.signupCred })
      this.$router.push('/')

    },
    loadUsers() {
      this.$store.dispatch({ type: "loadUsers" })
    },
    async removeUser(userId) {
      try {
        await this.$store.dispatch({ type: "removeUser", userId })
        this.msg = 'User removed'
      } catch (err) {
        this.msg = 'Failed to remove user'
      }
    },
    onUploaded(imgUrl) {
      this.signupCred.imgUrl = imgUrl
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    }

  },
  components: {
    ImgUploader
  }
}
</script>