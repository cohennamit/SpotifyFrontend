import { userService } from '../services/user.service.js'
import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from '../services/socket.service'
import { stationService } from '../services/station.service.js'
// var localLoggedinUser = null
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user || null)

export const userStore = {
    state: {
        loggedinUser: null,
        users: [],
        watchedUser: null,
        userStations: null
    },
    getters: {
        userStations({userStations}){return userStations},
        users({ users }) { return users },
        loggedinUser({ loggedinUser }) { return loggedinUser },
        watchedUser({ watchedUser }) { return watchedUser }
    },
    mutations: {
        setLoggedinUser(state, { user }) {
            console.log('user from setloggedinuser', user)
            // Yaron: needed this workaround as for score not reactive from birth
            state.loggedinUser = (user) ? { ...user } : null
        },
        setWatchedUser(state, { user }) {
            state.watchedUser = user
        },
        setUsers(state, { users }) {
            state.users = users
        },
        // setUser(state, { user }) {
        //     state.logg = users
        // },
        removeUser(state, { userId }) {
            state.users = state.users.filter(user => user._id !== userId)
        },
        setUserScore(state, { score }) {
            state.loggedinUser.score = score
        },
        addLikedSong(state, { song }) {
            console.log('state.loggedinUser', state.loggedinUser)
            state.loggedinUser.likedSongs.push(song)
        },
        removeLikedSong(state, { song }) {
            console.log('state.loggedinUser', state.loggedinUser)
            const likedSongs = state.loggedinUser.likedSongs
            const index = likedSongs.findIndex((s => s._id === song._id))
            state.loggedinUser.likedSongs.splice(index, 1)
        },
        setUserStations(state,{userStations}){
            state.userStations = userStations
        },
        removeUserStation(state, { userStationId }) {
            // state.stations = state.stations.filter((station) => station._id !== stationId);
            const idx = state.userStations.findIndex((userStation) => userStation._id === userStationId);
            if(idx < 0) return
            state.userStations.splice(idx, 1);
          },
          addUserStation(state,{addedStation}){
                state.userStations.push(addedStation);
          }
    },
    actions: {
        async setUserStations({commit,state}){
          try {
            const userStations = await stationService.getUserStations(state.loggedinUser._id);
            commit({type:'setUserStations', userStations})
          } catch (err) {
            console.log('Failed to get loggedinUser stations');
          }
          },
        async login({ commit }, { userCred }) {
            try {
                const user = await userService.login(userCred)
                commit({ type: 'setLoggedinUser', user })
                return user
            } catch (err) {
                console.log('userStore: Error in login', err)
                throw err
            }
        },
        async signup({ commit }, { userCred }) {
            try {
                const user = await userService.signup(userCred)
                commit({ type: 'setLoggedinUser', user })
                return user
            } catch (err) {
                console.log('userStore: Error in signup', err)
                throw err
            }

        },
        async logout({ commit }) {
            try {
                await userService.logout()
                commit({ type: 'setLoggedinUser', user: null })
            } catch (err) {
                console.log('userStore: Error in logout', err)
                throw err
            }
        },
        async loadUsers({ commit }) {
            // TODO: loading
            try {
                const users = await userService.getUsers()
                commit({ type: 'setUsers', users })
            } catch (err) {
                console.log('userStore: Error in loadUsers', err)
                throw err
            }
        },
        async loadAndWatchUser({ commit }, { userId }) {
            try {
                const user = await userService.getById(userId)
                commit({ type: 'setWatchedUser', user })

            } catch (err) {
                console.log('userStore: Error in loadAndWatchUser', err)
                throw err
            }
        },
        async removeUser({ commit }, { userId }) {
            try {
                await userService.remove(userId)
                commit({ type: 'removeUser', userId })
            } catch (err) {
                console.log('userStore: Error in removeUser', err)
                throw err
            }
        },
        async updateUser({ commit }, { user }) {
            try {
                console.log('user', user)
                await userService.update(user)
                console.log('user', user)
                commit({ type: 'setLoggedinUser', user })
            } catch (err) {
                console.log('userStore: Error in updateUser', err)
                throw err
            }

        },
        async increaseScore({ commit }) {
            try {
                const score = await userService.changeScore(100)
                commit({ type: 'setUserScore', score })
            } catch (err) {
                console.log('userStore: Error in increaseScore', err)
                throw err
            }
        },
        async addLikedSong({ state, commit, dispatch }, { song }) {
            try {

                console.log('state.loggedinUser', state.loggedinUser)
                commit({ type: 'addLikedSong', song })
                console.log('state.loggedinUser', state.loggedinUser)
                dispatch({ type: 'updateUser', user: { ...state.loggedinUser } })
            } catch (err) {
                console.log('userStore: Had a problem liking a song', err);
                throw err
            }
        },
        async removeLikedSong({ state, commit, dispatch }, { song }) {
            try {
                commit({ type: 'removeLikedSong', song })
                console.log('state.loggedinUser', state.loggedinUser)
                dispatch({ type: 'updateUser', user: { ...state.loggedinUser } })
            } catch (err) {
                console.log('userStore: Had a problem liking a song', err);
                throw err
            }
        },
        // Keep this action for compatability with a common user.service ReactJS/VueJS
        setWatchedUser({ commit }, payload) {
            commit(payload)
        },

    }
}