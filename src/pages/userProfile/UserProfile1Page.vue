<template>
    <q-page>
        <user-infor></user-infor>
        <PublishedArtworks />
    </q-page>
</template>

<script setup>
import UserInfor from "src/components/pages/profile/common/UserProfileCard.vue";
import PublishedArtworks from 'src/components/pages/profile/profile1Page/PublishedArtworks.vue';
import { useAuthStore } from 'src/stores/common/AuthStore';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

onBeforeMount(() => {
    if(!authStore.isAuth) router.push('/auth/login');
});
</script>