<template>
    <section class="footer">
        <section class="song-info">
            <img :src="imgUrl" alt="">
            <h3>{{ shortenedTitle(songTitle) }}</h3>
        </section>
        <YouTube hidden :src="'https://www.youtube.com/watch?v=' + videoId" ref="youtube" :player-vars="playerVars" />
        <section class="footer-btns">
            <button @click="onShuffle" class="footer-btn">
                <div class="icon" :class="{ 'active': isShuffling }" v-html="getSvg('shuffle')"></div>
            </button>
            <button class="footer-btn" @click="onPrevSong">
                <div class="icon" v-html="getSvg('playPrev')"></div>
            </button>
            <button @click="onPauseResume" class="footer-btn btn-pause">
                <div v-html="isPlaying ? getSvg('resume') : getSvg('pause')"></div>
            </button>
            <button class="footer-btn" @click="onNextSong">
                <div class="icon" v-html="getSvg('playNext')"></div>
            </button>
            <button @click="onRepeat" class="footer-btn">
                <div class="icon" :class="{ 'active': isRepeating }" v-html="getSvg('repeat')"></div>
            </button>
        </section>
        <section class="music-settings">
            <button @click="toggleMute" class="btn-mute">
                <div class="icon" v-html="isMuted ? getSvg('soundMuted') : getSvg('sound')"></div>
            </button>
            <input class="footer-volume" type="range" min="0" max="100" step="10" id="volume-slider" v-model="volume" />
        </section>
    </section>
</template>


<script>
import { svgService } from '../services/svg.service.js';
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
            },
            isMuted: false,
            isPlaying: false,
            isShuffling: false,
            isRepeating: false,
        }
    },
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName);
        },
        // onPauseResume() {
        //     if (this.pauseStatus === 'Resume') {
        //         this.$refs.youtube.playVideo()
        //         this.pauseStatus = 'Pause'
        //     } else {
        //         this.pauseStatus = 'Resume'
        //         this.$refs.youtube.pauseVideo()
        //     }
        // },
        onPauseResume() {
            this.isPlaying = !this.isPlaying
            if (this.isPlaying) this.$refs.youtube.pauseVideo()
            else this.$refs.youtube.playVideo()
        },
        onNextSong() {
            this.$store.dispatch({ type: 'setNextSong' })
        },
        onPrevSong() {
            this.$store.dispatch({ type: 'setPrevSong' })
        },
        onRepeat() {
            this.isRepeating = !this.isRepeating
            if (isRepeating) this.playerVars.loop = 0
            else this.playerVars.loop = 1
        },
        onShuffle() {
            this.isShuffling = !this.isShuffling
        },
        toggleMute() {
            if (this.isMuted) this.volume = 40
            else this.volume = 0
            this.isMuted = !this.isMuted
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
        isShuffleActive() {
            return this.isShuffling ? 'active' : ''
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