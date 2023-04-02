// import { storageService } from '../services/async-storage.service';
// import { stationService } from '../services/station.service';
// import { stationService } from '../services/station.service'


export const modalStore = {
    state: {
        isUserOptionsShown: false,
        isStationOptionsShown: false,
        isStationEditShown: false
    },
    getters: {
        isUserOptionsShown({ isUserOptionsShown }) { return isUserOptionsShown },
        isStationOptionsShown({ isStationOptionsShown }) { return isStationOptionsShown },
        isStationEditShown({ isStationEditShown }) { return isStationEditShown },
    },
    mutations: {
        handleUserOptions(state) {
            state.isUserOptionsShown = !state.isUserOptionsShown
        },
        handleStationOptions(state) {
            state.isStationOptionsShown = !state.isStationOptionsShown
        },
        handleStationEdit(state) {
            state.isStationEditShown = !state.isStationEditShown
            console.log(state.isStationEditShown);
        },
        closeUserOptions(state){
            state.isUserOptionsShown = false
        },
        closeStationOptions(state){
            state.isStationOptionsShown = false
        },
        closeStationEdit(state){
            state.isStationEditShown = false
        },
        openStationEdit(state){
            state.isStationEditShown = true
        }

    },

};
