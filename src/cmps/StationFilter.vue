<template>
  <section class="toy-filter">
    <input
      v-model="filterBy.name"
      @input="setFilter"
      class="search-input"
      type="text"
      name="search"
      id="search-input"
      placeholder="What do you want to listen to?"
    />
  </section>
</template>

<script>
export default {
  name: 'toy-filter',
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
