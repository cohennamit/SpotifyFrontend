<template>
    <section class="footer">
        <section class="footer-btns">
            <button class="footer-btn">Shuffle</button>
            <button class="footer-btn">Prev</button>
            <button @click="onPauseResume" class="footer-btn">{{ pauseStatus }}</button>
            <button class="footer-btn">Next</button>
            <button class="footer-btn">Repeat</button>
        </section>
        <input class="footer-volume" type="range" min="0" max="1" step="0.1" value="1" id="volume-slider">
    </section>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            pauseStatus: 'Resume'
        }
    },
    methods: {
        onPauseResume() {
            if (this.pauseStatus === 'Resume') this.pauseStatus = 'Pause'
            else this.pauseStatus = 'Resume'
        }

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