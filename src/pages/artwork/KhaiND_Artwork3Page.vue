<template>
    <q-page v-if="!isLoading">
        <ComicDetailSection
            :isLoading="isLoading"
            :comicId="comicId"
            :comicDetail="comicDetail"
        />

        <DescriptionAndChapterSection
            class="q-my-lg"
            :comicId="comicId"
            :comicDetail="comicDetail"
        />

        <ArtworkDetailRecommendedSection
            class="q-my-lg"
            :artworkId="comicId"
            :hasSeries="hasSeries"
        />
    </q-page>
</template>

<script>
// Import dependencies section.
import artworkDetailApiHandler from "src/api.handlers/artwork/artwork3Page/ArtworkDetailApiHandler";
import { ArtworkDetailResponse } from "src/api.models/artwork/artwork3Page/ArtworkDetailResponse";
import { useAuthStore } from "src/stores/common/AuthStore";
import { NumberHelper } from "src/helpers/NumberHelper";
import { NotificationHelper } from "src/helpers/NotificationHelper";

// Import components section.
import ComicDetailSection from "src/components/pages/artwork/artwork3Page/ComicDetailSection.vue";
import DescriptionAndChapterSection from "src/components/pages/artwork/artwork3Page/ComicDescriptionAndChapterSection.vue";
import ArtworkDetailRecommendedSection from "src/components/common/artwork/ArtworkDetailRecommendedSection.vue";

// Init authStore for later operation.
const authStore = useAuthStore();

export default {
    components: {
        ComicDetailSection,
        DescriptionAndChapterSection,
        ArtworkDetailRecommendedSection,
    },
    data() {
        return {
            comicId: null,
            isLoading: true,
            /**
             * @type {ArtworkDetailResponse} Type of this property.
             */
            comicDetail: null,
        };
    },
    beforeMount() {
        // Get the id from the route params to fetch data.
        this.comicId = this.$route.params.artworkId;

        const isValidId = NumberHelper.isNumber(this.comicId);

        if (!isValidId) {
            // Redirect back to homepage when getting invalid id.
            this.$router.push("/");
            return;
        }
    },
    async mounted() {
        const bearerAccessToken = authStore.bearerAccessToken();

        const result = await artworkDetailApiHandler.getArtworkDetailByIdAsync(
            this.comicId,
            bearerAccessToken
        );

        if (!result) {
            NotificationHelper.notifyError("Không tìm thấy nội dung");

            // this.$router.push("/");
            return;
        }

        // If result is success, then get the information and bind to the comic detail.
        this.comicDetail = result;

        // Turn off is loading flag.
        this.isLoading = false;
    },
    computed: {
        hasSeries() {
            return this.comicDetail.hasSeries;
        },
    },
};
</script>

<style>
#artwork-detail-breadcrumb,
#artwork-detail-card,
#artwork-recommended-section,
.artwork-detail-section,
.artwork-description-section {
    --max-width: 72%;

    max-width: var(--max-width) !important;
    width: var(--max-width) !important;
}

@media screen and (max-width: 480px) {
    #artwork-detail-breadcrumb,
    #artwork-detail-card,
    #artwork-recommended-section,
    .artwork-detail-section,
    .artwork-description-section {
        --max-width: 90%;

        max-width: var(--max-width) !important;
        width: var(--max-width) !important;
    }
}
</style>
