<template></template>
<StationList v-if="stations" :stations="stations" @removed="removeStation" :class="'station-list'" />

<script>
export default {
  name: '',
  data() {
    return {};
  },
  methods: {},
  computed: {},
  created() {},
  components: {
    ToyList,
  },
};
</script>

<style></style>
