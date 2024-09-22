<template>
    <q-page class="q-pa-md">
        <!-- <UserComment /> -->
        <recently-updated />
        <ArtworkByCategory />
        <div class="q-gutter-lg">
        </div>
        
    </q-page>
</template>
<script setup>

defineOptions({
    name: 'MangaDetail'
})
import RecentlyUpdated from 'src/components/common/artwork/RecentlyUpdated.vue';
import ArtworkByCategory from 'src/components/common/artwork/RecommendArtworkByCategory.vue';
import UserComment from 'src/components/common/artwork/UserComment.vue';
</script>