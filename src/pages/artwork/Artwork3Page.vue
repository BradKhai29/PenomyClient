<template>
    <q-page class="">
        <q-card class="row">
            <image-section class="col-3 q-pr-md"></image-section>
            <description-section class="col-9 q-pt-md"></description-section>
        </q-card>
        <q-card>
            <recommendation-section></recommendation-section>
        </q-card>
    </q-page>
</template>

<script>
import ImageSection from "src/components/artwork/artwork3Page/ImageSection.vue";
import DescriptionSection from "src/components/artwork/artwork3Page/DescriptionSection.vue";
import RecommendationSection from "src/components/artwork/artwork3Page/RecommendationSection.vue";

export default {
    components: {
        ImageSection,
        DescriptionSection,
        RecommendationSection
    }
};
</script>
