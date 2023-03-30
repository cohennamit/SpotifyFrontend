<template>
  <section>
    <ul v-if="songs" :class="setSearchClass" class="song-search-results-wrap">
      <SongSearchPreview v-for="(song, index) in songs" @addSong="addSong" :song="song" :key="index" />
    </ul>
    <div v-if="!songs && !loading">No Songs</div>
  </section>
</template>

<script>
import { stationService } from '../services/station.service.js';
import { svgService } from '../services/svg.service.js';
import { eventBus } from '../services/event-bus.service.js';
import SongSearchPreview from './SongSearchPreview.vue';

export default {
  name: 'Song Search List',
  props:{
    songs :{
      type: Array
    }
  },
  data() {
    return {
      query: '',
      currStation: {},
      loading: false
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
    setSearchClass(){
      if(this.$route.path === '/search') return 'search-page'
    }
  },
  methods: {
    addSong(song) {
      this.$emit('addSong', song);
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    // setSongs(searchResults) {
    //   this.Songs = searchResults
    // }
  },
  components: {
    SongSearchPreview,
  },
};
</script>
