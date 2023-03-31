<template>
  <section class="home-grace">
    <h2>{{ greetings }}</h2>
  </section>
  <section class="station-list-top-content-container">
    <route class="top-content">
      <img
        class="top-content-img"
        src="https://res.cloudinary.com/dixcbkuih/image/upload/v1679553986/20_arpepb.png"
        alt=""
      />
      <!-- <div class="top-content-content-internal-wrapper"> -->
      <h1>Liked Songs</h1>
      <!-- </div> -->
    </route>
    <route class="top-content">
      <img
        class="top-content-img"
        src="https://res.cloudinary.com/dixcbkuih/image/upload/v1679553985/16_emxov7.jpg"
        alt=""
      />
      <h1>All the Brilliant Things</h1>
    </route>
    <route @click="goToClickedStation('Jericho Jackson')" class="top-content">
      <img
        class="top-content-img"
        src="https://res.cloudinary.com/dixcbkuih/image/upload/v1679553985/18_pc62j8.jpg"
        alt=""
      />
      <h1>Jericho Jackson</h1>
    </route>
    <route class="top-content">
      <img
        class="top-content-img"
        src="https://res.cloudinary.com/dixcbkuih/image/upload/v1679553985/17_awapkm.jpg"
        alt=""
      />
      <h1>DJ Muggs</h1>
    </route>
    <route class="top-content">
      <img
        class="top-content-img"
        src="https://res.cloudinary.com/dixcbkuih/image/upload/v1679553985/19_y8ts6r.jpg"
        alt=""
      />
      <h1>Boldy James</h1>
    </route>
    <route class="top-content">
      <img
        class="top-content-img"
        src="https://res.cloudinary.com/dixcbkuih/image/upload/v1679553986/22_mxixz2.jpg"
        alt=""
      />
      <h1>Super Tecmo Bo</h1>
    </route>
  </section>
  <article>
    <h1 class="station-list-text">Made For You</h1>
  </article>
  <ul class="station-list">
    <StationPreview v-for="station in defaultStations" :key="station._id" :station="station" />
  </ul>
</template>

<script>
import StationPreview from '../cmps/StationPreview.vue';
export default {
  name: 'StationList',
  props: {
    stations: Array,
    default: [],
  },
  data() {
    return {
      stationId: '',
    };
  },
  mounted() {
    this.$store.dispatch('setCurrColor', 'rgb(0,0,0)');
  },
  methods: {
    goToClickedStation(stationTitle) {
      this.$store.dispatch('setHeaderColor', `rgba(28, 17, 56, ${1 - opacity})`);

      const station = this.stations.find(({ title }) => title === stationTitle);
      this.stationId = station._Id;
    },
  },
  computed: {
    labels() {
      return this.$store.getters.labels;
    },
    defaultStations() {
      return this.stations.filter((station) => !station.isAddedByUser);
    },
  },
  greetings() {
    const now = new Date();
    const hour = now.getHours();
    console.log(hour);
    if (hour >= 5 && hour < 12) {
      return 'Good morning';
    } else if (hour >= 12 && hour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  },
  created() {},
  components: {
    StationPreview,
  },
};
</script>

<style></style>
