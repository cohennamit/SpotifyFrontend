<template>
  <section class="user-details" v-if="user">
    <h1>{{ user.fullname }}'s Profile</h1>
    <img style="max-width: 200px; border-radius: 50%;" :src="user.imgUrl" />
    <h3>Nickname - {{ user.username }}</h3>

    <button class="logout-btn" @click="doLogout">Logout</button>

  </section>
</template>
<script>

export default {

  watch: {
    userId: {
      handler() {
        if (this.userId) {
          this.$store.dispatch({ type: "loadAndWatchUser", userId: this.userId })
        }
      },
      immediate: true,
    },
  },
  computed: {
    user() {
      return this.$store.getters.watchedUser
    },
    userId() {
      return this.$route.params.id
    },
    isMe() {
      return this.userId === this.$store.getters.loggedinUser._id
    },
  },
  methods: {
    doLogout() {
      this.$store.dispatch({ type: 'logout' });
      this.$router.push('/');
    },
  }
}
</script>