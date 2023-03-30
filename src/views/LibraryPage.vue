<template>
    <ul class="station-list library">
        <section class="liked-songs">
            Liked Songs
        </section>
        <StationPreview v-if="stations" v-for="station in userStations" :key="station._id" :station="station" />
    </ul>
</template>

<script>
import StationPreview from '../cmps/StationPreview.vue';

export default {
    name: '',
    data() {
        return {
            stations: null
        }
    },
    methods: {

    },
    computed: {
     userStations() {
        if(this.stations){
            return this.stations.filter(station => station.isAddedByUser)
        }
    }
    },
    created() {
       this.stations = this.$store.getters.stations
    },
    components: {
        StationPreview  
    },
}
</script>

<style></style>