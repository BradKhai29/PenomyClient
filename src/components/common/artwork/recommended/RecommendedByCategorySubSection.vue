<template>
    <section class="q-my-md q-pb-md border-sm-bottom-light-500">
        <div class="flex items-center justify-between q-mb-sm">
            <!-- Left side for category buttons -->
            <!-- Display skeleton buttons when fetching process is not completed -->
            <div v-if="isLoading" class="category-buttons flex items-center">
                <q-skeleton
                    width="80px"
                    height="32px"
                    class="border-radius-sm"
                />
                <q-skeleton
                    width="80px"
                    height="32px"
                    class="q-ml-sm border-radius-sm"
                />
            </div>
            <!-- Display skeleton buttons when fetching process is not completed -->
            <div
                v-else-if="!isLoading"
                class="category-buttons flex items-center"
            >
                <q-btn
                    dense
                    flat
                    no-caps
                    class="bg-dark text-light border-radius-sm q-px-sm"
                >
                    {{ categoryName }}
                </q-btn>
                <q-btn
                    dense
                    flat
                    no-caps
                    class="q-ml-sm bg-light-300 text-dark border-radius-sm"
                >
                    <q-icon name="search" size="sm" />
                    <span
                        v-if="$q.screen.gt.sm"
                        class="q-ml-xs text-weight-bold"
                        >Xem tất cả</span
                    >
                </q-btn>
            </div>
            <!-- Left side for category buttons -->

            <!-- Right side for pagination buttons -->
            <div v-if="paginationActive" class="flex items-center">
                <q-btn
                    :disable="!hasSetUp"
                    @click="toPreviousPage"
                    name="left-button"
                    dense
                    flat
                    no-caps
                    padding="none"
                    class="text-dark border-radius-sm q-px-sm"
                >
                    <q-icon
                        name="chevron_right"
                        size="md"
                        style="transform: rotate(180deg)"
                    />
                </q-btn>

                <span class="text-dark text-subtitle2 text-weight-bold q-mx-xs">
                    {{ currentPage }} / {{ maxPage }}
                </span>
                <q-btn
                    :disable="!hasSetUp"
                    @click="toNextPage"
                    name="right-button"
                    dense
                    flat
                    no-caps
                    padding="none"
                    class="text-dark border-radius-sm q-px-sm"
                >
                    <q-icon name="chevron_right" size="md" />
                </q-btn>
            </div>
            <!-- Right side for pagination buttons -->
        </div>

        <div v-if="isLoading" class="row col-grow">
            <div
                v-for="index in 6"
                :key="index"
                class="artwork-card-wrapper col-auto"
            >
                <RecommendedArtworkCardSkeleton
                    :class="index != 6 ? 'recommend-card-mr' : ''"
                />
            </div>
        </div>
        <q-tab-panels
            v-else-if="!isLoading"
            v-model="selectedSlide"
            animated
            class="col-grow"
        >
            <q-tab-panel
                v-for="index in maxPage"
                :key="index"
                :name="`${sliderPrefix}_${index}`"
                class="q-pa-none q-py-xs row"
            >
                <div class="row col-grow">
                    <div
                        v-for="(artwork, index) in currentArtworkList"
                        :key="artwork"
                        class="artwork-card-wrapper col-auto"
                    >
                        <RecommendArtworkCard
                            :artworkDetail="artwork"
                            :class="
                                index != currentArtworkList.length - 1
                                    ? 'recommend-card-mr'
                                    : ''
                            "
                        />
                    </div>
                </div>
            </q-tab-panel>
        </q-tab-panels>
    </section>
</template>

<script>
// Import dependencies section.
import { ArtworkPaginationManager } from "src/api.models/common/ArtworkPaginationManager";

// Import components section.
import RecommendArtworkCard from "src/components/common/artwork/recommended/RecommendArtworkCard.vue";
import RecommendedArtworkCardSkeleton from "./RecommendedArtworkCardSkeleton.vue";

export default {
    name: "RecommendedByCategorySubSection",
    components: {
        RecommendArtworkCard,
        RecommendedArtworkCardSkeleton,
    },
    props: {
        isLoading: {
            type: Boolean,
            default: true,
        },
        isComic: {
            type: Boolean,
            default: true,
        },
        categoryId: {
            required: true,
        },
        categoryName: {
            type: String,
            required: true,
        },
        recommendedArtworks: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            hasSetUp: false,
            currentPage: 1,
            selectedSlide: null,
            /**
             * The total items to display per page (slide) when using navigation.
             */
            pageSize: 6,
            /**
             * Manage the navigation for the recommended section.
             *
             * @type {ArtworkPaginationManager} Type of this property.
             * @readonly
             */
            paginationManager: ArtworkPaginationManager.New(),
        };
    },
    computed: {
        maxPage() {
            return Math.ceil(this.recommendedArtworks.length / this.pageSize);
        },
        paginationActive() {
            const isPaginationActive =
                Math.ceil(this.recommendedArtworks.length / this.pageSize) > 1;

            return isPaginationActive;
        },
        sliderPrefix() {
            return `slide_${this.categoryId}`;
        },
        currentSlide() {
            return `${this.sliderPrefix}_${this.currentPage}`;
        },
        currentArtworkList() {
            const entry = this.paginationManager.getEntry(this.currentPage);

            return entry.artworkList;
        },
    },
    mounted() {
        // Set up the pagination manager for user to nagivate.
        let currentPage = 1;

        while (currentPage <= this.maxPage) {
            const indexOfFirstItemOfCurrentPage =
                (currentPage - 1) * this.pageSize;

            // Minus 1 because array using zero-based index.
            let indexOfLastItemOfCurrentPage =
                indexOfFirstItemOfCurrentPage + this.pageSize;

            // Check if the index of last item after calculation is exceed the list index.
            const isOutOfIndex =
                indexOfLastItemOfCurrentPage > this.recommendedArtworks.length;

            if (isOutOfIndex) {
                indexOfLastItemOfCurrentPage = this.recommendedArtworks.length;
            }

            // Get the artwork list that will be stored in the current page.
            const artworkListOfCurrentPage = this.recommendedArtworks.slice(
                indexOfFirstItemOfCurrentPage,
                indexOfLastItemOfCurrentPage
            );

            this.paginationManager.addEntry(
                currentPage,
                artworkListOfCurrentPage
            );

            // Increase the current page to set up for the next page.
            currentPage++;
        }

        // Turn on the has set up flag after set up successfully.
        this.hasSetUp = true;
        this.moveToCurrentSlide();
    },
    methods: {
        toNextPage() {
            const nextPage = this.currentPage + 1;

            // Check if the current page is exceed the max page.
            if (nextPage > this.maxPage) {
                this.currentPage = 1;
            } else {
                this.currentPage = nextPage;
            }

            this.moveToCurrentSlide();
        },
        toPreviousPage() {
            const previousPage = this.currentPage - 1;

            // Check if the previous page after calculating
            // is less than 1, then set to max page.
            if (previousPage < 1) {
                this.currentPage = this.maxPage;
            } else {
                this.currentPage = previousPage;
            }

            this.moveToCurrentSlide();
        },
        moveToCurrentSlide() {
            this.selectedSlide = this.currentSlide;
        },
    },
};
</script>

<style scoped>
.recommend-card-mr {
    --margin-width: 20px;

    margin-right: var(--margin-width);
}
</style>
