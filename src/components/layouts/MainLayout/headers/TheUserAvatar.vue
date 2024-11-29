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
import { useGuestStore } from "src/stores/common/GuestStore";
import { useUserProfileStore } from "src/stores/common/UserProfileStore";

// Init store for later operation.
const authStore = useAuthStore();
const guestStore = useGuestStore();
const userProfileStore = useUserProfileStore();

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
        await authStore.setUp();

        // If the current user is not authenticated,
        // then setup for them the guest store.
        if (!authStore.isAuth) {
            await guestStore.setUp();
        }

        await userProfileStore.setUp(
            authStore.isAuth,
            authStore.accessToken(),
            authStore.currentUserId
        );

        this.isLoading = false;
    },
};
</script>
