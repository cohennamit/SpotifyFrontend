<template>
  <section class="song-filter">
    <form @submit.prevent="search">
      <input type="search" v-model="query" placeholder="Enter search term" />
      <button type="submit">Search</button>
    </form>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <ul>
        <li v-for="(video, index) in videos" :key="index">
          <h4>{{ index + 1 }}</h4>
          <img :src="video.snippet.thumbnails.default.url" alt="" />
          <div>
            <h3>{{ shortenedTitle(video.snippet.title) }}</h3>
            <h6>Artist</h6>
            <button @click="addSong(video)">Add</button>
          </div>
          <iframe
            hidden
            width="60"
            height="15"
            :src="'https://www.youtube.com/embed/' + video.id.videoId"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </li>
      </ul>
      <div v-if="!videos.length && !loading">No Songs</div>
    </div>
  </section>
</template>

<script>
import { stationService } from '../services/station.service.local.js';
import { eventBus } from '../services/event-bus.service.js';
export default {
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
  computed: {
    shortenedTitle() {
      const maxLength = 30;
      return function (title) {
        return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
      };
    },
  },
  methods: {
    async search() {
      const API_KEY = 'AIzaSyB_6u19ZnSR_5zv7HYgTJKw6qkPpnsREcg';
      this.videos = [];

      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.query}&type=video&maxResults=10&key=${API_KEY}`
        );
        const { items } = await response.json();
        console.log('items: ', items);
        console.log(items);
        this.videos = items;
      } catch (error) {
        console.error(error);
      }
    },
    addSong(video) {
      const song = stationService.getEmptySong();
      const { snippet, id } = { ...video };
      song.title = snippet.title;
      song.videoId = id.videoId;
      song.imgUrl = snippet.thumbnails.default.url;
      this.$emit('addSong', song);

      //OUR'S:
      // const pattern = /[^-,_\w]+/g;
      //CHATGPT'S:
      // const pattern = /^(?<artist>[^-()]+)\s*-\s*(?<title>[^()]+)(\((feat\..+)\))?$/i;
      // const title = emptySong.title
      // const match = title.match(pattern);
      // const artist = match?.groups?.artist.trim();
      // const songTitle = match?.groups?.title.trim();
      //TODO: TRY TO FIX PATTERN TO NOT GET SHIT TITLE
    },
  },
};
</script>
