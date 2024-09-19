<template>
    <q-page class="q-pa-md">
        <artwork-banner></artwork-banner>
        <!-- <UserComment /> -->
        <recently-updated/>
        
    </q-page>
</template>
<script setup>
defineOptions({
    name: 'MangaDetail'
})
import ArtworkBanner from 'src/components/artwork/artWorkDetailMangaPage/ArtworkBanner.vue';
import RecentlyUpdated from 'src/components/common/artwork/RecentlyUpdated.vue';
import UserComment from 'src/components/common/artwork/UserComment.vue';
</script>