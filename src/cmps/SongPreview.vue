<template>
    <div class="song-preview-main" @mouseover="isHover = true" @mouseleave="isHover = false">

        <div v-html="isHover ? getSvg('playSong') : index + 1" :class="playSongClass" @click="setSong"></div>
        <!-- <span v-if="isHover">5</span> -->
        <div class="song-preview-content">
            <div class="song-preview-img">
                <img :src="song.imgUrl" />
            </div>

            <div class="song-preview-name">
                <span>
                    {{ shortenedTitle(song.title) }}
                </span>
                <span>
                    {{ song.artist }}
                </span>
            </div>

        </div>
        <!-- <p>{{ song.album }}</p> -->
        <p>DEMO ALBUM</p>
        <p>{{ addedAtDiff }}</p>
        <div class="song-preview-preferences">
            <div :class="togglePrefClass" class="icon" v-html="getSvg('heart')"></div>
            <span>3:14</span>
            <div :class="togglePrefClass" @click="removeSong" class="icon" v-html="getSvg('trash')"></div>
        </div>
    </div>
</template>

<script>
import { svgService } from '../services/svg.service.js'
export default {
    name: 'Song Preview',
    props: {
        song: {
            type: Object
        },
        station: {
            type: Object
        },
        index: {
            type: Number,
        }
    },
    created() {
    },
    data() {
        return {
            isHover: false
        }
    },
    methods: {
        removeSong() {
            console.log('preview', this.song._id)
            this.$emit('removeSong', this.song._id)
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        setSong() {
            this.$store.dispatch({ type: 'setSong', song: this.song })
            this.$store.dispatch({ type: 'setStation', station: this.station })
        }
    },
    computed: {
        togglePrefClass() {
            return this.isHover ? 'pref-visible' : ' pref-hidden'
        },
        songAddedAt() {
            let date = this.song.addedAt.getSeconds()
            // var seconds = new Date().getTime() / 1000 
            //    const seconds =  date.getTime() / 1000
            return date
        },
        playSongClass() {
            return this.isHover ? 'song-preview-play-btn' : ''
        },
        shortenedTitle() {
            const maxLength = 30
            return function (title) {
                return title.length > maxLength ? title.slice(0, maxLength) + '...' : title
            }
        },
        addedAtDiff() {
            const addedAt = this.song.addedAt
            const now = Date.now()
            const diff = now - addedAt
            if (diff < 60 * 1000) { // less than 1 minute
                return `${Math.floor(diff / 1000)} seconds ago`
            } else if (diff < 60 * 60 * 1000) { // less than 1 hour
                return `${Math.floor(diff / (60 * 1000))} minutes ago`
            } else if (diff < 24 * 60 * 60 * 1000) { // less than 1 day
                return `${Math.floor(diff / (60 * 60 * 1000))} hours ago`
            } else { // 1 day or more
                return `${Math.floor(diff / (24 * 60 * 60 * 1000))} days ago`
            }
        }
    }
}
</script>
