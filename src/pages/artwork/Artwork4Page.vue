<template>
    <q-page v-if="!isLoading">
        <AnimeDetailSection
            :isLoading="isLoading"
            :artworkId="artworkId"
            :animeDetail="animeDetail"
        />

        <section class="q-my-lg flex justify-center">
            <div class="artwork-detail-section shadow-1 border-radius-md">
                <AnimeMetadataSection
                    :artworkId="artworkId"
                    :animeDetail="animeDetail"
                    class="border-md-bottom-light-500"
                />
                <CreatorDetailSection
                    :artworkId="artworkId"
                    :creatorId="animeDetail.creatorId"
                    :creatorName="animeDetail.creatorName"
                    :creatorAvatarUrl="animeDetail.creatorAvatarUrl"
                    :creatorTotalFollowers="animeDetail.creatorTotalFollowers"
                />
            </div>
        </section>

        <section class="q-my-md flex justify-center">
            <AnimeChapterListSection
                :artworkId="artworkId"
                :creatorId="animeDetail.creatorId"
                class="artwork-detail-section"
            />
        </section>

        <ArtworkDetailRecommendedSection
            class="q-my-lg"
            :isComic="false"
            :artworkId="artworkId"
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
import AnimeDetailSection from "src/components/pages/artwork/artwork4Page/AnimeDetailSection.vue";
import CreatorDetailSection from "src/components/common/artwork/CreatorDetailSection.vue";
import AnimeMetadataSection from "src/components/pages/artwork/artwork4Page/AnimeMetadataSection.vue";
import AnimeChapterListSection from "src/components/pages/artwork/artwork4Page/AnimeChapterListSection.vue";
import ArtworkDetailRecommendedSection from "src/components/common/artwork/ArtworkDetailRecommendedSection.vue";

// Init authStore for later operation.
const authStore = useAuthStore();

export default {
    name: "Artwork4Page",
    components: {
        AnimeDetailSection,
        AnimeMetadataSection,
        CreatorDetailSection,
        AnimeChapterListSection,
        ArtworkDetailRecommendedSection,
    },
    data() {
        return {
            isLoading: true,
            artworkId: null,
            /**
             * @type {ArtworkDetailResponse} Type of this property.
             */
            animeDetail: null,
        };
    },
    beforeMount() {
        // Get the id from the route params to fetch data.
        this.artworkId = this.$route.params.artworkId;

        const isValidId = NumberHelper.isNumber(this.artworkId);

        if (!isValidId) {
            // Redirect back to homepage when getting invalid id.
            this.$router.push("/");

            return;
        }
    },
    async mounted() {
        const result = await artworkDetailApiHandler.getArtworkDetailByIdAsync(
            this.artworkId,
            authStore.accessToken()
        );

        if (!result) {
            NotificationHelper.notifyError("Không tìm thấy nội dung");

            // this.$router.push("/");
            return;
        }

        // If result is success, then get the information
        // and bind to the anime detail.
        this.animeDetail = result;

        // Turn off is loading flag.
        this.isLoading = false;
    },
    computed: {
        hasSeries() {
            return this.animeDetail.hasSeries;
        },
    },
};
</script>

<style>
#artwork-detail-card,
#artwork-recommended-section,
.artwork-detail-section,
.artwork-description-section {
    --max-width: 72%;

    max-width: var(--max-width) !important;
    width: var(--max-width) !important;
}

@media screen and (max-width: 480px) {
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
