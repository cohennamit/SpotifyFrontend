export const musicPlayerStore = {
    state: {
        currentSong: {
            // imgUrl: 'https://i.ytimg.com/vi/Zi_XLOBDo_Y/default.jpg',
            // title: 'Billie Jean',
            // videoId: 'Zi_XLOBDo_Y',
        },
        currentStation: {},
        isPlaying: false,
        youtubeRef: null,
    },
    getters: {
        currentSong({ currentSong }) { return currentSong },
    },
    mutations: {
        setCurrentSong(state, { song }) {
            state.currentSong = (song) ? { ...song } : null
            console.log('state.currentSong', state.currentSong)
        },
        pauseResume(state) {
            this.isPlaying = !this.isPlaying
            // if (this.isPlaying) this.$refs.youtube.playVideo()
            if (this.isPlaying) state.youtubeRef.playVideo()
            // else this.$refs.youtube.pauseVideo()
            else state.youtubeRef.pauseVideo()
        },
        //TODO: COMBINE NEXT AND PREV FUNCTIONS
        setNextSong(state) {
            if (!state.currentSong) return
            const currentSongIdx = state.currentStation.songs.findIndex(song => song._id === state.currentSong._id)
            const nextSong = state.currentStation.songs[currentSongIdx + 1]
            if (currentSongIdx + 1 > state.currentStation.songs.length - 1) return
            state.currentSong = { ...nextSong }

        },
        setPrevSong(state) {
            if (!state.currentSong) return
            const currentSongIdx = state.currentStation.songs.findIndex(song => song._id === state.currentSong._id)
            const prevSong = state.currentStation.songs[currentSongIdx - 1]
            if (currentSongIdx - 1 < 0) return
            state.currentSong = { ...prevSong }
        },
        setCurrentStation(state, { station }) {
            state.currentStation = (station) ? { ...station } : null
        },
        setYoutubeRef(state, { ref }) {
            console.log('ref', ref)
            state.youtubeRef = ref
        }
    },
    actions: {
        setSong({ commit }, { song }) {
            commit({ type: 'setCurrentSong', song })
            return song
        },
        setNextSong({ commit }) {
            commit({ type: 'setNextSong' })
        },
        setPrevSong({ commit }) {
            commit({ type: 'setPrevSong' })
        },
        setStation({ commit }, { station }) {
            commit({ type: 'setCurrentStation', station })
            return station
        }
    }
}