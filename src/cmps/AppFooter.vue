<template>
    <section class="footer">
        <YouTube hidden src="https://www.youtube.com/watch?v=Zi_XLOBDo_Y&ab" ref="youtube" :player-vars="playerVars" />
        <section class="footer-btns">
            <button class="footer-btn">Shuffle</button>
            <button class="footer-btn">Prev</button>
            <button @click="onPauseResume" class="footer-btn">{{ pauseStatus }}</button>
            <button class="footer-btn">Next</button>
            <button @click="onRepeat" class="footer-btn">{{ repeatStatus }}</button>
        </section>
        <input class="footer-volume" type="range" min="0" max="100" step="10" id="volume-slider" v-model="volume" />
    </section>
</template>


<script>
import { defineComponent } from 'vue'
import YouTube from 'vue3-youtube'

export default defineComponent({
    components: { YouTube },
    data() {
        return {
            repeatStatus: 'Repeat',
            pauseStatus: 'Resume',
            volume: 40,
            isRepeating: true,
            playerVars: {
                loop: 0
            }
        }
    },
    methods: {
        onPauseResume() {
            if (this.pauseStatus === 'Resume') {
                this.$refs.youtube.playVideo()
                this.pauseStatus = 'Pause'
            } else {
                this.pauseStatus = 'Resume'
                this.$refs.youtube.pauseVideo()
            }
        },
        onRepeat() {
            if (this.repeatStatus === 'Repeat') {
                this.repeatStatus = 'Repeating'
                this.playerVars.loop = 1
            }
            else {
                this.repeatStatus = 'Repeat'
                this.playerVars.loop = 1
            }
            this.isRepeating = !this.isRepeating
            console.log('this.isRepeating', this.isRepeating)
        }
    },
    watch: {
        volume(newVolume) {
            this.$refs.youtube.setVolume(newVolume);
        }
    }

})

</script>