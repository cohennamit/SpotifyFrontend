<template>
  <ul v-if="station" class="song-list">
    <div v-if="hasSongs" class="song-preview-main song-preview-content-table">
      <div>#</div>
      <div>Title</div>
      <div>Album</div>
      <div>Date Added</div>
      <div>
        <div></div>
        <div class="icon" v-html="getSvg('clock')"></div>
        <div></div>
      </div>
    </div>
    <SongPreview v-for="(song, index) in station.songs" @removeSong="removeSong" :song="song" :station="station"
      :index="index" />
  </ul>
</template>

<script>
import SongPreview from './SongPreview.vue';
import { svgService } from '../services/svg.service.js';
export default {
  name: 'Song List',
  props: {
    station: {
      type: Object,
      require: true
    },
  },
  emits: ['removeSong'],
  data() {
    return {};
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    removeSong(songId) {
      this.$emit('removeSong', songId)
    }
  },
  computed: {
    hasSongs() {
      console.log(this.station);
      return this.station.songs.length
    },

  },
  created() { },
  components: {
    SongPreview,
  },
};
</script>
