<template>
    <q-card class="detail-first-component">
        <div class="q-pt-lg q-pb-xs">
            <q-card class="row detail-header">
                <image-section class="col-3 q-pr-md"></image-section>
                <description-section
                    class="col-9 q-pt-md"
                ></description-section>
            </q-card>
            <q-card class="row justify-center subcribe-detail">
                <subcribe-detail class="col-12"></subcribe-detail>
            </q-card>
        </div>
    </q-card>
    <q-card class="detail-body" style="">
        <detail-body-section class="col-12"></detail-body-section>
    </q-card>
    <div class="recommend-section">
        <recommendation-section></recommendation-section>
    </div>
</template>

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
    margin-left: 15rem;
    /* 50px */
    margin-right: 15rem;
    margin-bottom: 16px;
}

.detail-body {
    margin-top: 32px;
    margin-left: 15rem;
    margin-right: 15rem;
    padding-bottom: 16px;
    margin-bottom: 32px;
}

.recommend-section {
    margin-left: 15rem;
    margin-right: 15rem;
}

.detail-first-component {
    background: url("src/assets/hero_academia.jpg");
    background-size: cover;
}

.detail-header {
    padding: 16px;
    margin-left: 15rem;
    /* 50px */
    margin-right: 15rem;
    margin-bottom: 24px;
    /* 50px */
}
</style>
