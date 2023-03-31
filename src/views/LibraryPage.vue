    <template>
    <ul class="station-list library">
        <Routerlink to="/liked" class="liked-songs">
            Liked Songs
        </Routerlink>
        <StationPreview v-if="stations" v-for="station in stations" :key="station._id" :station="station" />
    </ul>
</template>

<script>
import StationPreview from '../cmps/StationPreview.vue';
import { stationService } from '../services/station.service';

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
            if (this.stations) {
                return this.stations.filter(station => station.isAddedByUser)
            }
        },
        loggedinUser() {
            return this.$store.getters.loggedinUser
        }
    },
    async created() {
        try {
            this.stations = await stationService.getUserStations(this.loggedinUser._id)
            console.log(this.stations)
        } catch (err) {
            console.log('Failed to get loggedinUser stations')
        }
    },
    components: {
        StationPreview
    },
}
</script>

<style></style>