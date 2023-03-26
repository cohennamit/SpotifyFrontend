<template>
    <section class="song-search-preview">

        <div class="song-search-preview-img-title-wrap">

            <div class="img-wrap">
                <img :src="video.snippet.thumbnails.default.url" alt="" />
            </div>

            <div>
                <h3>{{ shortenedTitle(video.snippet.title) }}</h3>
                <h6>Artist</h6>
            </div>

        </div>

        <p class="song-search-preview-album">
            DEMO ALBUM
        </p>

        <div >
            <button class="song-search-preview-add-btn" @click="addSong(video)">Add</button>
        </div>

        <iframe hidden width="60" height="15" :src="'https://www.youtube.com/embed/' + video.id.videoId" frameborder="0"
            allowfullscreen></iframe>
    </section>
</template>

<script>
import { stationService } from '../services/station.service.local.js';
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

        }
    },
    methods: {
        addSong(video) {
            const song = stationService.getEmptySong();
            const { snippet, id } = { ...video };
            song.title = snippet.title;
            song.videoId = id.videoId;
            song.imgUrl = snippet.thumbnails.default.url;
            this.$emit('addSong', song);
        }
    },
    computed: {
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