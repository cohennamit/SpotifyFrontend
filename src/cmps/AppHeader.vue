<template>
  <header :style="{ backgroundColor: headerColor, opacity: headerOpacity }" ref="header" class="header">
    <section class="header-buttons">
      <button title="Go Back" @click="goBack" class="header-btn header-nav-btn">
        <div class="icon" v-html="getSvg('arrowLeft')"></div>
      </button>
      <button title="Go Forward" @click="goForward" class="header-btn header-nav-btn">
        <div class="header-btn icon" v-html="getSvg('arrowRight')"></div>
      </button>
    </section>
    <section>
      <StationFilter v-if="isSearch" @setFilter="setFilter" />
    </section>
    <section class="loggedin-user" v-if="loggedInUser">
      <img :src="loggedInUser.imgUrl" />
      <RouterLink :to="`/user/${loggedInUser._id}`">
        {{ loggedInUser.username }}
      </RouterLink>
    </section>
    <section v-else>
      <section class="login-btn">
        <RouterLink class="login-span" to="/login">Login</RouterLink>
      </section>
    </section>
  </header>
</template>

<script>
import { svgService } from '../services/svg.service.js';
import StationFilter from './StationFilter.vue';

export default {
  computed: {
    headerColor() {
      return this.$store.getters.currColor;
    },
    headerOpacity() {
      return 1 - this.$store.getters.opacity;
    },
    isFilterShown() {
      return this.$store.getters.isFilterShown;
    },
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
    isSearch() {
      if (this.$route.name === 'Search') return true;
      else return false;
    },
  },

  methods: {
    // updateHeaderBackground(color, opacity) {
    //   const header = this.$refs.header;
    //   const headerBefore = window.getComputedStyle(header, '::before');
    //   headerBefore.backgroundColor = color;
    //   headerBefore.opacity = opacity;
    // },
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    setFilter(filterBy) {
      this.$store.dispatch({ type: 'loadToys', filterBy });
    },
    goBack() {
      this.$router.go(-1);
    },
    goForward() {
      this.$router.go(+1);
    },
  },
  components: {
    StationFilter,
  },
};
</script>
