<template>
  <section class="station-preview">
    <img v-if="station.imgUrl" :src="station.imgUrl" />
    <p>{{ station.title }}</p>
    <!-- <p>Listen Count : {{ station.listencount?.toLocaleString() }}</p> -->
    <!-- <button @click="removeStation(station._id)">x</button>
    <button @click="updateStation(station)">Update</button>
    <hr />
    <button @click="addStationMsg(station._id)">Add station msg</button>
    <button @click="printStationToConsole(station)">Print msgs to console</button> -->
  </section>
</template>

<script>
import {
  getActionRemoveStation,
  getActionUpdateStation,
  getActionAddStationMsg,
} from '../store/station.store';
export default {
  name: '',
  props: {
    station: Object,
  },
  data() {
    return {};
  },
  methods: {
    async removeStation(stationId) {
      try {
        await this.$store.dispatch(getActionRemoveStation(stationId));
        showSuccessMsg('Station removed');
      } catch (err) {
        console.log(err);
        showErrorMsg('Cannot remove station');
      }
    },
    async updateStation(station) {
      try {
        station = { ...station };
        station.listencount = +prompt('New listencount?', station.listencount);
        await this.$store.dispatch(getActionUpdateStation(station));
        showSuccessMsg('Station updated');
      } catch (err) {
        console.log(err);
        showErrorMsg('Cannot update station');
      }
    },
    async addStationMsg(stationId) {
      try {
        await this.$store.dispatch(getActionAddStationMsg(stationId));
        showSuccessMsg('Station msg added');
      } catch (err) {
        console.log(err);
        showErrorMsg('Cannot add station msg');
      }
    },
    printStationToConsole(station) {
      console.log('Station msgs:', station.msgs);
    },
  },
  computed: {},
  created() {},
  components: {},
};
</script>

<style></style>
