
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'station'

export const stationService = {
    getEmptyStation,
    query,
    getById,
    save,
    remove,
    addStationMsg,
    getEmptySong,
    getLabels,
    getUserStations,
    getLabelStations,
}
window.cs = stationService


async function query(filterBy = { owner: '' }) {
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
async function getUserStations(userId) {
    return await query({ owner: userId })
}
async function getLabelStations(labelName) {
    return await query({ label: labelName })
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
        title: 'My Playlist',
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
            imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680508657/Rap_gvt5v2.jpg',
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
            imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680506736/Jazz_iw4fm5.jpg',
        },
        {
            name: 'Metal',
            imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680506726/Metal_w1buqt.jpg',
        },
        {
            name: 'Love',
            imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680506726/Love_bwlqni.jpg',
        },
        {
            name: 'Party',
            imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680506726/Party_ooyycb.jpg',
        },
        {
            name: 'Country',
            imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680506726/Country_dge4yg.jpg',
        },
        {
            name: 'Chill',
            imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680506726/Chille_hsbqrb.jpg',
        },
        {
            name: 'Workout',
            imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680506726/Workout.jps_g8fy8e.jpg',
        },
        {
            name: 'Indie',
            imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680506736/Indie_armukg.jpg',
        },
        {
            name: 'Gaming',
            imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680506726/Gaming_vqkmtl.jpg',
        },
        {
            name: 'Folk & Acoustic',
            imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680506726/Folk_Acoustic_uakdhs.jpg',
        },
        {
            name: 'Soul',
            imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680506726/Soul_ifrei8.jpg',
        },
        {
            name: 'Instrumental',
            imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680506726/Instrumental_e8yilu.jpg',
        },
        {
            name: 'Summer',
            imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680506727/Summer_arx3vn.jpg',
        },
        {
            name: 'Fresh Finds',
            imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680506727/Fresh-Finds_fdtshe.jpg',
        },
        {
            name: 'New releases',
            imgUrl:'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680508657/New-Releases_esi5dj.jpg'
        },
        {
            name: 'Hip-Hop',
            imgUrl:'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679476992/Spotify/Rap_q7jmtn.jpg'
        },
        {
            name: 'At Home',
            imgUrl:'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680508657/At-Home_hy6fix.jpg'
        },
        {
            name: 'Decades',
            imgUrl:'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680508657/Decades_km4zfg.jpg'
        },
        {
            name: 'Wellness',
            imgUrl:'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680508664/Wellness_op6kps.jpg'
        },
        {
            name: 'Trending',
            imgUrl:'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680508663/Trending_hq0xgz.jpg'
        },
        {
            name: 'TV & Movies',
            imgUrl:'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680508663/TV_Movies_hcfma7.jpg'
        },
        {
            name: 'Classical',
            imgUrl:'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680508664/Classical_pmhtq5.jpg'
        },
        {   
            name: 'Kids & Family',
            imgUrl:'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680508664/Kids_Family_zfdzcs.jpg'
        },
        {
            name: 'Punk',
            imgUrl:'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680508664/Punk_ome0im.jpg'
        },
        {
            name: 'Blues',
            imgUrl:'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680508664/Blues_q32smi.jpg'
        },
        {
            name: 'Afro',
            imgUrl:'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680508664/Afro_qom9g5.jpg'
        },
        {
            name: 'Travel',
            imgUrl:'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680508663/Travel_ysfll5.jpg'
        },
        {
            name: 'Tastemaker',
            imgUrl:'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680508663/Tastemaker_qecwsj.png'
        },
        {
            name: 'Caribbean',
            imgUrl:'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680508657/Decades_km4zfg.jpg'
        },
        {
            name: 'Cooking & Dining',
            imgUrl:'https://res.cloudinary.com/dmmsf57ko/image/upload/v1680508663/Cooking_Dining_k6r9jh.jpg'
        },





        
        
        
        
        
        
        
    ];
}






