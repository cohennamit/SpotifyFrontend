<template>
  <section class="header">
    <section class="header-right">
      <section class="header-buttons">
        <button title="Go Back" class="header-nav-btn">&lt;</button>
        <button title="Go Forward" class="header-nav-btn">&gt;</button>
      </section>
      <section>
        <StationFilter v-if="isFilterShown.isFilterShown" @setFilter="setFilter" />
      </section>
    </section>
    <section class="loggedin-user" v-if="loggedInUser">
      <img :src="loggedInUser.imgUrl" />
      <RouterLink :to="`/user/${loggedInUser._id}`">
        {{ loggedInUser.fullname }}
      </RouterLink>
    </section>
    <section v-else>
      <section class="login-btn">
        <RouterLink to="/login">Login</RouterLink>
      </section>
    </section>
  </section>
</template>

<script>
import StationFilter from '../cmps/StationFilter.vue';

export default {
  computed: {
    isFilterShown() {
      return this.$store.getters.isFilterShown;
    },
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  methods: {
    setFilter(filterBy) {
      this.$store.dispatch({ type: 'loadToys', filterBy });
    },
  },
  components: {
    StationFilter,
  },
};
</script>
