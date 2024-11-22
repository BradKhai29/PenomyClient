<template>
    <DrawerLink
        title="Trang cá nhân"
        icon="person"
        :link="profileLink"
        :isSelected="isSelected"
    />
</template>

<script>
// Import dependencies section.
import { UserProfile1RouteNames } from "src/router/userProfile/UserProfile1PageRoute";
import { useUserProfileStore } from "src/stores/common/UserProfileStore";

// Import components section.
import DrawerLink from "components/layouts/DrawerLink.vue";

// Init store for later operation.
const userProfileStore = useUserProfileStore();

export default {
    name: "PersonalProfileLink",
    components: {
        DrawerLink,
    },
    computed: {
        isSelected() {
            return String(this.$route.path).includes("/user");
        },
        profileLink() {
            return `/user/${userProfileStore.currentUserId}`;
        },
    },
};
</script>
