<template>
<section class="edit-modal">
    <div class="edit-modal-header">
        <h1>Edit details</h1>
        <button  @click="onCloseEditModal">X</button>
    </div>
    <div v-if="isNameInputEmpty" class="edit-modal-require-err">

    </div>
    <div class="edit-modal-body">
        <div class="edit-modal-img">
            <img :src="station.imgUrl"/>
        </div>
        <textarea class="edit-modal-body-textarea" placeholder="add an optional description" cols="20" rows="10"></textarea>
        <input v-model="station.title" placeholder="Add a name" class="edit-modal-body-input" type="text">
        <button @click="saveStation">Save</button>
        <p>
            By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.
        </p>
    </div>
        
</section>
</template>

<script>
//TODO:Add Description edit option
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
    isNameInputEmpty: false
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

