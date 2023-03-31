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
            stations: null,
        }
    },
    methods: {

    },
    computed: {
          labeledStations(){
            const filteredStations = stations.filter((station) => station.label.includes(this.label));
            console.log(filteredStations)
            return filteredStations
          }
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
            const stations = await stationService.query()
            this.stations=stations
            // const filteredStations =  stations.filter((station) => !station.isAddedByUser &&
            //  station.label.some((label) => this.label.includes(label)));
            // console.log(filteredStations)
            // const labeledStations = filteredStations.filter(station=> station.label.includes(this.label))
            // console.log(labeledStations)
            // this.labeledStations = labeledStations
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