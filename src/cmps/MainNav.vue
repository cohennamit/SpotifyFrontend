<template>
    <section class="main-nav">
        <h1 class="logo">Logo</h1>
        <section class="nav">
            <RouterLink @click="$store.commit({ type: 'toggleFilterShown', isFilterShown: false })" to="/station">
                <div class="icon" v-html="getSvg('home')"></div> Home
            </RouterLink>
            <RouterLink @click="$store.commit({ type: 'toggleFilterShown', isFilterShown: true })" to="/search">
                <div class="icon" v-html="getSvg('search')"></div>
                Search
            </RouterLink>
            <RouterLink to="/">
                <div class="icon" v-html="getSvg('library')"></div>Your Library
            </RouterLink>
        </section>
        <section class="actions">
            <button @click="onCreateStation" class="create-playlist-btn">Create Playlist</button>
            <RouterLink to="/">Liked Songs</RouterLink>
        </section>
        <hr />
        <section class="user-playlists">
            <ul class="playlist-links">
                <RouterLink v-for="userStation in userStations" :to="'/station/'+ userStation._id"> {{ userStation.title }}</RouterLink>
            </ul>
        </section>
        <button class="install-btn">
            <div class="icon" v-html="getSvg('install')"></div> Install App
        </button>
    </section>
</template>

<script>
import { svgService } from '../services/svg.service.js';
import { stationService } from '../services/station.service.local.js'
export default {
    name: '',
    data() {
        return {
        };
    },
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName);
        },
        async onCreateStation() {
            try {
                const newStation = stationService.getEmptyStation()
                const addedStation = await this.$store.dispatch({ type: 'addStation', newStation })
                this.$router.push(`/station/${addedStation._id}`)
            } catch (err) {
                console.log(err, 'Can not add station');
            }
        },
        
    },
    computed: {
        userStations() {
            let stations = this.$store.getters.stations
            const userStations = stations.filter(station => station.isAddedByUser)
            return userStations
        }
    },
    created() {

    },
    components: {},
};
</script>

<style></style>
