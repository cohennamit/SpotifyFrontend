<template>
  <!-- <span>Browse all</span> -->
  <SongSearchList v-if="songs" :songs="songs"/>
  <section v-else class="labels-list">
    <article class="label-container" :class="getRandomColorClass" v-for="label in labels" @click="setLabel(label)">
      <img :src="label.imgUrl" />
      <span>
        {{ label.name }}
      </span>
    </article>
  </section>
</template>

<script>
//TODO: MAKE LABEL CONTAINER COLOR RANDOM
import { stationService } from '../services/station.service.js'
import { utilService } from '../services/util.service.js';
import { getSongs } from '../services/songService.js';

import SongSearchList from '../cmps/SongSearchList.vue';

export default {
  name: 'Search Page',
  data() {
    return {
      songs:null
    };
  },
  methods: {
    setLabel(label) {
      this.$router.push(`/genre/${label.name}`);
    },
  },
  computed: {
    labels() {
      return this.$store.getters.labels;
    },
    // const colors = [
      // 'rgb(225 51 0)',
        getRandomColorClass() {
      // 'rgb(115 88 255)',
      // ]
      const randomIdx = utilService.getRandomIntInclusive(0, 12);
      return `label-container-${randomIdx}`;
    },
  },
  watch: {
    '$route.query': {
    async handler() {
        const { query } = this.$route.query
        console.log(getSongs(query));
        if(query){
          this.songs = await getSongs(query)
        }
        // this.isSearchPage= (path === '/search') ? true : false
      },
      immediate: true,
    },
    '$route': {
      handler() {
        const { path } = this.$route
        if(path === '/search')this.songs = null
      },
      immediate: true,
    },
   
  },
  created() { },
  components: { 
    SongSearchList
   },
};
</script>

<style></style>
