import { storageService } from '../services/async-storage.service';
import { stationService } from '../services/station.service';
// import { stationService } from '../services/station.service'

export function getActionRemoveStation(stationId) {
  return {
    type: 'removeStation',
    stationId,
  };
}
export function getActionAddStation(station) {
  return {
    type: 'addStation',
    station,
  };
}
export function getActionUpdateStation(station) {
  return {
    type: 'updateStation',
    station,
  };
}
export function getActionAddStationMsg(stationId) {
  return {
    type: 'addStationMsg',
    stationId,
    txt: 'Stam txt',
  };
}

export const stationStore = {
  state: {
    stations: [],
    isFilterShown: false,
    scrollTop: 0,
    currentRoute: '',
    // labels: stationService.getLabels(),
    filterBy: {
      labels: '',
      sort: 'name',
    },
    labels: stationService.getLabels(),
    // labels: []
  },
  getters: {
    getScrollTop(state) {
      return state.scrollTop;
    },
    stations({ stations }) {
      return stations;
    },
    isFilterShown({ isFilterShown }) {
      return isFilterShown;
    },
    labels({ labels }) {
      return labels;
    },
  },
  mutations: {
    SET_SCROLL_TOP(state, value) {
      state.scrollTop = value;
    },
    setFilterBy(state, { filterBy }) {
      state.filterBy = filterBy;
    },
    toggleFilterShown(state, isFilterShown) {
      state.isFilterShown = isFilterShown;
    },
    setStations(state, { stations }) {
      state.stations = stations;
    },
    addStation(state, { station }) {
      state.stations.push(station);
    },
    updateStation(state, { station }) {
      const idx = state.stations.findIndex((c) => c._id === station._id);
      state.stations.splice(idx, 1, station);
    },
    removeStation(state, { stationId }) {
      // state.stations = state.stations.filter((station) => station._id !== stationId);
      const idx = state.stations.findIndex((station) => station._id === stationId);
      state.stations.splice(idx, 1);
    },
    addStationMsg(state, { stationId, msg }) {
      const station = state.stations.find((station) => station._id === stationId);
      if (!station.msgs) station.msgs = [];
      station.msgs.push(msg);
    },
  },
  actions: {
    setScrollTop({ commit }, value) {
      commit('SET_SCROLL_TOP', value);
    },
    async addStation(context, { newStation }) {
      try {
        newStation = await stationService.save(newStation);
        context.commit(getActionAddStation(newStation));
        return newStation;
      } catch (err) {
        console.log('stationStore: Error in addStation', err);
        throw err;
      }
    },
    async updateStation(context, { station }) {
      try {
        station = await stationService.save(station);
        context.commit(getActionUpdateStation(station));
        return station;
      } catch (err) {
        console.log('stationStore: Error in updateStation', err);
        throw err;
      }
    },
    async loadStations(context, { filterBy }) {
      try {
        const stations = await stationService.query(filterBy);
        context.commit({ type: 'setStations', stations });
      } catch (err) {
        console.log('stationStore: Error in loadStations', err);
        throw err;
      }
    },
    async removeStation(context, { stationId }) {
      try {
        await stationService.remove(stationId);
        context.commit(getActionRemoveStation(stationId));
        // context.dispatch({type:'loadStations', filterBy:context.state.filterBy})
      } catch (err) {
        console.log('stationStore: Error in removeStation', err);
        throw err;
      }
    },
    async addStationMsg(context, { stationId, txt }) {
      try {
        const msg = await stationService.addStationMsg(stationId, txt);
        context.commit({ type: 'addStationMsg', stationId, msg });
      } catch (err) {
        console.log('stationStore: Error in addStationMsg', err);
        throw err;
      }
    },
  },
};
