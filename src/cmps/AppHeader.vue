<template>
  <section class="header">
    <section class="header-right">
      <section class="header-buttons">
        <button title="Go Back" @click="goBack" class="header-nav-btn">
          <div class="icon" v-html="getSvg('arrowLeft')"></div>
        </button>
        <button title="Go Forward" @click="goForward" class="header-nav-btn">
          <div class="icon" v-html="getSvg('arrowRight')"></div>
        </button>
      </section>
      <section>
        <StationFilter v-if="isFilterShown.isFilterShown" @setFilter="setFilter" />
      </section>
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
  </section>
</template>

<script>
import { svgService } from '../services/svg.service.js';
import StationFilter from './StationFilter.vue';

export default {
  computed: {
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
      this.$router.go(-1)
    },
    goForward() {
      this.$router.go(+1)
    }
  },
  components: {
    StationFilter,
  },
};
</script>
