<template>
    <section id="chapter-list-section" class="col-grow">
        <div class="q-pa-md">
            <div
                id="chapter-list-header"
                class="flex items-center justify-between"
            >
                <q-skeleton
                    v-if="!loadedPaginationOption"
                    width="120px"
                    height="30px"
                />
                <span v-if="loadedPaginationOption" class="text-subtitle1"
                    >Tổng {{ totalChapters }} tập</span
                >
                <div class="flex items-center">
                    <q-btn
                        @click="isDisplayDescending = true"
                        dense
                        flat
                        no-caps
                        class="text-subtitle2"
                        :class="isDisplayDescending ? 'text-weight-bold' : ''"
                        :disable="isLoading"
                        >Mới nhất</q-btn
                    >
                    <span
                        id="separator"
                        class="border-sm-dark q-py-sm q-mx-xs"
                    ></span>
                    <q-btn
                        @click="isDisplayDescending = false"
                        dense
                        flat
                        no-caps
                        class="text-subtitle2"
                        :class="!isDisplayDescending ? 'text-weight-bold' : ''"
                        :disable="isLoading"
                        >Từ tập 1</q-btn
                    >
                </div>
            </div>
            <div
                v-if="isLoading"
                id="chapter-list-display-section"
                class="q-mt-md"
            >
                <ComicChapterSkeletonCard
                    v-for="i in totalItemsPerPage"
                    :key="i"
                />
            </div>
            <section
                v-show="!isLoading"
                id="chapter-list-display-section"
                class="q-mt-md"
            >
                <div id="chapter-list-display-wrapper" v-if="!isLoading">
                    <ComicChapterCard
                        v-for="chapter in displayChapterList"
                        :key="chapter.id"
                        :comicId="comicId"
                        :isAuthor="isAuthor"
                        :chapterDetail="chapter"
                        :isLoading="isLoading"
                    />
                    <ComicChapterSkeletonCard
                        v-for="i in totalItemsPerPage -
                        displayChapterList.length"
                        :key="i"
                        :invisible="true"
                    />
                </div>

                <section
                    v-if="isPagination"
                    class="flex justify-center q-mt-md"
                >
                    <AppPagination
                        :maxDisplayPages="maxDisplayPages"
                        :max="totalPages"
                        :disable="isLoading"
                        v-model="currentPage"
                        @hasChange="handleChange"
                    />
                </section>
            </section>
        </div>
    </section>
</template>

<script>
// Import dependencies section.
import { ArtworkChapterResponse } from "src/api.models/artwork/artwork3Page/ArtworkChapterResponse";
import { useUserProfileStore } from "src/stores/common/UserProfileStore";
import artworkDetailApiHandler from "src/api.handlers/artwork/artwork3Page/ArtworkDetailApiHandler";
import { ItemDictionary } from "src/api.models/common/ItemDictionary";

// Import components section.
import ComicChapterCard from "./ComicChapterCard.UserSection.vue";
import ComicChapterSkeletonCard from "./ComicChapterSkeletonCard.vue";
import AppPagination from "src/components/common/others/AppPagination.vue";

// Init store for later operation.
const userProfileStore = useUserProfileStore();

export default {
    name: "ComicChapterListSection",
    components: {
        ComicChapterCard,
        ComicChapterSkeletonCard,
        AppPagination,
    },
    props: {
        comicId: {
            required: true,
        },
        creatorId: {
            required: true,
        },
    },
    data() {
        return {
            chapterListDictionary: ItemDictionary.New(),
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
        totalItemsPerPage() {
            return 10;
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
                    this.comicId
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
            // Turn on loading flag when load the chapter from api.
            this.isLoading = true;

            const entry = this.chapterListDictionary.getEntry(this.currentPage);

            if (entry) {
                const length = this.displayChapterList.length;

                this.displayChapterList.splice(0, length);

                const chapterList = entry.value;
                this.displayChapterList.push(...chapterList);
            } else {
                const apiResponse =
                    await artworkDetailApiHandler.getArtworkChaptersByIdAsync(
                        this.comicId,
                        this.currentPage
                    );

                // Populate the data that fetched from API.
                const pageNumber = this.currentPage;

                this.chapterListDictionary.addEntry(
                    pageNumber,
                    apiResponse.chapters
                );

                // Clear the display chapter list before populate again.
                const length = this.displayChapterList.length;

                this.displayChapterList.splice(0, length);
                this.displayChapterList.push(...apiResponse.chapters);
            }

            // Turn off isLoading flag to display the content.
            this.isLoading = false;
        },
        handleChange() {
            console.log(this.currentPage);

            this.getComicChapterListWithPaginationAsync();
        },
    },
};
</script>

<style scoped>
#chapter-list-display-section {
    --min-height: 400px;

    min-height: var(--min-height);
}
</style>
