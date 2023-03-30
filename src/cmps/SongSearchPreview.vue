<template>
    <section class="song-search-preview" :class="getClass" @mouseover="isHover = true" @mouseleave="isHover = false">
        <div class="song-search-preview-img-title-wrap">

            <div class="img-wrap">
                <img :src="song.snippet.thumbnails.medium.url" alt="" />
                <!-- <div v-html="getSvg('playSong')" class="play-song-icon" @click="setSong"></div> -->
            </div>


            <div>
                <h3>{{ shortenedTitle(song.snippet.title) }}</h3>
                <h6 class="song-search-preview-artist" :class="getClass">Artist</h6>
            </div>

        </div>

        <p :class="getClass" class="song-search-preview-album">
            <!-- {{song.album}} -->
        </p>

        <div>
            <button class="song-search-preview-add-btn" @click="addSong">Add</button>
        </div>

        <iframe hidden width="60" height="15" :src="'https://www.youtube.com/embed/' + song.id.songId" frameborder="0"
            allowfullscreen></iframe>
    </section>
</template>

<script>
import { stationService } from '../services/station.service.js';
export default {
    name: 'Song Search Preview',
    props: {
        song: {
            type: Object
        }
    },
    emits: ['addSong'],
    data() {
        return {
            isHover: false
        }
    },
    methods: {
        addSong() {
            const song = stationService.getEmptySong();
            const { snippet, id } = { ...this.song };
            song.title = snippet.title;
            song.songId = id.songId;
            song.imgUrl = snippet.thumbnails.medium.url;
            // song.duration = song.contentDetails.duration;
            this.$emit('addSong', song);
        }
    },
    computed: {
        getClass() {
            return {
                'hover': this.isHover
            }
        },
        shortenedTitle() {
            const maxLength = 30
            return function (title) {
                return title.length > maxLength ? title.slice(0, maxLength) + '...' : title
            }
        },
    },
    created() {
    },
    components: {

    },
}
</script>

<style></style>
