<template>
  <section class="login-signup">
    <section class="login-signup-logo">
      <span>{{isLogin ? 'Login':'Sign up'}}</span>
    </section>
    <div class="login-signup-wrapper">
      <p>To continue, {{isLogin?'continue':'sign up'}} to Spotify.</p>
      <section class="login-out-src">
        <div class="login-out-src-btn facebook">
          <div>
            <span>{{isLogin?'CONTINUE':'SIGN UP'}} WITH FACEBOOK
            </span>
            <div class="facebook-icon" v-html="getSvg('facebook')"></div>
          </div>
        </div>
        <div class="login-out-src-btn google">
          <div>
            <span>{{isLogin?'CONTINUE':'SIGN UP'}} WITH GOOGLE</span>
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
    <section v-if="isLogin" class="login-form">
      <form @submit.prevent="doLogin">
        <p :class="isInvalid?'invalid' : ''">Username</p>
        <div :class="isInvalid?'invalid' : ''" class="input-wrapper">
          <input placeholder="username" type="text" name="username" v-model="loginCred.username" />
        </div>
        <p>Password</p>
        <div :class="isInvalid?'invalid' : ''" class="input-wrapper password">
          <input placeholder="password" :type="isPassShown?'text':'password'" name="password" v-model="loginCred.password" />
          <div @click="handleEye" v-if="!isPassShown" :class="isEyeClicked ? 'clicked':''" class="eye-icon" v-html="getSvg('eyeCross')"></div>
          <div @click="handleEye" v-else :class="isEyeClicked ? 'clicked':''" class="eye-icon" v-html="getSvg('eye')"></div>
        </div> 
        <button style="color:black">CONNECTION</button>
      </form>
      <hr/>
      <RouterLink class="route-to-signup" to="/signup">Don't have an account?</RouterLink>
    </section>

    <section v-if="!isLogin" class="login-form">
      <form @submit.prevent="doSignup">
        <p :class="isInvalid?'invalid' : ''">Fullname</p>
        <div :class="isInvalid?'invalid' : ''" class="input-wrapper">
          <input placeholder="fullname" type="text" name="fullname" v-model="signupCred.fullname" />
        </div>
        <p :class="isInvalid?'invalid' : ''">Username</p>
        <div :class="isInvalid?'invalid' : ''" class="input-wrapper">
          <input placeholder="username" type="text" name="username" v-model="signupCred.username" />
        </div>
        <p>Password</p>
        <div :class="isInvalid?'invalid' : ''" class="input-wrapper password">
          <input placeholder="password" :type="isPassShown?'text':'password'" name="password" v-model="signupCred.password" />
          <div @click="handleEye" v-if="!isPassShown" :class="isEyeClicked ? 'clicked':''" class="eye-icon" v-html="getSvg('eyeCross')"></div>
          <div @click="handleEye" v-else :class="isEyeClicked ? 'clicked':''" class="eye-icon" v-html="getSvg('eye')"></div>
        </div> 
        <!-- <option value="">Select User</option>
          <option v-for="user in users" :key="user._id" :value="user.username">{{ user.fullname }}</option> -->
          
          <!-- <input type="text" v-model="loginCred.username" placeholder="User name" />
            <input
            type="text"
            v-model="loginCred.password"
            placeholder="Password"
            /> -->
        <button style="color:black">Sign up</button>
        
      </form>
      <hr/>
    </section>
    <!-- <form @submit.prevent="doSignup">
      <h2>Signup</h2>
      <input type="text" v-model="signupCred.fullname" placeholder="Your full name" />
      <input type="text" v-model="signupCred.username" placeholder="Username" />
      <input type="password" v-model="signupCred.password" placeholder="Password" />
      <ImgUploader @uploaded="onUploaded" />
      <button style="color:black">Signup</button>
    </form> -->
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
      isPassShown: false,
      isEyeClicked: false,
      isInvalid: false,
      isLogin:false
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
    handleEye(){
      this.isPassShown=!this.isPassShown
      this.isEyeClicked = true
    },
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
        this.isInvalid = true
      }
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
  watch: {
    '$route': {
      handler() {
        const { path } = this.$route;
        this.isLogin = (path === '/login') ? true : false
      },
      immediate: true,
    },
  },
  components: {
    ImgUploader
  }
}
</script>