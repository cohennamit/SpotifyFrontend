<template>
    <section class="main-nav">
        <h1 class="logo">Logo</h1>
        <section class="nav">
            <div class="icon" v-html="getSvg('home')"></div>
            <RouterLink to="/station">Home</RouterLink>
            <div class="icon" v-html="getSvg('search')"></div>
            <RouterLink to="/search">Search</RouterLink>
            <RouterLink to="/test">Your Library</RouterLink>
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
        <button class="install-btn">Install App</button>
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