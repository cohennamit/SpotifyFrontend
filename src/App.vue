<template>
  <div class="layout-container">
    <AppHeader />
    <MainNav />
    <AppFooter />
    <main class="app-main">
      <RouterView />
      <UserMsg />
    </main>
  </div>
</template>

<script>
import { userService } from './services/user.service';
import { store } from './store/store';

import AppHeader from './cmps/AppHeader.vue';
import MainNav from './cmps/MainNav.vue';
import AppFooter from './cmps/AppFooter.vue';
import UserMsg from './cmps/UserMsg.vue';

export default {
  created() {
    const user = userService.getLoggedinUser();
    if (user) store.commit({ type: 'setLoggedinUser', user });
    this.$store.dispatch({ type: 'loadStations' });
  },
  components: {
    AppHeader,
    MainNav,
    AppFooter,
    UserMsg,
  },
};
</script>
