import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';
import { userService } from './user.service.js';

const STORAGE_KEY = 'station';

export const stationService = {
  query,
  getById,
  save,
  remove,
  getEmptyStation,
  getEmptySong,
  addStationMsg,
  getLabels,
};
window.cs = stationService;
//TODO: ADD FILTER BY OWNER AS PARAMETER
async function query(filterBy = { txt: '', listencount: 0 }) {
  var stations = await storageService.query(STORAGE_KEY);
  return stations;
  // return _filterStations(filterBy,stations)
}
function _filterStations(filterBy, stations) {
  console.log('stations: ', stations);
  // const {labels,txt,listencount} = filterBy
  let filteredStations;
  //Filter By Txt
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i');
    stations = stations.filter(
      (station) => regex.test(station.title) || regex.test(station.description)
    );
  }
  //Filter By Listen Count
  if (filterBy.listencount) {
    stations = stations.filter((station) => station.listencount <= filterBy.listencount);
  }
  // Filter By Labels
  if (filterBy.labels.length) {
    filterBy.labels.map((lab) => {
      return (filteredStations = filteredStations.filter((station) => station.labels.includes(lab)));
    });
  }
  return stations;
}
function getById(stationId) {
  return storageService.get(STORAGE_KEY, stationId);
}

async function remove(stationId) {
  await storageService.remove(STORAGE_KEY, stationId);
}

async function save(station) {
  var savedStation;
  if (station._id) {
    savedStation = await storageService.put(STORAGE_KEY, station);
  } else {
    // Later, owner is set by the backend
    station.owner = userService.getLoggedinUser();
    savedStation = await storageService.post(STORAGE_KEY, station);
  }
  return savedStation;
}

async function addStationMsg(stationId, txt) {
  // Later, this is all done by the backend
  const station = await getById(stationId);
  if (!station.msgs) station.msgs = [];

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  };
  station.msgs.push(msg);
  await storageService.put(STORAGE_KEY, station);

  return msg;
}

function getEmptyStation() {
  //TODO: ADD COUNTER
  return {
    title: `My Playlist #`,
    userDesc: '',
    imgUrl:
      'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679567005/Spotify/WhatsApp_Image_2023-03-23_at_12.22.38_jexkcy.jpg',
    songs: [],
    isAddedByUser: true,
  };
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
    addedAt: Date.now(),
  };
}

// (async () => {
//   await storageService.post(STORAGE_KEY, {
//     title: 'Jericho Jackson Mix',
//     desc: ['Large Professor', 'Lord Finesse', 'Khrysis', 'And more'],
//     listencount: 420,
//     label: ['Pop', 'Dance/Electronic'],
//     imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679550705/1_qrmwde.jpg',
//     createdAt: Date.now(),
//     songs: [
//       {
//         id: 's1003',
//         title: 'To Do List',
//         album: 'To Do List',
//         artist: 'Jericho Jackson',
//         url: 'youtube/song.mp4',
//         imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679822071/40_b5npst.jpg',
//         addedBy: '{minimal-user}',
//         addedAt: new Date(),
//       },
//       {
//         id: 's1004',
//         title: 'Machine & McQueens ',
//         album: 'Food For Thought',
//         artist: 'Jericho Jackson',
//         url: 'youtube/song.mp4',
//         imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679822075/41_nvcplo.jpg',
//         addedBy: {},
//         addedAt: new Date(),
//       },
//       {
//         id: 's1005',
//         title: 'Self Made',

//         album: 'To Do List',
//         artist: 'Jericho Jackson',
//         url: 'youtube/song.mp4',
//         imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679822071/40_b5npst.jpg',
//         addedBy: '{minimal-user}',
//         addedAt: new Date(),
//       },
//       {
//         id: 's1006',
//         title: 'Overthinking',

//         album: 'To Do List',
//         artist: 'Jericho Jackson',
//         url: 'youtube/song.mp4',
//         imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679822071/40_b5npst.jpg',
//         addedBy: '{minimal-user}',
//         addedAt: new Date(),
//       },
//       {
//         id: 's1007',
//         title: 'Breguets',

//         album: 'To Do List',
//         artist: 'Jericho Jackson',
//         url: 'youtube/song.mp4',
//         imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679822071/40_b5npst.jpg',
//         addedBy: '{minimal-user}',
//         addedAt: new Date(),
//       },
//       {
//         id: 's1008',
//         title: 'City by Sea',

//         album: 'City by Sea',
//         artist: 'Jericho Jackson',
//         url: 'youtube/song.mp4',
//         imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679822537/42_j30vad.jpg',
//         addedBy: '{minimal-user}',
//         addedAt: new Date(),
//       },
//       {
//         id: 's1010',
//         title: 'In My Life',

