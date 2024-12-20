<template>
    <q-page v-if="!invalidId && !isLoading">
        <CreatorProfileCard
            :creatorId="creatorId"
            :creatorProfile="loadedCreatorProfile"
            :isProfileOwner="isProfileOwner"
        />

        <CreatorArtworkSection
            :isProfileOwner="isProfileOwner"
            :creatorId="creatorId"
        />
    </q-page>
</template>

<script>
// Import dependencies section.
import { useAuthStore } from "src/stores/common/AuthStore";
import { useUserProfileStore } from "src/stores/common/UserProfileStore";
import { NumberHelper } from "src/helpers/NumberHelper";
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { UserProfileResponseDto } from "src/api.models/userProfile/userProfile1Page/UserProfileResponseDto";
import { CreatorProfileApiHandler } from "src/api.handlers/creatorProfile/CreatorProfileApiHandler";

// Import components section.
import CreatorProfileCard from "src/components/common/creatorProfile/CreatorProfileCard.vue";
import CreatorArtworkSection from "src/components/pages/creatorProfile/CreatorArtworkSection.vue";

// Init store for later operation.
const authStore = useAuthStore();
const userProfileStore = useUserProfileStore();

export default {
    name: "CreatorProfile1Page",
    components: {
        CreatorProfileCard,
        CreatorArtworkSection,
    },
    data() {
        return {
            isLoading: true,
            invalidId: true,
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
        this.creatorId = String(this.$route.params.creatorId);

        this.invalidId = !NumberHelper.isNumber(this.creatorId);

        if (this.invalidId) {
            // Redirect back to homepage when getting invalid id.
            this.$router.push("/");

            NotificationHelper.notifyError("Id người dùng không hợp lệ");
            return;
        }
    },
    mounted() {
        if (this.invalidId) {
            return;
        }

        // If the current user is also the profile owner, then wait to load.
        if (this.isProfileOwner) {
            this.waitToLoadOwnerProfile();

            return;
        }

        // Otherwise, load the specified creator profile by input creatorId.
        this.waitToLoadCreatorProfile();
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
        /**
         * Wait for the api to load the profile of specified creator.
         */
        async waitToLoadCreatorProfile() {
            const result = await CreatorProfileApiHandler.getProfileAsync(
                this.creatorId
            );

            // If the result is null, then redirect user
            // to homepage when the profile is not found.
            if (!result) {
                NotificationHelper.notifyError("Không tìm thấy nhà sáng tạo");

                this.$router.push("/");
                return;
            }

            // If not null, then display the result.
            this.loadedCreatorProfile = result;
            this.isLoading = false;
        },
    },
};
</script>
