<template>
  <button @click.stop="setSong" class="play-btn">
    <div class="play-btn-icon" v-html="getSvg('playSongLarge')"></div>
  </button>
</template>

<script>
import { svgService } from '../services/svg.service.js';
export default {
  name: 'Play Btn',
  props: {
    station: {
      type: Object
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    setSong() {
      this.$store.dispatch({ type: 'setSong', song: this.station.songs[0] })
      this.$store.dispatch({ type: 'setStation', station: this.station })
    },
    
  }
}
</script>