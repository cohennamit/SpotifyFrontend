<template>
  <section @click="goToDetails" class="station-preview">
    <img v-if="station.imgUrl" :src="station.imgUrl" />
    <p>{{ station.title }}</p>
  </section>
</template>

<script>
export default {
  name: '',
  props: {
    station: Object,
  },
  data() {
    return {};
  },
  methods: {
    goToDetails() {
      this.$router.push(`/station/${this.station._id}`);
    },
  },

  computed: {},
  created() {},
  components: {},
};
</script>

<style></style>
