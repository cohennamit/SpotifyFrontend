import { storageService } from './async-storage.service.js'
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
  getLabels,
}
window.cs = stationService

async function query(filterBy = { txt: '', listencount: 0 }) {
  var stations = await storageService.query(STORAGE_KEY)
  return _filterStations(filterBy,stations)
 
}
function _filterStations(filterBy,stations){
  // const {labels,txt,listencount} = filterBy
  let filteredStations
  //Filter By Txt
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    stations = stations.filter(
      (station) => regex.test(station.title) || regex.test(station.description)
    )
  }
  //Filter By Listen Count
  if (filterBy.listencount) {
    stations = stations.filter((station) => station.listencount <= filterBy.listencount)
  }
   // Filter By Labels
  if (filterBy.labels.length) {
    filterBy.labels.map((lab) => {
      return (filteredStations = filteredStations.filter((station) => station.labels.includes(lab)))
    })
  }
  return stations
}
function getById(stationId) {
  return storageService.get(STORAGE_KEY, stationId)
 }

async function remove(stationId) {
  await storageService.remove(STORAGE_KEY, stationId)
}

async function save(station) {
  var savedStation
  if (station._id) {
    savedStation = await storageService.put(STORAGE_KEY, station)
  } else {
    // Later, owner is set by the backend
    station.owner = userService.getLoggedinUser()
    savedStation = await storageService.post(STORAGE_KEY, station)
  }
  return savedStation
}

async function addStationMsg(stationId, txt) {
  // Later, this is all done by the backend
  const station = await getById(stationId)
  if (!station.msgs) station.msgs = []

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  }
  station.msgs.push(msg)
  await storageService.put(STORAGE_KEY, station)

  return msg
}

function getEmptyStation() {
  return {
    title: 'Susita-' + (Date.now() % 1000),
    listencount: utilService.getRandomIntInclusive(1000, 9000),
  }
}

(async () => {
  await storageService.post(STORAGE_KEY, {
    title: 'Michael Jackson',
    listencount: 420,
    label: [
      'Pop',
      'Dance/Electronic',

    ],
    imgUrl: 'https://source.unsplash.com/random/?cats&4',
    createdAt: Date.now(),
  })
  await storageService.post(STORAGE_KEY, {
    title: 'Shakira',
    listencount: 21,
    labels: [
      'Pop'
    ],
    imgUrl: 'https://source.unsplash.com/random/?cats&4',
    createdAt: Date.now(),
  })
  await storageService.post(STORAGE_KEY, {
    title: 'Biggy',
    listencount: 221,
    labels: [
      'Rap'
    ],
    imgUrl: 'https://source.unsplash.com/random/?cats&4',
    createdAt: Date.now(),
  })
  await storageService.post(STORAGE_KEY, {
    title: 'Flock of seagulls',
    listencount: 2221,
    createdAt: Date.now(),
    imgUrl: 'https://source.unsplash.com/random/?cats&4',
  })
})()

// TEST DATA
//  (async () => {
//     await storageService.post(STORAGE_KEY, { title: 'Michael Jackson', listencount: 420 })
//     await storageService.post(STORAGE_KEY, { title: 'Shakira', listencount: 21 })
// })()

function getLabels() {
  return [
    {
      name: 'Pop',
      imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679477156/Spotify/Pop_uaqlpr.jpg',
    },
    {
      name: 'Mood Booster',
      imgUrl:'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679477174/Spotify/moodbooster_esxfs6.jpg',
    },
    {
      name: 'Latino',
      imgUrl:'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679477166/Spotify/latino_najwkb.jpg',
    },
    {
      name: 'Rock',
      imgUrl:'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679477163/Spotify/Rock_cdizyt.jpg',
    },
    {
      name: 'Rap',
      imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679476992/Spotify/Rap_q7jmtn.jpg',
    },
    {
      name: 'K-Pop',
      imgUrl:'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679478366/Spotify/K-Pop_lfh88n.jpg',
    },
    {
      name:'Dance/Electronic',
      imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679491299/Spotify/DanceElectroincs_b5sonr.jpg'
    }
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
  ]
}