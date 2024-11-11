<template>
    <q-btn round flat :loading="isLoading" :disable="isLoading">
        <q-avatar v-if="isAuth" class="shadow-1">
            <img :src="avatarUrl" />
        </q-avatar>
        <q-icon v-else name="account_circle" class="text-dark" size="xl" />
        <TheUserAvatarMenu :atCreatorStudio="atCreatorStudio" />
    </q-btn>
</template>

<script>
import TheUserAvatarMenu from "components/layouts/MainLayout/headers/TheUserAvatarMenu.vue";
import { useAuthStore } from "src/stores/common/AuthStore";
import { useUserProfileStore } from "src/stores/common/UserProfileStore";
import { useProfileStore } from "src/stores/pages/userProfile/ProfileStore";

// Init store for later operation.
const authStore = useAuthStore();
const userProfileStore = useUserProfileStore();
const profileStore = useProfileStore();
profileStore.setupProfileStore();
userProfileStore.setUp();

export default {
    name: "TheUserAvatar",
    components: {
        TheUserAvatarMenu,
    },
    props: {
        atCreatorStudio: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isLoading: true,
        };
    },
    computed: {
        isAuth() {
            return authStore.isAuth;
        },
        avatarUrl() {
            return userProfileStore.currentAvatarUrl;
        },
    },
    async mounted() {
        await authStore.setUpAuthStore();
        userProfileStore.setUp();

        this.isLoading = false;
        // profileStore.setupProfileStore();
    },
};
</script>
