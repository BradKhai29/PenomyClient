<template>
    <q-btn round flat>
        <q-avatar v-if="avatarUrl" class="shadow-1">
            <img :src="avatarUrl" />
        </q-avatar>
        <q-icon v-else name="account_circle" class="text-dark" size="xl" />
        <TheUserAvatarMenu />
    </q-btn>
</template>

<script setup>
import TheUserAvatarMenu from "components/layouts/MainLayout/headers/TheUserAvatarMenu.vue";
import { useAuthStore } from "src/stores/common/AuthStore";
import { onBeforeMount, provide, ref, watch } from "vue";
import { useProfileStore } from "src/stores/pages/userProfile/ProfileStore";

const profileStore = useProfileStore();
const authStore = useAuthStore();
const avatarUrl = ref(authStore.userProfile.avatarUrl);
const props = defineProps({
    atCreatorStudio: {
        type: Boolean,
        default: false,
    },
});

// Set up the auth store for the before mount hook.
onBeforeMount(() => {
    authStore.setUpAuthStore();
    profileStore.setupProfileStore();
    provide("isAtCreatorStudio", props.atCreatorStudio);
});

watch(
    () => authStore.userProfile.avatarUrl,
    () => {
        avatarUrl.value = authStore.userProfile.avatarUrl;
    }
);
</script>
