<template>
  <section @click="goToDetails" class="station-preview">
    <img v-if="station.imgUrl" :src="station.imgUrl" />
    <p>{{ station.title }}</p>
    <span v-for="(d, idx) in station.desc" :key="idx" class="station-preview-desc"
      >{{ d }} <span v-if="idx < 3">{{ ',' }} {{ '&nbsp;' }} </span>
    </span>
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

  computed: {
    shortenedTitle() {
      const maxLength = 30;
      return function (title) {
        return title.length > maxLength ? title.slice(0, maxLength) + 'and more' : title;
      };
    },
  },
  created() {},
  components: {},
};
</script>

<style></style>
