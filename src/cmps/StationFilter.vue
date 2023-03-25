<template>
  <section class="station-filter">
    <div class="search-icon" v-html="getSvg('searchEmpty')"></div>
    <input v-model="filterBy.name" @input="setFilter" class="search-input" type="text" name="search" id="search-input"
      placeholder="What do you want to listen to?" />
  </section>
</template>

<script>
import { svgService } from '../services/svg.service.js';
export default {

  name: 'station-filter',
  data() {
    return {
      selectedLabels: [],
      filterBy: {
        name: '',
        labels: [],
        sort: 'name',
        inStock: false,
      },
    };
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    setFilter() {
      this.$emit('setFilter', { ...this.filterBy });
    },
  },
  computed: {
    labels() {
      return this.$store.getters.labels;
    },
  },
};
</script>
