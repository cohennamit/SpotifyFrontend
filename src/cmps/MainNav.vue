<template>
    <section class="main-nav">
        <h1 class="logo">Logo</h1>
        <section class="nav">

            <RouterLink to="/station">
                <div class="icon" v-html="getSvg('home')"></div> Home
            </RouterLink>

            <RouterLink to="/search">
                <div class="icon" v-html="getSvg('search')"></div> Search
            </RouterLink>

            <RouterLink to="/test">
                <div class="icon" v-html="getSvg('library')"></div> Your Library
            </RouterLink>
        </section>
        <section class="actions">
            <button class="create-playlist-btn">Create Playlist</button>
            <RouterLink to="/test">Liked Songs</RouterLink>
        </section>
        <hr />
        <section class="user-playlists">
            <section class="playlist-links">
                <RouterLink to="/test">My Playlist #1</RouterLink>
                <RouterLink to="/test">My Playlist #2</RouterLink>
                <RouterLink to="/test">My Playlist #3</RouterLink>
                <RouterLink to="/test">My Playlist #4</RouterLink>
            </section>
        </section>

        <button class="install-btn">
            <div class="icon" v-html="getSvg('install')"></div> Install App
        </button>
    </section>
</template>

<script>
import { svgService } from '../services/svg.service.js';
export default {
    name: '',
    data() {
        return {

        }
    },
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        }
    },
    computed: {

    },
    created() {

    },
    components: {

    },
}
</script>

<style></style>