<template>
    <section id="chapter-list-section">
        <div
            id="chapter-list-section-header"
            class="border-sm-bottom-light-500 row"
        >
            <span class="penomy-tab selected text-subtitle1 q-px-sm">
                Danh sách tập
            </span>
        </div>

        <!-- Action button group section -->
        <div id="action-button-group" class="flex items-center q-mt-sm q-mb-md">
            <q-btn id="sort-chapter-button" dense flat unelevated no-caps>
                <q-icon name="swap_vert" class="text-primary" size="sm" />
                <span class="q-ml-xs text-subtitle1">Mới nhất</span>

                <q-menu fit>
                    <q-list style="min-width: 100px">
                        <q-item clickable v-close-popup>
                            <q-item-section>Mới nhất</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup>
                            <q-item-section>Từ tập 1</q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>

            <div class="q-ml-auto flex items-center">
                <q-btn
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

                <q-btn
                    dense
                    no-caps
                    unelevated
                    class="text-dark bg-light-300 text-subtitle2 text-weight-bold q-px-sm"
                >
                    Tập 1-12

                    <!-- Chapter list Dropdown -->
                    <q-menu fit>
                        <q-list>
                            <q-item clickable v-close-popup>
                                <q-item-section>Tập 1-12</q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup>
                                <q-item-section>Tập 13-24</q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                    <!-- Chapter list Dropdown -->
                </q-btn>
                <q-btn
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
        </div>
        <!-- Action button group section -->

        <!-- Chapter list section -->
        <section v-if="!isLoading" class="flex q-gutter-md">
            <AnimeChapterCard
                v-for="chapter in displayChapterList"
                :key="chapter.id"
                :artworkId="artworkId"
                :chapterDetail="chapter"
                :hasViewed="false"
                :isAuthor="isAuthor"
            />
        </section>
        <!-- Chapter list section -->
    </section>
</template>

<script>
// Import dependencies section.
import { ArtworkChapterResponse } from "src/api.models/artwork/artwork3Page/ArtworkChapterResponse";
import { useUserProfileStore } from "src/stores/common/UserProfileStore";
import artworkDetailApiHandler from "src/api.handlers/artwork/artwork3Page/ArtworkDetailApiHandler";

// Import components section.
import AnimeChapterCard from "./AnimeChapterCard.vue";

// Init store for later operation.
const userProfileStore = useUserProfileStore();

export default {
    name: "AnimeChapterListSection",
    components: {
        AnimeChapterCard,
    },
    props: {
        artworkId: {
            required: true,
        },
        creatorId: {
            required: true,
        },
    },
    data() {
        return {
            isLoading: true,
            loadedPaginationOption: false,
            /**
             * Indicate to display the chapter list in descending order.
             * If true, the chapter with highest upload order will be displayed first.
             *
             * @note Default is set True to display the newest chapter of this comic.
             */
            isDisplayDescending: true,
            /**
             * The list contains the chapters to be displayed.
             *
             * @type {ArtworkChapterResponse[]} The type of this array.
             */
            displayChapterList: [],
            maxDisplayPages: 5, // Only display 5 pages when pagination for better UI.
            currentPage: 1,
            isPagination: false,
            /**
             * The number of total chapters this comic have.
             */
            totalChapters: 0,
            totalPages: 0,
        };
    },
    computed: {
        isAuthor() {
            return userProfileStore.currentUserId == this.creatorId;
        },
    },
    mounted() {
        this.getComicChapterPaginationOptions();
        this.getComicChapterListWithPaginationAsync();
    },
    methods: {
        async getComicChapterPaginationOptions() {
            const paginationOption =
                await artworkDetailApiHandler.getComicChapterPaginationOptionByIdAsync(
                    this.artworkId
                );

            if (paginationOption) {
                this.isPagination = paginationOption.isPagination;
                this.totalChapters = paginationOption.totalChapters;
                this.totalPages = paginationOption.totalPages;
            }

            // Set true to display the pagination detail.
            this.loadedPaginationOption = true;
        },
        async getComicChapterListWithPaginationAsync() {
            const apiResponse =
                await artworkDetailApiHandler.getArtworkChaptersByIdAsync(
                    this.artworkId,
                    this.currentPage
                );

            // Populate the data that fetched from API.
            this.isPagination = apiResponse.isPagination;
            this.totalChapters = apiResponse.chapterCount;
            this.displayChapterList.push(...apiResponse.chapters);

            // Turn off isLoading flag to display the content.
            this.isLoading = false;
        },
    },
};
</script>

<style scoped>
.anime-chapter-card.image {
    --width: 226px;
    --ratio: 0.6;

    width: var(--width);
    height: calc(var(--width) * var(--ratio));
}
</style>
