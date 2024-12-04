<template>
    <section id="recently-updated-section">
        <section class="border-sm-bottom-light-500 flex q-mb-md">
            <span class="flex items-center penomy-tab selected q-px-xs">
                <q-icon name="verified" size="sm" class="text-primary" />
                <span class="q-ml-xs text-subtitle1">Mới nhất</span>
            </span>

            <!-- Right side for pagination buttons -->
            <div v-if="paginationActive" class="q-ml-auto flex items-center">
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
        </section>

        <!-- If the fetching api process is not completed, display skeleton sections -->
        <div v-if="isLoading" class="row col-grow q-gutter-md">
            <div
                v-for="index in pageSize"
                :key="index"
                class="recently-updated-card-wrapper col-md"
            >
                <RecentlyUpdatedArtworkCardSkeleton />
            </div>
        </div>
        <!-- If the fetching api process is not completed, display skeleton sections -->

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
                <div class="row col-grow q-px-xs">
                    <div
                        v-for="(artwork, index) in currentArtworkList"
                        :key="artwork"
                        class="recently-updated-card-wrapper col-md-3"
                    >
                        <RecentlyUpdatedArtworkCard
                            :artworkDetail="artwork"
                            class="q-mb-md"
                            :class="
                                index != currentArtworkList.length - 1
                                    ? 'q-mr-md'
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
import { RecentlyUpdatedArtworksApiHandler } from "src/api.handlers/artwork/artwork1Page/RecentlyUpdatedArtworksApiHandler";

// Import components section.
import RecentlyUpdatedArtworkCard from "./RecentlyUpdatedArtworkCard.vue";
import RecentlyUpdatedArtworkCardSkeleton from "./RecentlyUpdatedArtworkCardSkeleton.vue";

export default {
    name: "RecentlyUpdatedSection",
    components: {
        RecentlyUpdatedArtworkCard,
        RecentlyUpdatedArtworkCardSkeleton,
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
            hasSetup: false,
            maxPage: 1,
            currentPage: 1,
            selectedSlide: null,
            /**
             * The total items to display per page (slide) when using navigation.
             */
            pageSize: 4,
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
        sliderPrefix() {
            return `recently_update`;
        },
        currentSlide() {
            return `${this.sliderPrefix}_${this.currentPage}`;
        },
        paginationActive() {
            const isPaginationActive = this.maxPage > 1;

            return isPaginationActive;
        },
        currentArtworkList() {
            const entry = this.paginationManager.getEntry(this.currentPage);

            return entry.artworkList;
        },
    },
    async mounted() {
        const recentlyUpdatedArtworks =
            await RecentlyUpdatedArtworksApiHandler.getAsync();

        // If the response is null, then not display
        if (!recentlyUpdatedArtworks) {
            return;
        }

        // Set up the pagination manager for user to nagivate.
        this.maxPage = Math.ceil(
            recentlyUpdatedArtworks.length / this.pageSize
        );
        let currentPage = 1;

        while (currentPage <= this.maxPage) {
            const indexOfFirstItemOfCurrentPage =
                (currentPage - 1) * this.pageSize;

            // Minus 1 because array using zero-based index.
            let indexOfLastItemOfCurrentPage =
                indexOfFirstItemOfCurrentPage + this.pageSize;

            // Check if the index of last item after calculation is exceed the list index.
            const isOutOfIndex =
                indexOfLastItemOfCurrentPage > recentlyUpdatedArtworks.length;

            if (isOutOfIndex) {
                indexOfLastItemOfCurrentPage = recentlyUpdatedArtworks.length;
            }

            // Get the artwork list that will be stored in the current page.
            const artworkListOfCurrentPage = recentlyUpdatedArtworks.slice(
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
        this.isLoading = false;
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
