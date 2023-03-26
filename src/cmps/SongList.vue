<template>
  <ul class="song-list">
    <div v-if="isStation" class="song-preview-main song-preview-content-table">
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
    <SongPreview
      v-for="(song, index) in station.songs"
      @removeSong="removeSong"
      :song="song"
      :station="station"
      :index="index"
    />
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
    },
  },
  emits: ['removeSong'],
  data() {
    return {};
  },
  methods: {},
  computed: {
    isStation() {
      if (this.station) return this.station.songs.length > 0;
    },
  },

  created() {},
  components: {
    SongPreview,
  },
};
</script>
