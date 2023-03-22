<template>
  <section>
    <AppHeader />
    <AppHeader2 />
    <MainNav />
    <RouterView />
    <AppFooter />
    <UserMsg />
  </section>
</template>

<script>


import { userService } from './services/user.service'
import { store } from './store/store'

import AppHeader from './cmps/AppHeader.vue'
import AppHeader2 from './cmps/AppHeader2.vue'
import MainNav from './cmps/MainNav.vue'
import AppFooter from './cmps/AppFooter.vue'
import UserMsg from './cmps/UserMsg.vue'


export default {

  created() {
    console.log('Vue App created')
    const user = userService.getLoggedinUser()
    if (user) store.commit({ type: 'setLoggedinUser', user })
  },
  components: {
    AppHeader,
    AppHeader2,
    MainNav,
    AppFooter,
    UserMsg
  },
}
</script>