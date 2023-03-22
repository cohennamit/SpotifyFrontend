<template>
  <div class="container home">
    <main class="stations-app">
      <StationList v-if="stations" :stations="stations" />
    </main>
    <form @submit.prevent="addStation()">
      <h2>Add station</h2>
      <input type="text" v-model="stationToAdd.title" />
      <button>Save</button>
    </form>
  </div>
</template>

<script>
import StationList from '../cmps/StationList.vue';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { stationService } from '../services/station.service.local';

export default {
  name: 'StationIndex',
  data() {
    return {
      stationToAdd: stationService.getEmptyStation(),
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
    stations() {
      return this.$store.getters.stations;
    },
  },
  created() {
    this.$store.dispatch({ type: 'loadStations' });
  },
  methods: {
    async addStation() {
      try {
        await this.$store.dispatch({ type: 'addStation', station: this.stationToAdd });
        showSuccessMsg('Station added');
        this.stationToAdd = stationService.getEmptyStation();
      } catch (err) {
        console.log(err);
        showErrorMsg('Cannot add station');
      }
    },
  },
  components: {
    StationList,
  },
};
</script>
