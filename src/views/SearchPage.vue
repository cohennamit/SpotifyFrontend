<template>
    <h1>SEARCH PAGE</h1>
    <section>
        <article class="genre-list">
            <a class="label-container" v-for="label in labels">
                <img :src="label.imgUrl" alt="">
                <span>
                    {{ label.name }}
                </span>
            </a>
        </article>
    </section>
</template>

<script>
export default {
    name: 'Search',
    data() {
        return {
            labels: [
                {
                    name: 'Pop',
                    imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679477156/Spotify/Pop_uaqlpr.jpg'
                },
                {
                    name: 'Mood Booster',
                    imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679477174/Spotify/moodbooster_esxfs6.jpg'
                },
                {
                    name: 'Latino',
                    imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679477166/Spotify/latino_najwkb.jpg'
                },
                {
                    name: 'Rock',
                    imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679477163/Spotify/Rock_cdizyt.jpg'
                },
                {
                    name: 'Rap',
                    imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679476992/Spotify/Rap_q7jmtn.jpg'
                },
                {
                    name: 'K-Pop',
                    imgUrl: 'https://res.cloudinary.com/dmmsf57ko/image/upload/v1679478366/Spotify/K-Pop_lfh88n.jpg'
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
    },
    methods: {

    },
    computed: {

    },
    created() {

    },
    components: {

    },
}
</script>

<style></style>