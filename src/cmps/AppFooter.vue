<template>
    <section class="footer">
        <section class="song-info">
            <img :src="imgUrl" alt="">
            <h3>{{ shortenedTitle(songTitle) }}</h3>
        </section>
        <YouTube hidden :src="'https://www.youtube.com/watch?v=' + videoId" ref="youtube" :player-vars="playerVars" />
        <section class="footer-btns">
            <button class="footer-btn">Shuffle</button>
            <button class="footer-btn">Prev</button>
            <button @click="onPauseResume" class="footer-btn">{{ pauseStatus }}</button>
            <button class="footer-btn">Next</button>
            <button @click="onRepeat" class="footer-btn">{{ repeatStatus }}</button>
        </section>
        <section class="music-settings">
            <input class="footer-volume" type="range" min="0" max="100" step="10" id="volume-slider" v-model="volume" />
        </section>
    </section>
</template>


<script>
import { defineComponent } from 'vue'
import YouTube from 'vue3-youtube'

export default defineComponent({
    components: { YouTube },
    data() {
        return {
            // videoId: 'YVkUvmDQ3HY',
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
    },
    computed: {
        videoId() {
            return this.$store.getters.currentSong.videoId
        },
        imgUrl() {
            return this.$store.getters.currentSong.imgUrl
        },
        songTitle() {
            return this.$store.getters.currentSong.title
        },
        shortenedTitle() {
            const maxLength = 20;
            return function (title) {
            return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
            }
        },
    }

})

</script>