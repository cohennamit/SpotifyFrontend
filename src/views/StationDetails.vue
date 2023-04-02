<template>
  <!-- <div class="header-placeholder"></div> -->
  <section @click="closeStationOptions" v-if="station" class="station-details">
    <StationHeader @updateImgUrl="updateImgUrl" :station="station" />
    <div class="station-details-body">
      <PlayBtn :station="station" />
      <div
        @click="openStationOptions($event)"
        @blur="closeStationOptions"
        class="options-icon"
        v-html="getSvg('playlistOptions')"
      ></div>
      <ul ref="modalContainer" class="options-menu" v-if="isOptionsShown">
        <li v-if="station.isAddedByUser" @click="onOpenEditModal($event)">Edit</li>
        <li v-if="station.isAddedByUser" @click="onRemoveStation($event)">Delete</li>
      </ul>
    </div>
    <SongList @setSong="setSong" @setStation="setStation" @removeSong="removeSong" :station="station" />
    <section v-if="station.isAddedByUser" class="song-search-header">
      <h1>Let's find something for your playlist</h1>
      <SongSearch @setSearch="fetchSongs" class="station-details-search" />
    </section>
    <SongSearchList
      v-if="station.isAddedByUser"
      :songs="songs"
      class="search-results-list"
      @setSong="setSong"
      @addSong="addSong"
    />
    <hr />
    <div class="placeholder"></div>
  </section>
  <Modal
    @updateImgUrl="updateImgUrl"
    @onCloseEditModal="onCloseEditModal"
    v-if="isEdit"
    :station="station"
  />
</template>

<script>
//TODO: LINE 2-4 CHANGE IMG TO BE CHOSEN BY USER & CONNECT USER LINE 9
import { stationService } from '../services/station.service.js';
import { svgService } from '../services/svg.service.js';
import { getSongs } from '../services/songService.js';

import Modal from '../cmps/Modal.vue';
import StationHeader from '../cmps/StationHeader.vue';
import SongList from '../cmps/SongList.vue';
import SongSearchList from '../cmps/SongSearchList.vue';
import PlayBtn from '../cmps/PlayBtn.vue';
import SongSearch from '../cmps/SongSearch.vue';
export default {
  name: 'Song Details',
  data() {
    return {
      station: null,
      isOptionsShown: false,
      songs: null,
      isEdit: false,
    };
  },
  methods: {
    onOpenEditModal() {
      if (!this.station.isAddedByUser) return;
      this.isEdit = true;
    },
    onCloseEditModal() {
      this.isEdit = false;
    },

    async fetchSongs(query) {
      this.songs = await getSongs(query);
    },
    setSong(song) {
      this.$store.dispatch({ type: 'setSong', song });
    },
    setStation(station) {
      this.$store.dispatch({ type: 'setStation', station });
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    openStationOptions(event) {
      event.stopPropagation();
      this.isOptionsShown = true;
    },
    closeStationOptions(event) {
      this.isOptionsShown = false;
    },
    onRemoveStation() {
      this.$store.dispatch({ type: 'removeStation', stationId: this.station._id });
      // this.$store.commit({ type:'removeUserStation'})
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
    updateImgUrl(imgUrl) {
      if (!imgUrl) return;
      this.station.imgUrl = imgUrl;
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
    SongSearchList,
    PlayBtn,
    SongSearch,
    Modal,
  },
};
</script>
