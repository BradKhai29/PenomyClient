<template>
    <q-page v-if="!invalidId">
        <UserProfileCard :userId="userId" />

        <section v-if="isProfileOwner" id="user-preference-section">
            Hello
        </section>

        <section v-else>
            <div class="border-sm-bottom-light-500 q-mt-sm q-mb-xl"></div>
            <div class="flex justify-center text-dark-500">
                <div class="column items-center">
                    <q-icon name="outbox" size="120px"></q-icon>
                    <span class="text-subtitle1">
                        Người dùng này không có nội dùng nào
                    </span>
                </div>
            </div>
        </section>
    </q-page>
</template>

<script>
// Import dependencies section.
import { useAuthStore } from "src/stores/common/AuthStore";
import { useUserProfileStore } from "src/stores/common/UserProfileStore";
import { NumberHelper } from "src/helpers/NumberHelper";
import { NotificationHelper } from "src/helpers/NotificationHelper";

// Import components section.
import UserProfileCard from "src/components/pages/userProfile/userProfile1Page/UserProfileCard.vue";

// Init store for later operation.
const authStore = useAuthStore();
const userProfileStore = useUserProfileStore();

export default {
    name: "UserProfile1Page",
    components: {
        UserProfileCard,
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
