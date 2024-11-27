<template>
    <q-page v-if="!invalidId && !isLoading">
        <ProfileCard
            :creatorId="creatorId"
            :creatorProfile="loadedCreatorProfile"
            :isProfileOwner="isProfileOwner"
        />
    </q-page>
</template>

<script>
// Import dependencies section.
import { useAuthStore } from "src/stores/common/AuthStore";
import { useUserProfileStore } from "src/stores/common/UserProfileStore";
import { UserProfileResponseDto } from "src/api.models/userProfile/userProfile1Page/UserProfileResponseDto";

// Import components section.
import ProfileCard from "src/components/pages/creatorStudio/creatorStudio1Page/ProfileCard.vue";

// Init store for later operation.
const authStore = useAuthStore();
const userProfileStore = useUserProfileStore();

export default {
    name: "CreatorProfile1Page",
    components: {
        ProfileCard,
    },
    data() {
        return {
            isLoading: true,
            creatorId: null,
            /**
             * @type {UserProfileResponseDto} The type of this data property.
             */
            loadedCreatorProfile: null,
        };
    },
    computed: {
        /**
         * Check if the current user that visit this page is
         * the owner of this profile or not.
         */
        isProfileOwner() {
            return (
                // Check if the current user is already signed-in
                // and the userId is similar to the route param.
                authStore.isAuth &&
                this.creatorId == userProfileStore.currentUserId
            );
        },
    },
    beforeMount() {
        // Get the id from the route params to fetch data.
        this.creatorId = userProfileStore.currentUserId;
    },
    mounted() {
        this.waitToLoadOwnerProfile();
    },
    methods: {
        /**
         * Wait for the api to load the current user profile
         * (also the owner of this profile).
         */
        async waitToLoadOwnerProfile() {
            await userProfileStore.waitToLoadOwnerProfile();

            this.loadedCreatorProfile = userProfileStore.userProfile;
            this.isLoading = false;
        },
    },
};
</script>

<style scoped>
</style>
