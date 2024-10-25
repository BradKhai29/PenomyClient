<template>
    <q-btn round flat>
        <q-avatar v-if="avatarUrl">
            <img :src="avatarUrl" />
        </q-avatar>
        <q-icon v-else name="account_circle" class="text-dark" size="xl" />
        <TheUserAvatarMenu />
    </q-btn>
</template>

<script setup>
import TheUserAvatarMenu from "components/layouts/MainLayout/headers/TheUserAvatarMenu.vue";
import { useAuthStore } from "src/stores/common/AuthStore";
import { ref, watch } from "vue";

const authStore = useAuthStore();
authStore.setUpAuthStore();
const avatarUrl = ref(authStore.userProfile.avatarUrl);

watch(
    () => authStore.userProfile.avatarUrl,
    () => {
        avatarUrl.value = authStore.userProfile.avatarUrl;
    }
);
</script>
