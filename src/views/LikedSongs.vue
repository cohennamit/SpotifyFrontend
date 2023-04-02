<template>
  <!-- <div class="header-placeholder"></div> -->
  <section  class="station-details">
    <StationHeader class="liked-songs" @updateImgUrl="updateImgUrl" :station="station" />
    <div class="station-details-body">
      <PlayBtn :station="station" />
    </div>
    <SongList @setSong="setSong" @setStation="setStation" @removeSong="removeSong" :station="station" />
    <hr />
    <div class="placeholder"></div>
  </section>
  <!-- <section class="no-liked-songs" v-else>
    <h1>You don't have any liked songs yet...</h1>
  </section> -->
</template>

<script>
//TODO: LINE 2-4 CHANGE IMG TO BE CHOSEN BY USER & CONNECT USER LINE 9
import { stationService } from '../services/station.service.js';
import { svgService } from '../services/svg.service.js';

import StationHeader from '../cmps/StationHeader.vue';
import SongList from '../cmps/SongList.vue';
import SongSearchList from '../cmps/SongSearchList.vue';
import PlayBtn from '../cmps/PlayBtn.vue';
export default {
  name: 'Song Details',
  data() {
    return {
      station: {
        title: 'Liked Songs',
        imgUrl:
          'https://res.cloudinary.com/dwxvwkasw/image/upload/v1680189230/3099b3803ad9496896c43f22fe9be8c4_qxnxsw.png',
        songs: null,
      },
      isOptionsShown: false,
    };
  },
  mounted() {
    console.log('mounted');

    this.$store.dispatch('setCurrColor', 'rgb(28, 11, 59)');
  },
  methods: {
    setSong(song) {
      this.$store.dispatch({ type: 'setSong', song });
    },
    setStation(station) {
      this.$store.dispatch({ type: 'setStation', station });
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
    updateImgUrl(imgUrl) {
      this.station.imgUrl = imgUrl;
      this.$store.dispatch({ type: 'updateStation', station: this.station });
    },
  },
  computed: {
    // isLikedSongs() {
    //   console.log('this.station.songs', this.station.songs);
    //   return this.station.songs.length > 0;
    // },
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
  },
  created() {
    console.log('this.$store.getters.loggedinUser', this.$store.getters.loggedinUser.likedSongs);
    this.station.songs = [...this.$store.getters.loggedinUser.likedSongs];
    console.log('this.station', this.station);
  },
};
</script>
