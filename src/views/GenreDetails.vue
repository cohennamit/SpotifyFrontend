<template>
    <ul class="station-list genre">
        <StationPreview v-if="stations" v-for="station in labeledStations" :key="station._id" :station="station" />
    </ul>
</template>

<script>
import { stationService } from '../services/station.service';
import StationPreview from '../cmps/StationPreview.vue';

export default {
    name: 'Genre Page',
    props: {
    },
    data() {
        return {
            label: '',
            stations: null
        }
    },
    methods: {

    },
    computed: {
        labeledStations() {
            const filteredStations =  this.stations.filter((station) => !station.isAddedByUser);
            // const labeledStations = filteredStations.filter(station=> station.label.includes(this.label))
            console.log(filteredStations)
            return labeledStations
        },
    },
    watch: {
        '$route.params': {
            handler() {
                this.label = this.$route.params.label
            },
            immediate: true,
        },
    },
    async created() {
        try {
            this.stations = await stationService.query()
            console.log(this.stations)
        } catch (err) {
            console.log('Failed to get loggedinUser stations')
        }
    },

    components: {
        StationPreview,
    },

}
</script>

<style></style>