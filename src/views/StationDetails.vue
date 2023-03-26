<template>
  <!-- <div class="header-placeholder"></div> -->
  <section class="station-details">
    <StationHeader :station="station" />
    <article class="station-details-body">
      <div @click="toggleStationOptions" class="icon" v-html="getSvg('playlistOptions')"></div>
      <ul v-if="isOptionsShown">
        <li v-if="station.isAddedByUser" @click="onEditStation">Edit</li>
        <li v-if="station.isAddedByUser" @click="onRemoveStation">Delete</li>
      </ul>
    </article>
    <SongList @removeSong="removeSong" :station="station" />
    <SongFilter @addSong="addSong" />
  </section>
</template>

<script>
//TODO: LINE 2-4 CHANGE IMG TO BE CHOSEN BY USER & CONNECT USER LINE 9
import { stationService } from '../services/station.service.local.js';
import { svgService } from '../services/svg.service.js';

import StationHeader from '../cmps/StationHeader.vue';
import SongList from '../cmps/SongList.vue';
import SongFilter from '../cmps/SongFilter.vue';

export default {
  name: 'Song Details',
  data() {
    return {
      station: {},
      isOptionsShown: false,
    };
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    toggleStationOptions() {
      this.isOptionsShown = !this.isOptionsShown;
    },
    onRemoveStation() {
      this.$store.dispatch({ type: 'removeStation', stationId: this.station._id });
      this.$router.push('/station');
    },
    addSong(song) {
      this.station.songs.push(song);
      this.$store.dispatch({ type: 'updateStation', station: this.station });
    },
    removeSong(songId) {
      console.log('details', songId);
      const songIdx = this.station.songs.findIndex((song) => song._id === songId);
      console.log('details', songIdx);
      this.station.songs.splice(songIdx, 1);
      this.$store.dispatch({ type: 'updateStation', station: this.station });
    },
  },
  computed: {
    // async getStation() {
    //   const { stationId } = this.$route.params;
    //   // console.log('create',stationId)
    //   try {
    //     const station = await stationService.getById(stationId);
    //     this.station = station;
    //   } catch (error) {
    //     console.log('Error fetching station: ', error);
    //   }
    // },
  },
  watch: {
    '$route.params': {
      handler() {
        const { stationId } = this.$route.params;
        stationService.getById(stationId).then((station) => (this.station = station));
      },
      immediate: true,
    },
  },
  components: {
    StationHeader,
    SongList,
    SongFilter,
  },
};
</script>
