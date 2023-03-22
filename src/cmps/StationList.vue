<template>
  <article class="station-list-top-content-container">
    <h1>button</h1>
    <h1>button</h1>
    <h1>button</h1>
    <h1>button</h1>
    <h1>button</h1>
    <h1>button</h1>
  </article>
  <article class="station-list">
    <StationPreview
      class="station-preview"
      v-for="station in stations"
      :key="station._id"
      :station="station"
    />
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
  computed: {},
  created() {},
  components: {
    StationPreview,
  },
};
</script>

<style></style>
