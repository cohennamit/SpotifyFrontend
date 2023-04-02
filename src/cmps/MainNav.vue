<template>
  <section class="main-nav">
    <RouterLink to="/" class="main-nav-logo">
      <div class="headphones-icon" v-html="getSvg('headphones')"></div>
      <h1>Satisfy</h1>
    </RouterLink>
    <section class="nav">
      <RouterLink
        class="btn-nav"
        @click="$store.commit({ type: 'toggleFilterShown', isFilterShown: false })"
        to="/station"
      >
        <div class="icon" v-html="isHome ? getSvg('homeFull') : getSvg('home')"></div>
        <span> Home </span>
      </RouterLink>
      <RouterLink
        class="btn-nav"
        @click="$store.commit({ type: 'toggleFilterShown', isFilterShown: true })"
        to="/search"
      >
        <div class="icon nav-search" v-html="isSearch ? getSvg('search') : getSvg('emptySearch')"></div>
        <span> Search </span>
      </RouterLink>
      <RouterLink class="btn-nav" to="/library">
        <div class="icon" v-html="isLibrary ? getSvg('libraryFull') : getSvg('library')"></div>
        <span> Your Library </span>
      </RouterLink>
    </section>
    <section class="actions">
      <button @click="onCreateStation" class="create-playlist-btn">
        <div class="btn-create">
          <div class="icon create-icon" v-html="getSvg('createPlaylist')"></div>
        </div>
        <span> Create Playlist </span>
      </button>
      <RouterLink
        @mouseover="this.$store.dispatch('setCurrColor', 'rgb(28, 11, 59)')"
        class="liked-songs-btn"
        to="/liked"
      >
        <div class="btn-liked">
          <div class="icon" v-html="getSvg('likedSongsHeart')"></div>
        </div>
        <span> Liked Songs </span>
      </RouterLink>
    </section>
    <hr />
    <section class="user-playlists">
      <ul class="playlist-links">
        <RouterLink
          class="user-station"
          v-for="userStation in userStations"
          :to="'/station/' + userStation._id"
        >
          {{ userStation.title }}
        </RouterLink>
      </ul>
    </section>
    <!-- <button class="install-btn">
            <div class="icon" v-html="getSvg('install')"></div> Install App
        </button> -->
  </section>
</template>

<script>
import { svgService } from '../services/svg.service.js';
import { stationService } from '../services/station.service.js';
export default {
  name: '',
  data() {
    return {
      currentRoute: '',
      userStations: null,
    };
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    async onCreateStation() {
      try {
        const newStation = stationService.getEmptyStation();
        const addedStation = await this.$store.dispatch({ type: 'addStation', newStation });
        this.setUserStations();
        this.$router.push(`/station/${addedStation._id}`);
      } catch (err) {
        console.log(err, 'Can not add station');
      }
    },
    async setUserStations() {
      const user = this.$store.getters.loggedinUser;
      try {
        this.userStations = await stationService.getUserStations(user._id);
      } catch (err) {
        console.log('Failed to get loggedinUser stations');
      }
    },
  },
  computed: {
    isHome() {
      if (this.$route.name === 'StationIndex') return true;
      else return false;
    },
    isSearch() {
      if (this.$route.name === 'Search') return true;
      else return false;
    },
    isLibrary() {
      if (this.$route.name === 'Library') return true;
      else return false;
    },
  },
  async created() {
    this.setUserStations();
  },
  watch: {
    $route: {
      handler() {
        const { name } = this.$route;
        this.currentRoute = name;
        // stationService.getById(stationId).then((station) => (this.station = station));
      },
      immediate: true,
    },
  },
  components: {},
};
</script>

<style></style>
