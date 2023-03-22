<template>
    <section class="main-nav">
        <h1 class="logo">Logo</h1>
        <section class="nav">
            <RouterLink to="/station">Home</RouterLink>
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
export default {
    name: '',
    data() {
        return {

        }
    },
    methods: {

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