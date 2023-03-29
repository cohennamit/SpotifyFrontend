<template>
  <ul v-if="station" class="song-list">
    <div v-if="hasSongs" class="song-preview-main song-preview-header">
      <div>#</div>
      <div class="title">Title</div>
      <div class="album">Album</div>
      <div class="Date-added">Date Added</div>
      <div>
        <div></div>
        <div class="clock-icon" v-html="getSvg('clock')"></div>
        <div></div>
      </div>
    </div>
    <SongPreview v-for="(song, index) in station.songs" @removeSong="removeSong" @setActiveSong="setActiveSong"
      :activeSongIdx="activeSongIdx" :song="song" :station="station" :index="index" />
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
    return {
      activeSongIdx: -1,

    };
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    removeSong(songId) {
      this.$emit('removeSong', songId)
    },
    setActiveSong(idx) {
      console.log(idx)
      this.activeSongIdx = idx
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
