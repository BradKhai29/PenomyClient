<template>
    <DrawerLink
        title="Lịch sử xem"
        icon="history"
        :link="viewHistoryLink"
        :isSelected="isSelected"
    />
</template>

<script>
// Import dependencies section.
import { useAuthStore } from "src/stores/common/AuthStore";
import { useUserProfileStore } from "src/stores/common/UserProfileStore";

// Import component section.
import DrawerLink from "components/layouts/DrawerLink.vue";

// Init store for later operation.
const authStore = useAuthStore();
const userProfileStore = useUserProfileStore();

export default {
    name: "ViewHistoryLink",
    components: {
        DrawerLink,
    },
    computed: {
        viewHistoryLink() {
            if (authStore.isAuth) {
                return `/user/${userProfileStore.currentUserId}?tab=history`;
            }

            return "/guest/history";
        },
        isSelected() {
            return String(this.$route.path).includes("history");
        },
    },
};
</script>
