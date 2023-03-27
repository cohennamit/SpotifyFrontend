<template>
<button class="play-btn">
    <div  class="play-btn-icon" v-html="getSvg('playSongLarge')"></div>
</button>
</template>

<script>
import { svgService } from '../services/svg.service.js';
export default {
name: 'Play Btn',
methods: {
    getSvg(iconName) {
    return svgService.getSvg(iconName)
  }
}
}
</script>