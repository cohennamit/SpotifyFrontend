<template>
  <section class="modal-wrapper">
    <section class="edit-modal">
      <div class="edit-modal-header">
        <h1>Edit details</h1>
        <button class="edit-modal-header-exit-btn" @click="onCloseEditModal">
          <div class="x-icon" v-html="getSvg('x')"></div>
        </button>
      </div>
      <div v-if="isNameInputEmpty" class="edit-modal-require-err">
        <div class="icon" v-html="getSvg('exclMark')"></div>
        <p>Playlist name is required.</p>
      </div>
      <div class="edit-modal-body">
        <div class="edit-modal-img">
          <article class="choose-photo">
            <div class="pencil-icon" v-html="getSvg('pencil')"></div>
            <span>Choose Photo</span>
            <ImgUploader @updateImgUrl="updateImgUrl" />
          </article>

          <div class="img-container">
            <img
              v-if="station.imgUrl"
              ref="image"
              :src="station.imgUrl"
              alt=""
              crossorigin="anonymous"
            />
            <img
              v-else
              src="https://res.cloudinary.com/dmmsf57ko/image/upload/v1679567005/Spotify/WhatsApp_Image_2023-03-23_at_12.22.38_jexkcy.jpg"
            />
          </div>
        </div>
        <textarea
          v-model="stationUserDesc"
          class="edit-modal-body-textarea"
          placeholder="Add an optional description"
          cols="20"
          rows="10"
        ></textarea>
        <input
          v-model="stationTitle"
          placeholder="Add a name"
          :class="{ err: isNameInputEmpty }"
          class="edit-modal-body-input"
          type="text"
        />
        <button class="edit-modal-body-save-btn" @click="saveStation">Save</button>
      </div>
    </section>
  </section>
</template>

<script>
//TODO:Add Description edit option
import { svgService } from '../services/svg.service.js';

import ImgUploader from './ImgUploader.vue';

export default {
  name: 'Modal',
  props: {
    station: {
      type: Object,
      // required: true
    },
  },
  emits: ['onCloseEditModal', 'updateImgUrl'],
  data() {
    return {
      // isNameInputEmpty: false,

      stationTitle: this.station.title,
      stationUserDesc: this.station.userDesc,
    };
  },
  mounted() {
    const image = this.$refs.image;
    // const fac = new FastAverageColor();
    image.addEventListener('load', () => {
      const color = fac.getColor(image, { algorithm: 'dominant' });
      // console.log(color);
    });
  },
  unmounted() {
    const image = this.$refs.image;
    // image.removeEventListener('load');
  },
  methods: {
    onCloseEditModal(event) {
      this.$emit('onCloseEditModal');
    },
    saveStation() {
      if (!this.stationTitle) return;
      this.station.title = this.stationTitle;
      this.station.userDesc = this.stationUserDesc;
      this.$store.dispatch({ type: 'updateStation', station: this.station });
      this.onCloseEditModal();
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    updateImgUrl(imgUrl) {
      this.$emit('updateImgUrl', imgUrl);
    },
  },
  computed: {
    isNameInputEmpty() {
      if (!this.stationTitle) return true;
      else return false;
    },
  },
  components: {
    ImgUploader,
  },
};
</script>
