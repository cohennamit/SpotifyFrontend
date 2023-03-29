<template>
  <header class="station-details-header">
    <div class="img-wrapper">
      <!-- <button class="change-img-btn"></button> -->
      <!-- <div class="opacity-placeholder"></div> -->
      <article class="choose-photo">
        <div class="pencil-icon" v-html="getSvg('pencil')"></div>
        <span>Choose Photo</span>
      </article>
      <div class="img-container">
        <ImgUploader @updateImgUrl="updateImgUrl" />
        <img v-if="station.imgUrl" :src="station.imgUrl" alt="" />
        <img
          v-else
          src="https://res.cloudinary.com/dmmsf57ko/image/upload/v1679567005/Spotify/WhatsApp_Image_2023-03-23_at_12.22.38_jexkcy.jpg"
        />
      </div>
    </div>
    <div class="station-details-header-info">
      <span>Playlist</span>
      <h1 class="station-details-header-title" @click="onOpenEditModal">{{ station.title }}</h1>
      <div>
        <span
          v-if="station.desc"
          v-for="(d, idx) in station.desc"
          :key="idx"
          class="station-preview-desc"
          >{{ d }}
          <span v-if="idx < 2">{{ ',' }} {{ '&nbsp;' }} </span>
        </span>
        <p v-else @click="onOpenEditModal">{{ station.userDesc }}</p>
      </div>
      <RouterLink v-if="station.isAddedByUser" to="/login">by user</RouterLink>
    </div>
  </header>
  <Modal
    @updateImgUrl="updateImgUrl"
    @onCloseEditModal="onCloseEditModal"
    v-if="isEdit"
    :station="station"
  />
</template>

<script>
import { svgService } from '../services/svg.service.js';

import ImgUploader from '../cmps/ImgUploader.vue';
import Modal from './Modal.vue';

export default {
  name: 'Station Header',
  props: {
    station: {
      type: Object,
      // required: true
    },
  },
  emits: ['onCloseEditModal', 'updateImgUrl'],
  data() {
    return {
      isEdit: false,
    };
  },
  methods: {
    onOpenEditModal() {
      //TODO : CHECK IF ADDED BY USER AND IF NOT REMOVE CURSOR
      if (!this.station.isAddedByUser) return;
      this.isEdit = true;
    },
    onCloseEditModal() {
      this.isEdit = false;
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    updateImgUrl(imgUrl) {
      if (!imgUrl) return;
      this.$emit('updateImgUrl', imgUrl);
    },
  },
  computed: {},
  created() {},
  components: {
    Modal,
    ImgUploader,
  },
};
</script>
