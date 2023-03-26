<template>
  <div class="layout-container">
    <AppHeader />
    <MainNav />
    <AppFooter />
    <main class="app-main" ref="appMain" @scroll="handleScroll">
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
  methods: {
    handleScroll() {
      const appMain = this.$refs.appMain;
      const scrollTop = appMain.scrollTop;
      const opacity = 1 - scrollTop / 200;
      const header = document.querySelector('.header');

      header.style.backgroundColor = `rgba(28, 17, 56, ${1 - opacity})`;

      // this.$store.dispatch('setScrollTop', scrollTop);
    },
  },
  mounted() {
    const app = this.$refs.appMain;
    app.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    const app = this.$refs.appMain;
    app.removeEventListener('scroll', this.handleScroll);
  },
  components: {
    AppHeader,
    MainNav,
    AppFooter,
    UserMsg,
  },
};
</script>
