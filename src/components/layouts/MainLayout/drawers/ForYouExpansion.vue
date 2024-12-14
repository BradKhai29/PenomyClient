<template>
    <q-expansion-item default-opened label="Dành cho bạn" class="for-you-expansion">
        <PersonalProfileLink v-if="isAuth" />
    </q-expansion-item>
</template>

<script>
// Import dependencies section.
import { useAuthStore } from "src/stores/common/AuthStore";

// Import components section.
import PersonalProfileLink from "./PersonalProfileLink.vue";

// Init store for later operation.
const authStore = useAuthStore();

export default {
    name: "ForYouExpansion",
    components: {
        PersonalProfileLink,
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
