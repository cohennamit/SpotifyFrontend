<template>
  <section class="song-search">
    <header class="song-search-header">
      <div>
        <h1>Let's find something for your playlist</h1>
        <form @submit.prevent="search">
          <div class="input-wrap">
            <div class="icon" v-html="getSvg('emptySearch')"></div>
            <input name="search" type="text" v-model="query" placeholder="Search for songs" />
          </div>
          <!-- <button type="submit">Search</button> -->
        </form>
      </div>
    </header>

    <div v-if="loading">Loading...</div>
    <ul v-else class="song-search-results-wrap">
      <SongSearchPreview
        v-for="(video, index) in videos"
        @addSong="addSong"
        :video="video"
        :key="index"
      />
    </ul>
    <div v-if="!videos.length && !loading">No Songs</div>
  </section>
</template>

<script>
import { stationService } from '../services/station.service.local.js';
import { svgService } from '../services/svg.service.js';

import SongSearchPreview from './SongSearchPreview.vue';
export default {
  name: 'Song Search List',
  data() {
    return {
      query: '',
      videos: [],
      loading: false,
      currStation: {},
    };
  },
  async created() {
    const { stationId } = this.$route.params;
    try {
      const station = await stationService.getById(stationId);
      this.currStation = station;
    } catch (error) {
      console.log('Error fetching station: ', error);
    }
  },
  computed: {},
  methods: {
    async search() {
      const API_KEY = 'AIzaSyD-UvcH5vO6zd23dOmPlTMIwHdlVHAALZc';
      this.videos = [];

      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.query}&type=video&maxResults=10&key=${API_KEY}`
        );
        const { items } = await response.json();
        this.videos = items;
      } catch (error) {
        console.error(error);
      }
    },
    addSong(song) {
      this.$emit('addSong', song);
      //OUR'S:
      // const pattern = /[^-,_\w]+/g;
      //CHATGPT'S:
      // const pattern = /^(?<artist>[^-()]+)\s*-\s*(?<title>[^()]+)(\((feat\..+)\))?$/i;
      // const title = emptySong.title
      // const match = title.match(pattern)
      // const artist = match?.groups?.artist.trim()
      // const songTitle = match?.groups?.title.trim()
      //TODO: TRY TO FIX PATTERN TO NOT GET SHIT TITLE
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
  },
  components: {
    SongSearchPreview,
  },
};
</script>
