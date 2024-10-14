<template>
    <q-card :style="backgroundStyle" class="">
        <div class="q-pt-lg q-pb-xs">
            <q-card class="row detail-header">
                <image-section class="col-3 q-pr-md"></image-section>
                <description-section :title="data.title" :author="data.authorName" :country="data.countryName"
                    :status="data.artworkStatus" series="Học viện Anh Hùng" :buttons="buttons"
                    class="col-9 q-pt-md"></description-section>
            </q-card>
            <q-card class="row justify-center subcribe-detail">
                <subcribe-detail class="col-12"></subcribe-detail>
            </q-card>
        </div>
    </q-card>
    <q-card class="detail-body" style="">
        <detail-body-section :introduction="data.introduction" :view-count="data.viewCount"
            :comment-count="data.commentCount" :favorite-count="data.favoriteCount" :star-rates="data.starRates"
            class="col-12"></detail-body-section>
    </q-card>
    <div class="recommend-section">
        <recommendation-section></recommendation-section>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import artworkDetailApiHandler from 'src/api.handlers/artwork/artwork3Page/ArtworkDetailApiHandler'
const route = useRoute();
const backgroundImageUrl = ref('');
const artworkId = ref(null);
const data = ref({});
const chapterData = ref({});
onMounted(async () => {
    artworkId.value = route.params.artworkId;
    const id = route.params.artworkId;
    try {
        const [artworkDetail, chapters] = await Promise.all([
            artworkDetailApiHandler.getArtworkDetailByIdAsync(id),
            artworkDetailApiHandler.getArtworkChaptersByIdAsync(id, 1, 3)
        ]);

        data.value = artworkDetail;
        chapterData.value = chapters;
        backgroundImageUrl.value = '/src/assets/hero_academia.jpg';
    } catch (error) {
        console.log(error);
    }
});

const backgroundStyle = computed(() => ({
    background: `url(${backgroundImageUrl.value}) no-repeat`,
    backgroundSize: 'cover',
}));
const buttons = computed(() => {
    return data.value.selectedCategories ? data.value.selectedCategories.map((item) => ({ label: item })) : [];
});
</script>

<script>
import ImageSection from "src/components/pages/artwork/artwork3Page/ImageSection.vue";
import DescriptionSection from "src/components/pages/artwork/artwork3Page/DescriptionSection.vue";
import RecommendationSection from "src/components/pages/artwork/artwork3Page/RecommendationSection.vue";
import SubcribeDetail from "src/components/pages/artwork/artwork3Page/SubcribeDetail.vue";
import DetailBodySection from "src/components/pages/artwork/artwork3Page/DetailBodySection.vue";

export default {
    components: {
        ImageSection,
        DescriptionSection,
        RecommendationSection,
        SubcribeDetail,
        DetailBodySection,
    },
};
</script>

<style scoped>
.subcribe-detail {

    margin-left: 260px;
    margin-right: 260px;
    margin-bottom: 16px;
}

.detail-body {
    margin-top: 32px;
    margin-left: 260px;
    margin-right: 260px;
    padding-bottom: 16px;
    margin-bottom: 32px;
}

.recommend-section {
    margin-left: 260px;
    margin-right: 260px;
}



.detail-header {
    padding: 16px;
    margin-left: 260px;
    margin-right: 260px;
    margin-bottom: 24px;
    /* 50px */
}
</style>
