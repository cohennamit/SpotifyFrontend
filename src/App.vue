<template>
  <div class="layout-container">
    <MainNav />
    <AppFooter />
    <div class="app-main" ref="appMain" @scroll="handleScroll">
      <AppHeader />
      <RouterView />
      <UserMsg />
    </div>
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
  computed: {
    headerColor() {
      return this.$store.getters.headerColor;
    },
  },
  methods: {
    handleScroll() {
      const appMain = this.$refs.appMain;
      const scrollTop = appMain.scrollTop;
      const opacity = 1 - scrollTop / 200;

      this.$store.dispatch('setCurrColor', `rgba(0, 0, 0, ${1 - opacity})`);
      this.$store.dispatch('setScrollTop', scrollTop);
      // appMain.style.backgroundImage = `linear-gradient(0deg, #121212 88%, ${this.headerColor})`;
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
