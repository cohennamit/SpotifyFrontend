<template>
    <section class="song-search-preview" :class="getClass" @mouseover="isHover = true" @mouseleave="isHover = false">
        <div class="song-search-preview-img-title-wrap">

            <div class="img-wrap">
                <img :src="video.snippet.thumbnails.medium.url" alt="" />
                <!-- <div v-html="getSvg('playSong')" class="play-song-icon" @click="setSong"></div> -->
                <!-- <div v-html="getSvg('playSong')" class="play-song-icon" @click="setSong"></div> -->
            </div>


            <div>
                <h3>{{ shortenedTitle(video.snippet.title) }}</h3>
                <h6 class="song-search-preview-artist" :class="getClass">Artist</h6>
            </div>

        </div>

        <p :class="getClass" class="song-search-preview-album">
            <!-- {{video.album}} -->
        </p>

        <div>
            <button class="song-search-preview-add-btn" @click="addSong(video)">Add</button>
        </div>

        <iframe hidden width="60" height="15" :src="'https://www.youtube.com/embed/' + video.id.videoId" frameborder="0"
            allowfullscreen></iframe>
    </section>
</template>

<script>
import { stationService } from '../services/station.service.js';
export default {
    name: 'Song Search Preview',
    props: {
        video: {
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
        addSong(video) {
            const song = stationService.getEmptySong();
            console.log('video', video)
            const { snippet, id } = { ...video };
            song.title = snippet.title;
            song.videoId = id.videoId;
            song.imgUrl = snippet.thumbnails.medium.url;
            // song.duration = video.contentDetails.duration;
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
        console.log(this.video)
    },
    components: {

    },
}
</script>

<style></style>
