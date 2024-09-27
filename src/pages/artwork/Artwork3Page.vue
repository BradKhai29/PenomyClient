<template>
    <q-card :style="backgroundStyle" class="">
        <div class="q-pt-lg q-pb-xs">
            <q-card class="row detail-header">
                <image-section class="col-3 q-pr-md"></image-section>
                <description-section class="col-9 q-pt-md"></description-section>
            </q-card>
            <q-card class="row justify-center subcribe-detail">
                <subcribe-detail class="col-12"></subcribe-detail>
            </q-card>
        </div>
    </q-card>
    <q-card class="detail-body " style="">
        <detail-body-section class="col-12"></detail-body-section>
    </q-card>
    <div class="recommend-section">
        <recommendation-section></recommendation-section>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const backgroundImageUrl = ref(''); // To store the background image URL from the API

onMounted(() => {
    const id = route.params.id;
    try {
        backgroundImageUrl.value = '/src/assets/hero_academia.jpg';
    } catch (error) {

    }
});


function fetchBackgroundImage() {
    // Simulate an API call
    setTimeout(() => {
        backgroundImageUrl.value = '/src/assets/hero_academia.jpg';
    }, 1000);
}

// Computed property for dynamic background style
const backgroundStyle = computed(() => ({
    background: `url(${backgroundImageUrl.value}) no-repeat`,
    backgroundSize: 'cover',
}));
</script>

<script>
import ImageSection from "src/components/artwork/artwork3Page/ImageSection.vue";
import DescriptionSection from "src/components/artwork/artwork3Page/DescriptionSection.vue";
import RecommendationSection from "src/components/artwork/artwork3Page/RecommendationSection.vue";
import SubcribeDetail from "src/components/artwork/artwork3Page/SubcribeDetail.vue";
import DetailBodySection from "src/components/artwork/artwork3Page/DetailBodySection.vue";

export default {
    components: {
        ImageSection,
        DescriptionSection,
        RecommendationSection,
        SubcribeDetail,
        DetailBodySection,
    }
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
