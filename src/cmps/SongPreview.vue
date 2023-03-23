<template>
    <div class="song-preview">
        <span>{{ index + 1 }}</span>
        <div>
            <div class="song-preview-img">
                <img :src="song.imgUrl" />
            </div>

            <div class="song-preview-name">
                <span>
                    {{ song.title }}
                </span>
                <span>
                    {{ song.artist }}
                </span>
            </div>

        </div>
        <p>{{ song.album }}</p>
        <p>15 seconds Ago</p>
    </div>
</template>

<script>
export default {
    name: 'Song Preview',
    props: {
        song: {
            type: Object
        },
        index: {
            type: String,
            required: true
        }
    },
    data() {
        return {
        }
    },
    methods: {

    },
    computed: {
        songAddedAt(){
            let date = this.song.addedAt.getSeconds()
            // var seconds = new Date().getTime() / 1000 ;
        //    const seconds =  date.getTime() / 1000
           return date
        }
    },
    created() {

    },
    components: {

    },
}
</script>
