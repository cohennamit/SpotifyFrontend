<template>
<section
 class="song-list">
 <SongPreview
    v-for="(song,index) in station.songs"
    :song="song"
    :index="index"       
     />
</section>
</template>

<script>    
import SongPreview from './SongPreview.vue'
export default {
name: 'Song List',
props:{
    station:{
        type: Object
    }
},
data() {
return {

}
},
methods: {

},
computed: {

},
created() {

},
components: {
SongPreview
},
}
</script>

