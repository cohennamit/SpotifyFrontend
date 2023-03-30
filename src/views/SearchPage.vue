<template>
  <section class="labels-list">
    <article
      class="label-container"
      :class="getRandomColorClass(index)"
      v-for="(label, index) in labels"
      @click="setLabel(label)"
    >
      <img :src="label.imgUrl" />
      <span>{{ label.name }}</span>
    </article>
  </section>
</template>

<script>
import { utilService } from '../services/util.service.js';

export default {
  // ...
  computed: {
    labels() {
      return this.$store.getters.labels;
    },
  },
  methods: {
    setLabel(label) {
      this.$router.push(`/genre/${label.name}`);
    },
    getRandomColorClass(index) {
      const colors = [
        'label-container-0',
        'label-container-1',
        'label-container-2',
        'label-container-3',
        'label-container-4',
        'label-container-5',
        'label-container-6',
        'label-container-7',
        'label-container-8',
        'label-container-9',
        'label-container-10',
        'label-container-11',
        'label-container-12',
      ];
      const randomIdx = utilService.getRandomIntInclusive(0, colors.length - 1);
      return colors[randomIdx];
    },
  },
};
</script>
