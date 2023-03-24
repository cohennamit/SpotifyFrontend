export const musicPlayerStore = {
    state: {
        currentSong: {
            imgUrl: 'https://i.ytimg.com/vi/YVkUvmDQ3HY/default.jpg',
            title: 'Without Me',
            videoId: 'YVkUvmDQ3HY',
        },
        currentStation:{}
    },
    getters: {
        currentSong({ currentSong }) { return currentSong }
    },
    mutations: {
        setCurrentSong(state, { song }) {
            state.currentSong = (song) ? { ...song } : null
        },
        setCurrentStation(state, { station }) {
            state.currentStation = (station) ? { ...station } : null
        }
    },
    actions: {
        setSong({ commit }, { song }) {
            commit({ type: 'setCurrentSong', song })
            return song
        },
        setStation({ commit }, { station }){
            commit({ type: 'setCurrentStation', station })
            return station
        }
    }
}