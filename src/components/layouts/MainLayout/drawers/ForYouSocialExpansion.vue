<template>
    <q-expansion-item
        default-opened
        label="Dành cho bạn"
        class="for-you-expansion"
    >
        <PersonalProfileSocialLink v-if="isAuth" />
        <saved-post-link v-if="isAuth" />
    </q-expansion-item>
</template>

<script>
// Import dependencies section.
import { useAuthStore } from "src/stores/common/AuthStore";

// Import components section.
import PersonalProfileSocialLink from "./PersonalProfileSocialLink.vue";
import SavedPostLink from "./SavedPostLink.vue";

// Init store for later operation.
const authStore = useAuthStore();

export default {
    name: "ForYouExpansion",
    components: {
        PersonalProfileSocialLink,
        SavedPostLink
    },
    computed: {
        isAuth() {
            return authStore.isAuth;
        },
    },
};
</script>

<style scoped>
.for-you-expansion {
    border-radius: 4px;
    background-color: #f9fafc !important;
    font-weight: bold !important;
}
</style>