//         album: 'In My Life',
//         artist: 'Jericho Jackson',
//         url: 'youtube/song.mp4',
//         imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679822668/43_e2woap.jpg',
//         addedBy: '{minimal-user}',
//         addedAt: new Date(),
//       },
//     ],
//   });
//   await storageService.post(STORAGE_KEY, {
//     title: 'Dave Pad Mix',
//     desc: ['Dave Pad', 'IO (Mulen)', 'Microlab', 'And more'],

//     listencount: 21,
//     labels: ['Pop'],
//     imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679550705/2_fqlkiv.jpg',
//     createdAt: Date.now(),
//     songs: [],
//   });
//   await storageService.post(STORAGE_KEY, {
//     title: 'Chill Mix',
//     desc: ['The Alchemist', 'Boldy James', 'Peet', 'And more'],

//     listencount: 221,
//     labels: ['Rap'],
//     imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679550705/3_ftip11.jpg',
//     createdAt: Date.now(),
//     songs: [],
//   });
//   await storageService.post(STORAGE_KEY, {
//     title: 'Happy Mix',
//     desc: ['Harry Styles', 'Ed Sheeran', 'Niall Horan', 'And more'],
//     listencount: 2221,
//     songs: [
//       {
//         id: 's1001',
//         title: 'Music For a Sushi Restaurant',

//         album: "Harry's House",
//         artist: 'Harry Styles',
//         url: 'youtube/song.mp4',
//         imgUrl:
//           'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679589348/Spotify/Spotify%20Thumb/harry-styles-finger_raaj6h.jpg',
//         addedBy: '{minimal-user}',
//         addedAt: new Date(),
//       },
//       {
//         id: 'mUkfiLjooxs',
//         title: 'Pass The Peas',
//         album: 'Food For Thought',
//         artist: "The JB's",
//         url: 'youtube/song.mp4',
//         imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679823769/44_jefegb.jpg',
//         addedBy: {},
//         addedAt: new Date(),
//       },
//     ],
//     imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679550705/4_zqassb.jpg',
//     createdAt: Date.now(),
//     songs: [],
//   });
//   await storageService.post(STORAGE_KEY, {
//     title: '2010s Mix',
//     desc: ['Markus Homm', 'The Alchemist', 'Frink', 'And more'],

//     listencount: 420,
//     label: ['Pop', 'Dance/Electronic'],
//     imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679550705/5_zgkvqb.jpg',
//     createdAt: Date.now(),
//   });
//   await storageService.post(STORAGE_KEY, {
//     title: '2000s Mix',
//     desc: ['Large Professor', 'Thomas Fehlmann', 'Ja Rule', 'And more'],
//     listencount: 21,
//     labels: ['Pop'],
//     imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679550705/6_yroxz0.jpg',
//     createdAt: Date.now(),
//     songs: [],
//   });
//   await storageService.post(STORAGE_KEY, {
//     title: 'Daily Mix 1',
//     desc: ['Boldy James', 'O.C.', 'Skyzoo', 'And more'],
//     listencount: 221,
//     labels: ['Rap'],
//     imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679550706/7_kdyhn9.jpg',
//     createdAt: Date.now(),
//     songs: [],
//   });
//   await storageService.post(STORAGE_KEY, {
//     title: 'Daily Mix 2',
//     desc: ['IO (Mulen)', 'Till Von Sein', 'Mihai Popoviciu', 'And more'],
//     listencount: 2221,
//     createdAt: Date.now(),
//     imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679550706/8_hzvmqn.jpg',
//     songs: [],
//   });
//   await storageService.post(STORAGE_KEY, {
//     title: 'Daily Mix 3',
//     desc: ['Ross from Friends', 'Kerala Dust', 'Sebb Junior', 'And more'],
//     listencount: 420,
//     label: ['Pop', 'Dance/Electronic'],
//     imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679550706/9_w355qd.jpg',
//     createdAt: Date.now(),
//     songs: [],
//   });
//   await storageService.post(STORAGE_KEY, {
//     title: 'Daily Mix 4',
//     listencount: 21,
//     labels: ['Pop'],
//     imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679550706/10_tpus35.jpg',
//     createdAt: Date.now(),
//     songs: [],
//   });
//   await storageService.post(STORAGE_KEY, {
//     title: 'Daily Mix 5',
//     listencount: 221,
//     labels: ['Rap'],
//     imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679550706/11_oqkz3h.jpg',
//     createdAt: Date.now(),
//     songs: [],
//   });
//   await storageService.post(STORAGE_KEY, {
//     title: 'Daily Mix 6',
//     listencount: 2221,
//     createdAt: Date.now(),
//     imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679550706/12_fteet5.jpg',
//     songs: [],
//   });
//   await storageService.post(STORAGE_KEY, {
//     title: 'All the Brilliant Things',
//     listencount: 22221,
//     desc: ['Skyzoo', '2021', '14 songs', '55 min'],
//     songs: [
//       {
//         id: 's10011',
//         title: 'Free Jewelry',

