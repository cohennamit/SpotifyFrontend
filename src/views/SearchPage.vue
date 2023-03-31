<template>
  <span class="label-list-text">Browse all</span>

  <SongSearchList v-if="songs" :songs="songs" />

  <section v-else class="labels-list">
    <article
      class="label-container"
      :class="getRandomColorClass(index)"
      v-for="(label, index) in labels"
      @click="setLabel(label)"
    >
      <img :src="label.imgUrl" />
      <span>{{ label.name }}</span>
    </article>
  </section>
</template>

<script>
import { utilService } from '../services/util.service.js';
import { getSongs } from '../services/songService.js';

import SongSearchList from '../cmps/SongSearchList.vue';

export default {
  name: 'Search Page',
  data() {
    return {
      songs: null,
    };
  },
  mounted() {
    this.$store.dispatch('setCurrColor', 'rgb(0,0,0)');
  },
  computed: {
    labels() {
      return this.$store.getters.labels;
    },
  },
  watch: {
    '$route.query': {
      async handler() {
        const { query } = this.$route.query;
        console.log(getSongs(query));
        if (query) {
          this.songs = await getSongs(query);
        }
        this.isSearchPage = path === '/search' ? true : false;
      },
      immediate: true,
    },
    $route: {
      handler() {
        const { path } = this.$route;
        if (path === '/search') this.songs = null;
      },
      immediate: true,
    },
  },
  methods: {
    setSong(song) {
      console.log('page', song);
      this.$store.dispatch({ type: 'setSong', song });
    },
    setLabel(label) {
      this.$router.push(`/genre/${label.name}`);
    },
    getRandomColorClass(index) {
      const colors = [
        'label-container-0',
        'label-container-1',
        'label-container-2',
        'label-container-3',
        'label-container-4',
        'label-container-5',
        'label-container-6',
        'label-container-7',
        'label-container-8',
        'label-container-9',
        'label-container-10',
        'label-container-11',
        'label-container-12',
      ];
      const randomIdx = utilService.getRandomIntInclusive(0, colors.length - 1);
      return colors[randomIdx];
    },
  },
  created() {},
  components: {
    SongSearchList,
  },
};
</script>
