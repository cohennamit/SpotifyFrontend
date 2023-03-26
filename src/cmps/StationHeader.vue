<template>
    <header class="station-details-header">
        <div class="demo-img">
            <img :src="station.imgUrl" />
        </div>
        <div>
            <span>Playlist</span>
            <h1 class="station-details-header-title" @click="onOpenEditModal">{{ station.title }}</h1>
            <span v-if="station.desc" v-for="(d, idx) in station.desc" :key="idx" class="station-preview-desc">{{ d }} <span v-if="idx < 3">{{
                ',' }} {{ '&nbsp;' }} </span>
            </span>
            <p v-else  @click="onOpenEditModal">{{ station.userDesc }}</p>
            <RouterLink to="/login">by user</RouterLink>
        </div>
    </header>
    <Modal @onCloseEditModal="onCloseEditModal" v-if="isEdit" :station="station" />
</template>

<script>
import Modal from './Modal.vue';
export default {
    name: 'Station Header',
    props: {
        station: {
            type: Object,
            // required: true
        }
    },
    emits: ['onCloseEditModal'],
    data() {
        return {
            isEdit: false
        }
    },
    methods: {
        onOpenEditModal() {
            //TODO : CHECK IF ADDED BY USER AND IF NOT REMOVE CURSOR
            if (!this.station.isAddedByUser) return
            this.isEdit = true
        },
        onCloseEditModal() {
            this.isEdit = false
        }
    },
    computed: {

    },
    created() {
    },
    components: {
        Modal,
    },
}
</script>

