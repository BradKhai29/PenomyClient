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
            :creatorId="creatorId"
        />

        <ArtworkDetailRecommendedSection
            class="q-my-lg"
            :artworkId="comicId"
            :hasSeries="hasSeries"
        />

        <CommentLoader
            :isAllowComment="comicDetail.isAllowComment"
            :artworkId="comicId"
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
import ComicDetailSection from "src/components/pages/artwork/artwork3Page/ComicDetailSection.vue";
import DescriptionAndChapterSection from "src/components/pages/artwork/artwork3Page/ComicDescriptionAndChapterSection.vue";
import ArtworkDetailRecommendedSection from "src/components/common/artwork/ArtworkDetailRecommendedSection.vue";
import CommentLoader from "src/components/common/artwork/Common/CommentLoader.vue";

// Init store for later operation.
import { useAuthStore } from "src/stores/common/AuthStore";
import { useGuestStore } from "src/stores/common/GuestStore";

const authStore = useAuthStore();
const guestStore = useGuestStore();

export default {
    components: {
        ComicDetailSection,
        DescriptionAndChapterSection,
        ArtworkDetailRecommendedSection,
        CommentLoader,
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
        this.loadComicIdFromRoute();

        const isValidId = NumberHelper.isNumber(this.comicId);

        if (!isValidId) {
            // Redirect back to homepage when getting invalid id.
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

        // Load the current comic detail.
        this.loadComicDetailAsync();
    },
    methods: {
        loadComicIdFromRoute() {
            // Get the id from the route params to fetch data.
            this.comicId = this.$route.params.artworkId;
        },
        async loadComicDetailAsync() {
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
                    this.comicId,
                    guestId,
                    accessToken
                );

            if (!artworkDetail) {
                NotificationHelper.notifyError("Không tìm thấy nội dung");

                this.$router.push("/");
                return;
            }

            // If result is success, then get the information and bind to the comic detail.
            this.comicDetail = artworkDetail;

            // Turn off isLoading flag after loading content successfully.
            this.isLoading = false;
        },
    },
    computed: {
        hasSeries() {
            return this.comicDetail.hasSeries;
        },
        creatorId() {
            return this.comicDetail.creatorId;
        },
        currentPath() {
            return this.$route.path;
        },
    },
    watch: {
        currentPath(newPath, _) {
            console.log("New Path", newPath);
            this.loadComicIdFromRoute();

            this.loadComicDetailAsync();
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
