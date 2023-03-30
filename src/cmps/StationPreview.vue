
<template >
    <section @click="goToDetails" class="station-preview">
      <div class="img-wrapper">
        <img v-if="station.imgUrl" :src="station.imgUrl" />
        <PlayBtn v-if="station.songs.length" :station="station" class="play-btn img-wrapper-play-btn" />
      </div>
      <p>{{ station.title }}</p>
      <span v-for="(d, idx) in station.desc" :key="idx" class="station-preview-desc"
      >{{ d }} <span v-if="idx < 2">{{ ',' }} {{ '&nbsp;' }} </span>
    </span>
  </section>
</template>

<script>
import PlayBtn from './PlayBtn.vue';
export default {
  name: '',
  props: {
    station: Object,
  },
  data() {
    return {
      // isPlayBtnShown: false
    };
  },
  methods: {
    goToDetails() {
      this.$router.push(`/station/${this.station._id}`);
    },
    handleHover(){
     this.isPlayBtnShown = !this.isPlayBtnShown
    }
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
  components: {
    PlayBtn
  },
};
</script>

