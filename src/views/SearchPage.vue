<template>
  <section class="genre-list" >
    <div class="label-container" v-for="label in labels">
      <routerlink :label="label" :to= "`/genre/${label}`"  >
            <img :src="label.imgUrl" alt="" />
            <span>
              {{ label.name }}
            </span>
      </routerlink>
        </div>
  </section>
</template> 

<script>
// import {stationService} from '../services/station.service.local.js'
import GenrePage from './GenrePage.vue';
export default {
  name: 'Search Page',
  data() {
    return {
    }
  },
  methods: {
    setLabel(label) {
      console.log(label)
      // this.$router.push(`/genre/${this.label}`)
    },
  },
  computed: {
    labels() {
     return this.$store.getters.labels
    }
  },
  created() { },
  components: {
    GenrePage,
  },
};
</script>

<style></style>
