<template>
  <section class="main-nav">
    <h1 class="logo">Logo</h1>
    <section class="nav">
      <div class="icon" v-html="getSvg('home')"></div>
      <!-- <RouterLink to="/station">Home</RouterLink> -->
      <router-link
        @click="$store.commit({ type: 'toggleFilterShown', isFilterShown: false })"
        to="/station"
        >Home
      </router-link>
      <div class="icon" v-html="getSvg('search')"></div>
      <!-- <RouterLink to="/search">Search</RouterLink> -->
      <RouterLink @click="$store.commit({ type: 'toggleFilterShown', isFilterShown: true })" to="/search"
        >Search
      </RouterLink>
      <RouterLink to="/">Your Library</RouterLink>
    </section>
    <section class="actions">
      <button class="create-playlist-btn">Create Playlist</button>
      <RouterLink to="/">Liked Songs</RouterLink>
    </section>
    <hr />
    <section class="user-playlists">
      <section class="playlist-links">
        <RouterLink to="/">My Playlist #1</RouterLink>
        <RouterLink to="/">My Playlist #2</RouterLink>
        <RouterLink to="/">My Playlist #3</RouterLink>
        <RouterLink to="/">My Playlist #4</RouterLink>
      </section>
    </section>
    <button class="install-btn">Install App</button>
  </section>
</template>

<script>
import { svgService } from '../services/svg.service.js';
export default {
  name: '',
  data() {
    return {};
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
  },
  computed: {},
  created() {},
  components: {},
};
</script>

<style></style>
