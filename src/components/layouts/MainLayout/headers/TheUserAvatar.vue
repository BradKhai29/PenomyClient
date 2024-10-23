<template>
    <q-btn round flat>
        <q-avatar>
            <img :src="avatarUrl" />
        </q-avatar>
        <TheUserAvatarMenu />
    </q-btn>
</template>

<script setup>
import TheUserAvatarMenu from "components/layouts/MainLayout/headers/TheUserAvatarMenu.vue";
import { useAuthStore } from "src/stores/common/AuthStore";
import { ref } from "vue";

const authStore = useAuthStore();
const avatarUrl = ref(authStore.avatarUrl);
</script>
