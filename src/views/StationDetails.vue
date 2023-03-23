<template>
    <section class="station-details">
        <StationHeader :station="station" />
        <!-- <SongList> </SongList> -->
    </section>
    <article class="station-details-body">
        <div @click="toggleStationOptions" class="icon" v-html="getSvg('playlistOptions')"></div>
        <ul v-if="isOptionsShown">
            <li v-if="station.isAddedByUser" @click="onEditStation">Edit</li>
            <li v-if="station.isAddedByUser" @click="onRemoveStation">Delete</li>
        </ul>
    </article>
</template>

<script>
//TODO: LINE 2-4 CHANGE IMG TO BE CHOSEN BY USER & CONNECT USER LINE 9
import { stationService } from '../services/station.service.local.js'
import { svgService } from '../services/svg.service.js'
import  StationHeader  from '../cmps/StationHeader.vue'
export default {
    name: '',
    data() {
        return {
            station: {},
            isOptionsShown: false
        }
    },
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        toggleStationOptions() {
            this.isOptionsShown = !this.isOptionsShown
        },
        onRemoveStation(){
            this.$store.dispatch({type:'removeStation', stationId: this.station._id})
            this.$router.push('/station')
        }
    },
    computed: {

    },
    async created() {
        const { stationId } = this.$route.params;
        // console.log('create',stationId)
        try {
            const station = await stationService.getById(stationId);
            this.station = station;
        } catch (error) {
            console.log('Error fetching station: ', error);
        }
    },
    components: {
        StationHeader,
    },

}
</script>

