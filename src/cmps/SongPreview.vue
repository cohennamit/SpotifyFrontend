<template>
    <article :class="getClass" class="song-preview-main" @click="handleClick" @mouseover="isHover = true"
        @mouseleave="isHover = false">


        <div v-html="playSvg" :class="playSongClass" @click="setSong"></div>
        <!-- <span v-if="isHover">5</span> -->
        <div class="song-preview-content">

            <div class="song-preview-img">
                <img :src="song.imgUrl" />
            </div>

            <div class="song-preview-name">
                <span class="song-preview-name-title">
                    {{ shortenedTitle(song.title) }}
                </span>
                <span :class="getClass">
                    artist
                    <!-- {{ song.artist }} -->
                </span>
            </div>

        </div>
        <!-- <p>{{ song.album }}</p> -->
        <div class="column-3" :class="getClass">DEMO ALBUM</div>

        <div>{{ addedAtDiff }}</div>
        <!-- <span v-else class="placeholder"></span> -->
        <div class="column-5">
            <div>3:14</div>
            <div v-if="isHover" class="song-preview-preferences">
                <span :class="getClass" class="heart-icon" v-html="getSvg('heart')"></span>
                <span :class="getClass" @click="removeSong" class="trash-icon" v-html="getSvg('trash')"></span>
            </div>
        </div>
    </article>
</template>

<script>
import { svgService } from '../services/svg.service.js'
export default {
    name: 'Song Preview',
    emits: ['removeSong'],
    props: {
        song: {
            type: Object
        },
        station: {
            type: Object
        },
        index: {
            type: Number,
        },
        activeSongIdx: {
            type: Number
        }
    },
    created() {
    },
    data() {
        return {
            isHover: false,
            isActive: false
            // currActivePreviewIdx:null,
            // prevActivePreviewIdx: null,
            // hoverSongIdx:null
        }
    },
    methods: {
        handleBlur() {
            console.log('ok')
        },
        removeSong() {
            this.$emit('removeSong', this.song._id)
        },
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        setSong() {
            this.$store.dispatch({ type: 'setSong', song: this.song })
            this.$store.dispatch({ type: 'setStation', station: this.station })
        },
        handleClick() {
            this.$emit('setActiveSong', this.index)
        }
    },
    computed: {
        getClass() {
            return {
                'hover': this.isHover || this.isActive,
                'active': this.activeSongIdx === this.index
            }
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
        },
        playSvg() {
            
            if (this.isHover || this.activeSongIdx === this.index) return this.getSvg('playSong')
            else return this.index + 1
        }
    }
}
</script>
