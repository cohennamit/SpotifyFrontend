<template>
<section class="edit-modal">
    <button @click="onCloseEditModal">X</button>
    <h2>Edit details</h2>
    <div>
        <input v-model="station.title"  type="text">
        <div class="edit-modal-img">
            <img :src="station.imgUrl"/>
        </div>
    </div>
    <button @click="saveStation">Save</button>
    <p>
        By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.
    </p>
        
</section>
</template>

<script>
//TODO:Add Description edit option
import {
  getActionRemoveStation,
  getActionUpdateStation,
  getActionAddStationMsg,
  getActionAddStation,
} from '../store/station.store.js';
export default {
name: 'Modal',
props:{
    station:{
        type: Object,
        // required: true
    }
},
data() {
return {

}
},
methods: {
onCloseEditModal(){
    this.$emit('onCloseEditModal')
},
saveStation(){
this.$store.dispatch({type:'updateStation', station: this.station})
this.onCloseEditModal()
}
}
}
</script>

