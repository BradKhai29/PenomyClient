<template>
    <q-page class="q-pa-md">
        <artwork-banner></artwork-banner>
        <!-- <UserComment /> -->
        <recently-updated />
        <div class="row q-col-gutter-lg q-pa-sm">
            <div class="col-2" v-for="n in 16" :key="`md-${n}`">
                <artwork-card />
            </div>
        </div>
        <div class="q-gutter-lg">
        </div>
        
    </q-page>
</template>
<script setup>

defineOptions({
    name: 'MangaDetail'
})
import ArtworkBanner from 'src/components/artwork/artWorkDetailMangaPage/ArtworkBanner.vue';
import RecentlyUpdated from 'src/components/common/artwork/RecentlyUpdated.vue';
import ArtworkCard from 'src/components/common/artwork/ArtworkCard.vue';
import RecentlyUpdatedArtworkCard from 'src/components/common/artwork/RecentlyUpdatedArtworkCard.vue';
import UserComment from 'src/components/common/artwork/UserComment.vue';
</script>