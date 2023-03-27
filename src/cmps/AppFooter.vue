<template>
    <section class="footer">
        <section v-if="videoId" class="song-info">
            <img :src="imgUrl" alt="">
            <h3>{{ shortenedTitle(songTitle) }}</h3>
        </section>
        <section v-else>
            <div class="placeholder"></div>
        </section>
        <YouTube v-if="videoId" hidden :src="'https://www.youtube.com/watch?v=' + videoId" ref="youtube" @ready="onReady"
            @state-change="onStateChange" />
        <section class="mid-section">
            <section class="footer-btns">
                <button @click="onShuffle" class="footer-btn">
                    <div class="icon" :class="{ 'active': isShuffling }" v-html="getSvg('shuffle')"></div>
                </button>
                <button class="footer-btn" @click="onPrevSong">
                    <div class="icon" v-html="getSvg('playPrev')"></div>
                </button>
                <button @click="onPauseResume" class="footer-btn btn-pause">
                    <div v-html="isPlaying ? getSvg('pause') : getSvg('resume')"></div>
                </button>
                <button class="footer-btn" @click="onNextSong">
                    <div class="icon" v-html="getSvg('playNext')"></div>
                </button>
                <button @click="onRepeat" class="footer-btn">
                    <div class="icon" :class="{ 'active': isRepeating }" v-html="getSvg('repeat')"></div>
                </button>
            </section>
            <div class="music-bar">
                <span class="duration-span">{{ formatTime(currentTime) }}</span>
                <div class="progress-bar" @click="findProgress($event)" ref="progressBar">
                    <div class="progress-bar-fill" :style="{ width: progressBarWidth + '%' }" ref="progressBarFill">
                    </div>
                </div>
                <span class="duration-span">{{ formatTime(duration) }}</span>
            </div>
        </section>
        <div class="music-settings-container">
            <section class="music-settings">
                <button @click="toggleMute" class="btn-mute">
                    <div class="icon" v-html="isMuted ? getSvg('soundMuted') : getSvg('sound')"></div>
                </button>
                <input class="footer-volume volume-slider" type="range" min="0" max="100" step="1" id="volume-slider"
                    v-model="volume" />
            </section>
        </div>
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
            volume: 40,
            isRepeating: true,
            playerVars: {
                loop: 1
            },
            intervalId: null,
            isMuted: false,
            isPlaying: false,
            isShuffling: false,
            isRepeating: false,
            duration: 0,
            currentTime: 0,
        }
    },
    methods: {
        onReady() {
            console.log('im ready');
            this.duration = this.$refs.youtube.getDuration()
            this.intervalId = setInterval(() => {
                this.currentTime = this.$refs.youtube.getCurrentTime()
            }, 1000)
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName);
        },
        onPauseResume() {
            if (!this.videoId) return
            this.isPlaying = !this.isPlaying
            if (this.isPlaying) this.$refs.youtube.playVideo()
            else this.$refs.youtube.pauseVideo()
        },
        // onPauseResume() {
        //     this.$store.commit({ type: 'pauseResume' })
        // },
        onNextSong() {
            this.$store.dispatch({ type: 'setNextSong' })
        },
        onPrevSong() {
            this.$store.dispatch({ type: 'setPrevSong' })
        },
        onRepeat() {
            this.isRepeating = !this.isRepeating
            console.log('this.isRepeating', this.isRepeating)
        },
        onShuffle() {
            this.isShuffling = !this.isShuffling
            console.log('this.isShuffling', this.isShuffling)
        },
        toggleMute() {
            if (!this.videoId) return
            if (this.isMuted) this.volume = 40
            else this.volume = 0
            this.isMuted = !this.isMuted
        },
        onStateChange(event) {
            console.log('event.data', event.data)
            if (event.data === 1) this.isPlaying = true
            if (event.data === 0) {
                this.isPlaying = false
                clearInterval(this.intervalId)
                this.currentTime = 0
                if (this.isRepeating) {
                    this.$store.commit({ type: 'setSameSong' })
                }
                else if (this.isShuffling) {
                    this.$store.commit({ type: 'setRandomSong' })
                }
                else {
                    this.$store.commit({ type: 'setNextSong' })
                }
                this.$refs.youtube.playVideo()
                this.isPlaying = true
                this.onReady()
            }
        },
        formatTime(time) {
            const minutes = Math.floor(time / 60)
            const seconds = Math.floor(time % 60)
            return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
        },
        findProgress(ev) {
            const progressBar = this.$refs.progressBar
            const progressBarFill = this.$refs.progressBarFill

            // calculate the position of the click on the progress bar
            const progressBarWidth = progressBar.offsetWidth
            const clickedPosition = ev.pageX - progressBar.offsetLeft
            const progressPercentage = clickedPosition / progressBarWidth

            // calculate the time to seek to
            const newTime = this.duration * progressPercentage

            // update the current time and seek to the new time
            this.currentTime = newTime
            this.$refs.youtube.seekTo(newTime)

            // update the width of the progress bar fill
            progressBarFill.style.width = progressPercentage * 100 + '%'
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
        progressBarWidth() {
            if (!this.duration || !this.currentTime) return

            const progressBarWidth = (this.currentTime / this.duration) * 100
            return progressBarWidth

        }
        // isPlaying() {
        //     return this.$store.getters.isPlaying
        // }
    },
    // created() {
    //     console.log('this.$refs', this.$refs)
    //     this.$store.commit({ type: 'setYoutubeRef', ref: this.$refs.youtube })
    // }

})

</script>