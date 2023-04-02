<template>
  <header :style="{ backgroundColor: headerColor }" ref="header" class="header">
    <section class="header-buttons">
      <button title="Go Back" @click="goBack" class="header-btn header-nav-btn">
        <div class="icon" v-html="getSvg('arrowLeft')"></div>
      </button>
      <button title="Go Forward" @click="goForward" class="header-btn header-nav-btn">
        <div class="header-btn icon" v-html="getSvg('arrowRight')"></div>
      </button>
    </section>
    <SongSearch class="header-search" @setSearch="setSearch" v-if="isSearch" />
    <div v-else class="header-search-placeholder"></div>
    <!-- <SongSearchList class="station-details-search" @setFilter="setFilter" /> -->
    <section class="loggedin-user" v-if="loggedInUser">
      <div class="user-icon-container">
        <div class="user-icon" v-html="getSvg('user')"></div>
      </div>
      <RouterLink :to="`/user/${loggedInUser._id}`">
        {{ loggedInUser.username }}
      </RouterLink>
      
      <div class="arrow-down-icon-container">
        <div  @click="openUserOptions" class="arrow-down-icon" v-html="getSvg('arrowDownFill')"></div>
      </div>
      <ul v-if="isUserOptionsShown" class="user-options-menu">
        <li @click="doLogout">Logout</li>
      </ul>
    </section>

    <section v-else class="loginSignup">
      <div class="signup-btn">
        <RouterLink class="signup-span" to="/signup">Sign up</RouterLink>
      </div>
      <div class="login-btn">
        <RouterLink class="login-span" to="/login">Log in</RouterLink>
      </div>
    </section>
  </header>
</template>

<script>
import { svgService } from '../services/svg.service.js';
import SongSearchList from './SongSearchList.vue';
import SongSearch from './SongSearch.vue';
export default {
  methods: {
    openUserOptions(event){
      console.log('hey');
      event.stopPropagation()
      this.$store.commit({type:'handleUserOptions'})
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    setFilter(filterBy) {
      this.$store.dispatch({ type: 'loadToys', filterBy });
    },
    goBack() {
      if (Object.keys(this.$route.query).length > 0 && this.$route.path === '/search') {
        this.$router.replace('/search');
      } else this.$router.go(-1);
    },
    goForward() {
      this.$router.go(+1);
    },
    setSearch(query) {
      if (this.isSearch) {
        // const url = new URL(window.location)
        // url.searchParams.set('query',query)
        this.$router.replace({ name: 'Search', query: { query } });
      }
    },
    doLogout() {
      this.$store.dispatch({ type: 'logout' })
      this.$router.push('/')
    },
  },
  computed: {
    isUserOptionsShown() {
      return this.$store.getters.isUserOptionsShown
    },
    headerColor() {
      const opacity = 1 - this.$store.getters.opacity;
      return this.$store.getters.currColor.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
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

  components: {
    SongSearchList,
    SongSearch,
  },
};
</script>
