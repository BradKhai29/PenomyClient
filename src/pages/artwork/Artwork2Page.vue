<template>
    <q-page>
        <TopRecommendedArtworkSlider :isComic="false" class="q-ma-md" />
        <RecentlyUpdatedSection :isComic="false" class="q-ma-md" />
        <RecommendedByCategorySection :isComic="false" class="q-ma-md" />
    </q-page>
</template>

<script>
import TopRecommendedArtworkSlider from "src/components/common/artwork/slider/TopRecommendedArtworkSlider.vue";
import RecentlyUpdatedSection from "src/components/common/artwork/recently_updated/RecentlyUpdatedSection.vue";
import RecommendedByCategorySection from "src/components/common/artwork/recommended/RecommendedByCategorySection.vue";

export default {
    name: "Artwork2Page",
    components: {
        TopRecommendedArtworkSlider,
        RecentlyUpdatedSection,
        RecommendedByCategorySection,
    },
};
</script>
