
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'station'

export const stationService = {
    query,
    getById,
    save,
    remove,
    getEmptyStation,
    addStationMsg,
    getEmptySong,
    getLabels
}
window.cs = stationService


async function query(filterBy = { txt: '', listencount: 0 }) {
    return httpService.get(STORAGE_KEY, filterBy)

    // var stations = await storageService.query(STORAGE_KEY)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     stations = stations.filter(station => regex.test(station.title) || regex.test(station.description))
    // }
    // if (filterBy.listencount) {
    //     stations = stations.filter(station => station.listencount <= filterBy.listencount)
    // }
    // return stations

}
function getById(stationId) {
    // return storageService.get(STORAGE_KEY, stationId)
    return httpService.get(`station/${stationId}`)
}

async function remove(stationId) {
    // await storageService.remove(STORAGE_KEY, stationId)
    return httpService.delete(`station/${stationId}`)
}
async function save(station) {
    var savedStation
    if (station._id) {
        console.log('station', station)
        // savedStation = await storageService.put(STORAGE_KEY, station)
        savedStation = await httpService.put(`station/${station._id}`, station)

    } else {
        // Later, owner is set by the backend
        station.owner = userService.getLoggedinUser()
        // savedStation = await storageService.post(STORAGE_KEY, station)
        savedStation = await httpService.post('station', station)
    }
    return savedStation
}

async function addStationMsg(stationId, txt) {
    const savedMsg = await httpService.post(`station/${stationId}/msg`, { txt })
    return savedMsg
}


function getEmptyStation() {
    return {
        //TODO: ADD COUNTER
        title: `My Playlist #`,
        userDesc: '',
        imgUrl:
            'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679567005/Spotify/WhatsApp_Image_2023-03-23_at_12.22.38_jexkcy.jpg',
        songs: [],
        isAddedByUser: true,
    }
}

function getEmptySong() {
    return {
        title: '',
        _id: utilService.makeId(6),
        album: '',
        artist: '',
        videoId: '',
        imgUrl: '',
        addedBy: '',
        duration: 0,
        addedAt: Date.now(),
    };
}

function getLabels() {
    return [
        {
            name: 'Pop',
            imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679477156/Spotify/Pop_uaqlpr.jpg',
        },
        {
            name: 'Mood-Booster',
            imgUrl:
                'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679477174/Spotify/moodbooster_esxfs6.jpg',
        },
        {
            name: 'Latino',
            imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679477166/Spotify/latino_najwkb.jpg',
        },
        {
            name: 'Rock',
            imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679477163/Spotify/Rock_cdizyt.jpg',
        },
        {
            name: 'Rap',
            imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679476992/Spotify/Rap_q7jmtn.jpg',
        },
        {
            name: 'K-Pop',
            imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679478366/Spotify/K-Pop_lfh88n.jpg',
        },
        {
            name: 'Dance/Electronic',
            imgUrl:
                'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679491299/Spotify/DanceElectroincs_b5sonr.jpg',
        },
        {
            name: 'Sleep',
            imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679830075/sleep_xdzs9m.jpg',
        },
        {
            name: 'R&B',
            imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679830075/R_B_drd8gk.jpg',
        },
        {
            name: 'Anime',
            imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679830071/anime_he2bov.jpg',
        },
        {
            name: 'Focus',
            imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679830071/focus_w1fi2z.jpg',
        },
        {
            name: 'Stress Relief',
            imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679830071/stress-relief_cjozfy.jpg',
        },
        {
            name: 'Jazz',
            imgUrl: '',
        },
        // 'Hip-Hop',
        // 'Rock',
        // 'Latin',
        // 'Charts',
        // 'Dance/Electronic',

        // 'Indie',
        // 'Workout',
        // 'Country',
        // 'R&B',
        // 'Chill',
        // 'Party',
        // 'Love',
        // 'Metal',
        // 'Jazz',
        // 'Anime',
        // 'Gaming',
        // 'Folk & Acoustic',
        // 'Soul',
        // 'Instrumental',
        // 'Summer',
        // 'Fresh Finds'
    ];
}






