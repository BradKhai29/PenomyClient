<template>
    <q-page>
        <user-infor></user-infor>
        <PublishedArtworks/>
    </q-page>
</template>

<script setup>
import UserInfor from 'src/components/pages/profile/profile1Page/UserInfor.vue';
import PublishedArtworks from 'src/components/pages/profile/profile1Page/PublishedArtworks.vue';
import { useProfileStore } from 'src/stores/pages/userProfile/ProfileStore';

const profileStore = useProfileStore();
profileStore.setupProfileStore();
</script>