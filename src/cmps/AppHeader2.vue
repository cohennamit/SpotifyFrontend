<template>
    <section class="header">
        <section class="header-right">

            <section class="header-buttons">
                <button title="Go Back" class="header-nav-btn">&lt;</button>
                <button title="Go Forward" class="header-nav-btn">&gt;</button>
            </section>
            <section>
                <input class="search-input" type="text" name="search" id="search-input"
                    placeholder="What do you want to listen to?">
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
export default {
    computed: {
        loggedInUser() {
            return this.$store.getters.loggedinUser;
        },
    },
};
</script>