<template>
    <section id="recommended-by-category-section">
        <section class="border-sm-bottom-light-500 flex">
            <span class="flex items-center penomy-tab selected q-px-xs">
                <q-icon :name="isComic ? 'palette' : 'videocam'" size="sm" />
                <span class="q-ml-xs text-subtitle1">Đề xuất</span>
            </span>
        </section>

        <!-- If the fetching api process is not completed, display skeleton sections -->
        <section id="recommended-by-category-subsection" v-if="isLoading">
            <RecommendedByCategorySubSection
                v-for="item in totalSkeletonSections"
                :key="item"
                :isLoading="isLoading"
                :categoryId="item"
                :categoryName="`category_${item}`"
                :recommendedArtworks="[]"
            />
        </section>
        <!-- If the fetching api process is not completed, display skeleton sections -->

        <section id="recommended-by-category-subsection" v-else>
            <RecommendedByCategorySubSection
                v-for="item in recommendedLists"
                :key="item.categoryId"
                :isLoading="isLoading"
                :isComic="isComic"
                :categoryId="item.categoryId"
                :categoryName="item.categoryName"
                :recommendedArtworks="item.recommendedArtworks"
            />
        </section>
    </section>
</template>

<script>
// Import dependencies section.
import { RecommendComicsByCategoryApiHandler } from "src/api.handlers/artwork/artwork1Page/RecommendComicsByCategoryApiHandler";
import { RecommendArtworksByCategoryResponse } from "src/api.models/artwork/artwork1Page/RecommendArtworksByCategoryResponse";

// Import components section.
import RecommendedByCategorySubSection from "./RecommendedByCategorySubSection.vue";

// Init the authStore for later operation.
import { useAuthStore } from "src/stores/common/AuthStore";
import { useGuestStore } from "src/stores/common/GuestStore";
import { ArtworkTypes } from "src/api.handlers/artwork/artwork1Page/TopRecommendedArtworkApiHandler";

const authStore = useAuthStore();
const guestStore = useGuestStore();

export default {
    name: "RecommendedByCategorySection",
    components: {
        RecommendedByCategorySubSection,
    },
    props: {
        isComic: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            isLoading: true,
            totalSkeletonSections: 4,
            /**
             * @type {RecommendArtworksByCategoryResponse[]} Type of this list.
             */
            recommendedLists: null,
        };
    },
    computed: {
        loadArtworkType() {
            if (this.isComic) {
                return ArtworkTypes.COMIC;
            }

            return ArtworkTypes.ANIMATION;
        },
    },
    async mounted() {
        await authStore.setUp();

        const PLACEHOLDER_GUEST_ID = -1;
        const guestId = authStore.isAuth
            ? PLACEHOLDER_GUEST_ID
            : guestStore.currentGuestId;

        const result = await RecommendComicsByCategoryApiHandler.getAsync(
            authStore.accessToken(),
            guestId,
            this.loadArtworkType
        );

        if (result) {
            this.recommendedLists = result;
            // Turn off the isLoading flag when the operation is completedlo.
            this.isLoading = false;
        }
    },
};
</script>
