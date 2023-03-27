<template>
  <div class="header-content-fixed-container">
    <div class="header-content-placeholder-container">
      <header ref="header" class="header">
        <section class="header-buttons">
          <button title="Go Back" @click="goBack" class="header-btn header-nav-btn">
            <div class="icon" v-html="getSvg('arrowLeft')"></div>
          </button>
          <button title="Go Forward" @click="goForward" class="header-btn header-nav-btn">
            <div class="header-btn icon" v-html="getSvg('arrowRight')"></div>
          </button>
        </section>
        <section>
          <StationFilter v-if="isFilterShown.isFilterShown" @setFilter="setFilter" />
        </section>
        <section class="loggedin-user" v-if="loggedInUser">
          <img :src="loggedInUser.imgUrl" />
          <RouterLink :to="`/user/${loggedInUser._id}`">
            {{ loggedInUser.username }}
          </RouterLink>
        </section>
        <section v-else>
          <section class="login-btn">
            <RouterLink to="/login">Login</RouterLink>
          </section>
        </section>
      </header>
    </div>
  </div>
</template>

<script>
import { svgService } from '../services/svg.service.js';
import StationFilter from './StationFilter.vue';

export default {
  computed: {
    // scrollTop() {
    //   return this.$store.state.scrollTop;
    // },
    // opacity() {
    //   return this.scrollTop / 100;
    // },
    // backgroundColor() {
    //   return 'white';
    // },
    isFilterShown() {
      return this.$store.getters.isFilterShown;
    },
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  methods: {
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
