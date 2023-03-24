<template>
  <section class="genres-wrap">
    <h2>Browse all</h2>
    <article class="genres-list">
      <div class="label-container" v-for="label in labels" @click="setLabel(label)">
        <img :src="label.imgUrl"/>
        <span>
          {{ label.name }}
        </span>
      </div>
    </article>
  </section>
</template> 

<script>
//TODO: MAKE LABEL CONTAINER COLOR RANDOM
// import {stationService} from '../services/station.service.local.js'
export default {
  name: 'Search Page',
  data() {
    return {
    }
  },
  methods: {
    setLabel(label) {
      console.log(label)
      this.$router.push(`/genre/${label.name}`)
      this.$router.push(`/genre/${label.name}`)
    },
  },
  computed: {
    labels() {
      return this.$store.getters.labels
      return this.$store.getters.labels
    }
  },
  created() { },
  components: {
  },
};
</script>

<style></style>
