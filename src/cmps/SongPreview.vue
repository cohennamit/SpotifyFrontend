<template>
    <article :class="getClass" class="song-preview-main" @click="handleClick" @mouseover="isHover = true"
        @mouseleave="isHover = false">
        <div v-html="getSvg('playSong')" class="play-song-icon" @click="setSong(), setStation()"></div>
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
                <span @click="isLiked ? unlikeSong() : likeSong()" :class="getClass" class="heart-icon">
                    <div v-html="isLiked ? getSvg('heartFull') : getSvg('heart')"></div>
                </span>
                <span :class="getClass" @click="removeSong" class="trash-icon" v-html="getSvg('trash')"></span>
            </div>
        </div>
    </article>
</template>

<script>
import { watch } from 'vue'
import { eventBus } from '../services/event-bus.service'
import { svgService } from '../services/svg.service.js'
import { userService } from '../services/user.service'
export default {
    name: 'Song Preview',
    emits: ['removeSong', 'setSong', 'setStation','setActiveSong'],
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
        console.log('songpreview',this.song)
    },
    data() {
        return {
            isHover: false,
            isActive: false,
        }
    },
    methods: {
        removeSong() {
            this.$emit('removeSong', this.song._id)
        },
        getSvg(iconName) {
            if (this.isHover || this.activeSongIdx === this.index) return svgService.getSvg(iconName)
            else if (iconName === 'playSong') return this.index + 1
        },
        setSong() {
            this.$emit('setSong', this.song)
        },
        setStation() {
            this.$emit('setStation', this.station)
            eventBus.emit('onTogglePlay')
        },
        handleClick() {
            this.$emit('setActiveSong', this.index)
        },
        likeSong() {
            const user = this.$store.getters.loggedinUser
            // const username = this.$store.getters.loggedinUser.username
            // const usersLikedSongs = this.$store.getters.loggedinUser.likedSongs
            // console.log(`${username} liked this song:`, this.song)
            console.log('user', user)
            this.$store.dispatch({ type: 'addLikedSong', song: this.song })
            // console.log(`this is ${username} liked songs: ${usersLikedSongs}`)
        },
        unlikeSong() {
            const user = this.$store.getters.loggedinUser
            console.log('user', user)
            this.$store.dispatch({ type: 'removeLikedSong', song: this.song })
        }
        // async songAlbum() {
        //     try {
        //         const response = await fetch(
        //             `https://api.deezer.com/search?q=without me`
        //         )
        //          const {data} = response.json
        //         console.log(response)
        //     } catch (err) {
        //         console.log('cant find song', err)
        //     }
        // }
    },
    computed: {
        isLiked() {
            const user = this.$store.getters.loggedinUser
            if (!user) return false
            // console.log('user', user)
            const userLikedSongs = user.likedSongs
            // console.log('userSongs', userLikedSongs)
            if (!userLikedSongs.includes(this.song)) return false
            else return true
            // this.$store.dispatch({ type: 'updateUser', user })
            // return false
        },
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
    },
  
}
</script>
