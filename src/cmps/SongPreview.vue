<template>
    <article :class="getClass" class="song-preview-main" @click="handleClick" @mouseover="isHover = true"
        @mouseleave="isHover = false">
        <div v-html="getSvg('playSong')" class="play-song-icon" @click="setSong"></div>
        <!-- <span v-if="isHover">5</span> -->
        <div class="song-preview-content">

            <div class="song-preview-img">
                <img :src="song.imgUrl" />
            </div>

            <div class="song-preview-name">
                <span class="song-preview-name-title">
                    {{ shortenedTitle(songTitle) }}
                </span>
                <span :class="getClass">
                    {{ songArtist }}
                </span>
            </div>

        </div>
        <!-- <p>{{ song.album }}</p> -->
        <div class="column-3" :class="getClass">{{ song.album }}</div>

        <div>{{ songAddedAt }}</div>
        <div class="column-5">
            <div>{{ song.duration }}</div>
            <div class="song-preview-preferences">
                <span :class="getClass" class="heart-icon" v-html="getSvg('heart')"></span>
                <span :class="getClass" @click="removeSong" class="trash-icon" v-html="getSvg('trash')"></span>
            </div>
        </div>
    </article>
</template>

<script>
import { eventBus } from '../services/event-bus.service'
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
            if (this.isHover || this.activeSongIdx === this.index) return svgService.getSvg(iconName)
            else if (iconName === 'playSong') return this.index + 1
        },
        setSong() {
            this.$store.dispatch({ type: 'setSong', song: this.song })
            this.$store.dispatch({ type: 'setStation', station: this.station })
            eventBus.emit('onTogglePlay')
        },
        handleClick() {
            this.$emit('setActiveSong', this.index)
        },
        // async songAlbum() {
        //     try {
        //         const response = await fetch(
        //             `https://api.deezer.com/search?q=without me`
        //         )
        //         const {data} = response.json
        //         console.log(response)
        //     } catch (err) {
        //         console.log('cant find song', err)
        //     }
        // }
    },
    computed: {
        getClass() {
            return {
                'hover': this.isHover || this.isActive,
                'active': this.activeSongIdx === this.index
            }
        },
        shortenedTitle() {
            const maxLength = 30
            return function (title) {
                return title.length > maxLength ? title.slice(0, maxLength) + '...' : title
            }
        },
        songAddedAt() {
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

        songTitle() {
            // const pattern = /(.+)\s-\s(.+)(?:\s\[[^\]]*\])?\s\(/;
            const pattern = /^(.+?)\s*[-–]\s*(.+?)(?:\s+\[(.+?)\])?$/i;


            const matches = pattern.exec(this.song.title);
            if (matches) {
                const songTitle = matches[2]
                console.log(songTitle)
                // verification second round
                const regex = /^(.+)\s+\(.+\)$/;
                const match = songTitle.match(regex);
                if (match) {
                    return match[1].trim();
                }
                return songTitle
            } else {
                return this.song.title
            }
        },
        songArtist() {
            const pattern = /^(.+?)\s*[-–]\s*(.+?)(?:\s+\[(.+?)\])?$/i;
            const matches = pattern.exec(this.song.title);
            if (matches) {
                const songArtist = matches[1]
                return songArtist
            }
        },


    }
}
</script>
