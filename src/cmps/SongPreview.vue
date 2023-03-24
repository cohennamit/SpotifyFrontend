<template>
    <div class="song-preview" @mouseover="isHover = true" @mouseleave="isHover = false">

        <div v-html="isHover ? getSvg('playSong') : index + 1" :class="playSongClass" @click="setSong"></div>
        <!-- <span v-if="isHover">5</span> -->
        <div>
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
        <p>{{ song.album }}</p>
        <p>15 seconds Ago</p>
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
        station:{
            type: Object
        },
        index: {
            type: Number,
        }
    },
    data() {
        return {
            isHover: false
        }
    },
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        setSong() {
            this.$store.dispatch({ type: 'setSong', song: this.song })
            this.$store.dispatch({ type: 'setStation', song: this.station })
        }
    },
    computed: {
        songAddedAt() {
            let date = this.song.addedAt.getSeconds()
            // var seconds = new Date().getTime() / 1000 ;
            //    const seconds =  date.getTime() / 1000
            return date
        },
        playSongClass() {
            return this.isHover ? 'song-preview-play-btn' : ''
        },
        shortenedTitle() {
            const maxLength = 30;
            return function (title) {
            return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
            }
        },
    }
}
</script>