//         album: 'All the Brilliant Things',
//         artist: 'Skyzoo',
//         url: 'youtube/song.mp4',
//         imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679823769/44_jefegb.jpg',
//         addedBy: '{minimal-user}',
//         addedAt: new Date(),
//       },
//       {
//         id: 's10012',
//         title: 'St. James Liquors',
//         album: 'All the Brilliant Things',
//         artist: 'Skyzoo',
//         url: 'youtube/song.mp4',
//         imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679823769/44_jefegb.jpg',
//         addedBy: {},
//         addedAt: new Date(),
//       },
//       {
//         id: 's10013',
//         title: 'St. James Liquors',
//         album: 'All the Brilliant Things',
//         artist: 'Skyzoo',
//         url: 'youtube/song.mp4',
//         imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679823769/44_jefegb.jpg',
//         addedBy: {},
//         addedAt: new Date(),
//       },
//       {
//         id: 's10014',
//         title: 'A Tour of the Neighborhood',
//         album: 'All the Brilliant Things',
//         artist: 'Skyzoo',
//         url: 'youtube/song.mp4',
//         imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679823769/44_jefegb.jpg',
//         addedBy: {},
//         addedAt: new Date(),
//       },
//       {
//         id: 's10015',
//         title: 'Rich Rhetoric',
//         album: 'All the Brilliant Things',
//         artist: 'Skyzoo',
//         url: 'youtube/song.mp4',
//         imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679823769/44_jefegb.jpg',
//         addedBy: {},
//         addedAt: new Date(),
//       },
//       {
//         id: 's10016',
//         title: 'Bodega Flowers',
//         album: 'All the Brilliant Things',
//         artist: 'Skyzoo',
//         url: 'youtube/song.mp4',
//         imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679823769/44_jefegb.jpg',
//         addedBy: {},
//         addedAt: new Date(),
//       },
//       {
//         id: 's10017',
//         title: 'Something to Believe In',
//         album: 'All the Brilliant Things',
//         artist: 'Skyzoo',
//         url: 'youtube/song.mp4',
//         imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679823769/44_jefegb.jpg',
//         addedBy: {},
//         addedAt: new Date(),
//       },
//       {
//         id: 's10018',
//         title: 'Humble Brag',
//         album: 'All the Brilliant Things',
//         artist: 'Skyzoo',
//         url: 'youtube/song.mp4',
//         imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679823769/44_jefegb.jpg',
//         addedBy: {},
//         addedAt: new Date(),
//       },
//       {
//         id: 's10019',
//         title: 'I was Supposed to Be a Trap Rapper',
//         album: 'All the Brilliant Things',
//         artist: 'Skyzoo',
//         url: 'youtube/song.mp4',
//         imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679823769/44_jefegb.jpg',
//         addedBy: {},
//         addedAt: new Date(),
//       },
//       {
//         id: 's10020',
//         title: 'Plugs and Connection',
//         album: 'All the Brilliant Things',
//         artist: 'Skyzoo',
//         url: 'youtube/song.mp4',
//         imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679823769/44_jefegb.jpg',
//         addedBy: {},
//         addedAt: new Date(),
//       },
//       {
//         id: 's10021',
//         title: 'The Scrimmage',
//         album: 'All the Brilliant Things',
//         artist: 'Skyzoo',
//         url: 'youtube/song.mp4',
//         imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679823769/44_jefegb.jpg',
//         addedBy: {},
//         addedAt: new Date(),
//       },
//       {
//         id: 's10022',
//         title: 'Culture-Ish - Sole Food Remix',
//         album: 'All the Brilliant Things',
//         artist: 'Skyzoo',
//         url: 'youtube/song.mp4',
//         imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679823769/44_jefegb.jpg',
//         addedBy: {},
//         addedAt: new Date(),
//       },
//       {
//         id: 's10023',
//         title: 'Bed-Stuy is Burning',
//         album: 'All the Brilliant Things',
//         artist: 'Skyzoo',
//         url: 'youtube/song.mp4',
//         imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679823769/44_jefegb.jpg',
//         addedBy: {},
//         addedAt: new Date(),
//       },
//     ],
//     createdAt: Date.now(),
//     imgUrl: 'https://res.cloudinary.com/dixcbkuih/image/upload/v1679823769/44_jefegb.jpg',
//   });
// })();

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
