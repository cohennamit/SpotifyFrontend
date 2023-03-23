<template>
  <!-- <article class="station-list-top-content-container" v-for="label in labels">
    <routerlink :label="label" :to="`/genre/${label}`">
      <span>
        {{ label.name }}
      </span>
    </routerlink>
  </article> -->
  <article class="station-list-top-content-container">
    <h1 class="top-content">Genre</h1>
    <h1 class="top-content">Genre</h1>
    <h1 class="top-content">Genre</h1>
    <h1 class="top-content">Genre</h1>
    <h1 class="top-content">Genre</h1>
    <h1 class="top-content">Genre</h1>
  </article>
  <article class="station-list">
    <StationPreview v-for="station in stations" :key="station._id" :station="station" />
  </article>
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
    return {};
  },
  methods: {},
  computed: {
    labels() {
      return this.$store.getters.labels;
    },
  },
  created() {},
  components: {
    StationPreview,
  },
};
</script>

<style></style>
