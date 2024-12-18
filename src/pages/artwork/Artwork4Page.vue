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
import { NumberHelper } from "src/helpers/NumberHelper";
import { NotificationHelper } from "src/helpers/NotificationHelper";

// Import components section.
import AnimeDetailSection from "src/components/pages/artwork/artwork4Page/AnimeDetailSection.vue";
import CreatorDetailSection from "src/components/common/artwork/CreatorDetailSection.vue";
import AnimeMetadataSection from "src/components/pages/artwork/artwork4Page/AnimeMetadataSection.vue";
import AnimeChapterListSection from "src/components/pages/artwork/artwork4Page/AnimeChapterListSection.vue";
import ArtworkDetailRecommendedSection from "src/components/common/artwork/ArtworkDetailRecommendedSection.vue";

// Init store for later operation.
import { useAuthStore } from "src/stores/common/AuthStore";
import { useGuestStore } from "src/stores/common/GuestStore";

const authStore = useAuthStore();
const guestStore = useGuestStore();

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
            artworkId: null,
            isLoading: true,
            /**
             * @type {ArtworkDetailResponse} Type of this property.
             */
            animeDetail: null,
        };
    },
    computed: {
        hasSeries() {
            return this.animeDetail.hasSeries;
        },
    },
    beforeMount() {
        this.loadArtworkIdFromRoute();

        const isValidId = NumberHelper.isNumber(this.artworkId);

        if (!isValidId) {
            // Redirect back to homepage when getting invalid id.
            NotificationHelper.notifyError("Id của tác phẩm không hợp lệ");
            this.$router.push("/");

            return;
        }
    },
    async mounted() {
        await authStore.setUp();

        // Wait for guest store to setup success when current user is not authenticated.
        if (!authStore.isAuth) {
            await guestStore.waitForSetUp();
        }

        this.loadAnimeDetailAsync();
    },
    methods: {
        loadArtworkIdFromRoute() {
            // Get the id from the route params to fetch data.
            this.artworkId = this.$route.params.artworkId;
        },
        async loadAnimeDetailAsync() {
            // Turn on the loading flag to wait for the content being loaded.
            this.isLoading = true;
            let guestId = -1;
            let accessToken = "null_token";

            // If current user is not authenticated, then get the guestId.
            if (!authStore.isAuth) {
                guestId = guestStore.currentGuestId;
            }
            // Otherwise, get the current user's access token.
            else {
                accessToken = authStore.accessToken();
            }

            const artworkDetail =
                await artworkDetailApiHandler.getArtworkDetailByIdAsync(
                    this.artworkId,
                    guestId,
                    accessToken
                );

            if (!artworkDetail) {
                NotificationHelper.notifyError("Không tìm thấy nội dung");

                this.$router.push("/");
                return;
            }

            // If result is success, then get the information and bind to the comic detail.
            this.animeDetail = artworkDetail;

            // Turn off isLoading flag after loading content successfully.
            this.isLoading = false;
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
