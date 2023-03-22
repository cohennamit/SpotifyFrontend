<template>
  <StationPreview
    class="station-list"
    v-for="station in stations"
    :key="station._id"
    :station="station"
  />
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
