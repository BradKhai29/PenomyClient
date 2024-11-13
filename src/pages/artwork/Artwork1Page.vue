<template>
    <q-page>
        <TopRecommendedArtworkSlider :isComic="true" class="q-ma-md" />
        <RecentlyUpdated />
        <ComicByCategory />
        <AnimeByCategory />
    </q-page>
</template>

<script>
import TopRecommendedArtworkSlider from "src/components/common/artwork/slider/TopRecommendedArtworkSlider.vue";
import AnimeByCategory from "src/components/common/artwork/anime/AnimeByCategory.vue";
import RecentlyUpdated from "src/components/common/artwork/comic/RecentlyUpdated.vue";
import ComicByCategory from "src/components/common/artwork/comic/ComicByCategory.vue";

export default {
    name: "Artwork1Page",
    components: {
        TopRecommendedArtworkSlider,
        AnimeByCategory,
        RecentlyUpdated,
        ComicByCategory,
    },
};
</script>
