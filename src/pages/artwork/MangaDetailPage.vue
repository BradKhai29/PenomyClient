<template>
    <q-page class="q-pa-md">
        <artwork-banner></artwork-banner>
        <!-- <UserComment /> -->

    </q-page>
</template>
<script setup>
defineOptions({
    name: 'MangaDetail'
})
import ArtworkBanner from 'src/components/artwork/artWorkDetailMangaPage/ArtworkBanner.vue';
import UserComment from 'components/artwork/artWorkDetailMangaPage/UserComment.vue';
</script>