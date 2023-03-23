<template>
  <section>
    <main class="app-main">
      <MainNav />
      <AppHeader />
      <RouterView />
      <AppFooter />
      <UserMsg />
    </main>
  </section>
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
    console.log('Vue App created');
    const user = userService.getLoggedinUser();
    if (user) store.commit({ type: 'setLoggedinUser', user });
  },
  components: {
    AppHeader,
    MainNav,
    AppFooter,
    UserMsg,
  },
};
</script>
