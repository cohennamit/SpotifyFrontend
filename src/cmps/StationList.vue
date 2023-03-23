<template>
  <!-- <article class="station-list-top-content-container" v-for="label in labels">
    <routerlink :label="label" :to="`/genre/${label}`">
      <span>
        {{ label.name }}
      </span>
    </routerlink>
  </article> -->
  <section class="station-list-top-content-container">
    <article class="top-content">
      <img src="https://res.cloudinary.com/dixcbkuih/image/upload/v1679553986/20_arpepb.png" alt="" />
      <h1>Liked Songs</h1>
    </article>
    <article class="top-content">
      <img src="https://res.cloudinary.com/dixcbkuih/image/upload/v1679553985/16_emxov7.jpg" alt="" />
      <h1>All the Brilliant Things</h1>
    </article>
    <article class="top-content">
      <img src="https://res.cloudinary.com/dixcbkuih/image/upload/v1679553985/18_pc62j8.jpg" alt="" />
      <h1>Jericho Jackson</h1>
    </article>
    <article class="top-content">
      <img src="https://res.cloudinary.com/dixcbkuih/image/upload/v1679553985/17_awapkm.jpg" alt="" />
      <h1>DJ Muggs</h1>
    </article>
    <article class="top-content">
      <img src="https://res.cloudinary.com/dixcbkuih/image/upload/v1679553985/19_y8ts6r.jpg" alt="" />
      <h1>Boldy James</h1>
    </article>
    <article class="top-content">
      <img src="https://res.cloudinary.com/dixcbkuih/image/upload/v1679553986/22_mxixz2.jpg" alt="" />
      <h1>Super Tecmo Bo</h1>
    </article>
  </section>
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
