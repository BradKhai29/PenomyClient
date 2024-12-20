<template>
    <q-page v-if="!invalidId">
        <UserProfileCard :userId="userId" />

        <UserPreferenceSection v-if="isProfileOwner" :userId="userId" />

        <EmptyStatePlaceholder v-else />
    </q-page>
</template>

<script>
// Import dependencies section.
import { useAuthStore } from "src/stores/common/AuthStore";
import { useUserProfileStore } from "src/stores/common/UserProfileStore";
import { NumberHelper } from "src/helpers/NumberHelper";
import { NotificationHelper } from "src/helpers/NotificationHelper";

// Import components section.
import UserProfileCard from "src/components/common/userProfile/UserProfileCard.vue";
import EmptyStatePlaceholder from "src/components/common/userProfile/EmptyStatePlaceholder.vue";
import UserPreferenceSection from "src/components/pages/userProfile/userProfile1Page/UserPreferenceSection.vue";

// Init store for later operation.
const authStore = useAuthStore();
const userProfileStore = useUserProfileStore();

export default {
    name: "UserProfile1Page",
    components: {
        UserProfileCard,
        EmptyStatePlaceholder,
        UserPreferenceSection,
    },
    data() {
        return {
            invalidId: true,
            userId: null,
        };
    },
    beforeMount() {
        // Get the id from the route params to fetch data.
        this.userId = String(this.$route.params.userId);

        this.invalidId = !NumberHelper.isNumber(this.userId);

        if (this.invalidId) {
            // Redirect back to homepage when getting invalid id.
            this.$router.push("/");

            NotificationHelper.notifyError("Id người dùng không hợp lệ");
            return;
        }
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
                this.userId == userProfileStore.currentUserId
            );
        },
    },
};
</script>
