<template>
  <!-- <div class="header-placeholder"></div> -->
  <section v-if="station" class="station-details">
    <StationHeader @updateImgUrl="updateImgUrl" :station="station" />
    <div class="station-details-body">
      <PlayBtn :station="station" />
      <div @click="toggleStationOptions" class="options-icon" v-html="getSvg('playlistOptions')"></div>
      <ul v-if="isOptionsShown">
        <li v-if="station.isAddedByUser" @click="onEditStation">Edit</li>
        <li v-if="station.isAddedByUser" @click="onRemoveStation">Delete</li>
      </ul>
    </div>
    <SongList @setSong="setSong" @setStation="setStation" @removeSong="removeSong" :station="station" />
    <SongSearchList v-if="station.isAddedByUser" @addSong="addSong" />
    <hr>
    <div class="placeholder"></div>
  </section>
</template>

<script>
//TODO: LINE 2-4 CHANGE IMG TO BE CHOSEN BY USER & CONNECT USER LINE 9
import { stationService } from '../services/station.service.local.js';
import { svgService } from '../services/svg.service.js';

import StationHeader from '../cmps/StationHeader.vue';
import SongList from '../cmps/SongList.vue';
import SongSearchList from '../cmps/SongSearchList.vue';
import PlayBtn from '../cmps/PlayBtn.vue';
export default {
  name: 'Song Details',
  data() {
    return {
      station: null,
      isOptionsShown: false,
    };
  },
  methods: {
    setSong(song) {
      this.$store.dispatch({ type: 'setSong', song })
    },
    setStation(station) {
      this.$store.dispatch({ type: 'setStation', station })
    },
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
    async removeSong(songId) {
      const songIdx = this.station.songs.findIndex((song) => song._id === songId);
      this.station.songs.splice(songIdx, 1);
      try {
        await this.$store.dispatch({ type: 'updateStation', station: this.station });
      } catch (err) {
        console.log(err);
      }
    },
    updateImgUrl(imgUrl){
      console.log(imgUrl)
      this.station.imgUrl = imgUrl
      this.$store.dispatch({type: 'updateStation', station: this.station})
    }
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
    SongSearchList,
    PlayBtn
  },
};
</script>
