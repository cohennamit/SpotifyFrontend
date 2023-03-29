<template>
  <!-- <span>Browse all</span> -->
  <section class="labels-list">
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
export default {
  name: 'Search Page',
  data() {
    return {};
  },
  methods: {
    setLabel(label) {
      console.log(label);
      this.$router.push(`/genre/${label.name}`);
      this.$router.push(`/genre/${label.name}`);
    },
  },
  computed: {
    labels() {
      return this.$store.getters.labels;
    },
    getRandomColorClass() {
      // const colors = [
      // 'rgb(225 51 0)',
      // 'rgb(115 88 255)',
      // ]
      const randomIdx = utilService.getRandomIntInclusive(0, 12);
      return `label-container-${randomIdx}`;
    },
  },
  created() { },
  components: {},
};
</script>

<style></style>
