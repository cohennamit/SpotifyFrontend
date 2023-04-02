import Vuex from 'vuex'

import { userStore } from './user.store.js'
import { stationStore } from './station.store.js'
import { musicPlayerStore } from './music-player.store.js'
import {modalStore} from './modal.store.js'

export const store = Vuex.createStore({
  strict: true,
  modules: {
    userStore,
    stationStore,
    musicPlayerStore,
    modalStore
  },

})
