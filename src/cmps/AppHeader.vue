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
      <SongSearch class="header-search"  @setSearch="setSearch" v-if="isSearch"  />
      <!-- <SongSearchList class="station-details-search" @setFilter="setFilter" /> -->
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
import SongSearchList from './SongSearchList.vue';
import SongSearch from './SongSearch.vue';
export default {
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    setFilter(filterBy) {
      this.$store.dispatch({ type: 'loadToys', filterBy });
    },
    goBack() {
      if(Object.keys(this.$route.query).length > 0 && this.$route.path ==='/search'){
        this.$router.replace('/search')
      }
      else this.$router.go(-1);
    },
    goForward() {
      this.$router.go(+1);
    },
    setSearch(query){
      if(this.isSearch){
        // const url = new URL(window.location)
        // url.searchParams.set('query',query)
        this.$router.replace({name:'Search',query:{query}})
      }
    }
  },
  computed: {
    headerColor() {
      // const color = `rgba(${this.$store.getters.headerColor})`
      return this.$store.getters.currColor;
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
    SongSearch
  },
};
</script>
