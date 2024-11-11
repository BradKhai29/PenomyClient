<template>
    <section class="col-grow">
        <div class="q-pa-md">
            <div
                id="chapter-list-header"
                class="flex items-center justify-between"
            >
                <q-skeleton v-if="isLoading" width="120px" height="30px" />
                <span v-if="!isLoading" class="text-subtitle1"
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
                    <span class="border-sm-dark q-py-sm q-mx-xs"></span>
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
                <ComicChapterSkeletonCard v-for="i in 6" :key="i" />

                <section
                    v-if="isPagination"
                    class="flex justify-center q-mt-md"
                >
                    <AppPagination
                        :maxDisplayPages="5"
                        :max="5"
                        v-model="currentPage"
                    />
                </section>
            </div>
            <div v-else id="chapter-list-display-section" class="q-mt-md">
                <ComicChapterCard
                    v-for="chapter in displayChapterList"
                    :key="chapter.id"
                    :comicId="comicId"
                    :isAuthor="isAuthor"
                    :chapterDetail="chapter"
                    :isLoading="isLoading"
                />

                <section
                    v-if="isPagination"
                    class="flex justify-center q-mt-md"
                >
                    <AppPagination
                        :maxDisplayPages="5"
                        :max="5"
                        v-model="currentPage"
                    />
                </section>
            </div>
        </div>
    </section>
</template>

<script>
// Import dependencies section.
import { ArtworkChapterResponse } from "src/api.models/artwork/artwork3Page/ArtworkChapterResponse";
import { useUserProfileStore } from "src/stores/common/UserProfileStore";
import artworkDetailApiHandler from "src/api.handlers/artwork/artwork3Page/ArtworkDetailApiHandler";

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
            isLoading: true,
            /**
             * Indicate to display the chapter list in descending order.
             * If true, the chapter with highest upload order will be displayed first.
             *
             * @note Default is set True to display the newest chapter of this comic.
             */
            isDisplayDescending: true,
            currentPage: 1,
            /**
             * The list contains the chapters to be displayed.
             *
             * @type {ArtworkChapterResponse[]} The type of this array.
             */
            displayChapterList: [],
            isPagination: false,
            /**
             * The number of total chapters this comic have.
             */
            totalChapters: 0,
        };
    },
    computed: {
        chapterDetail() {
            return new ArtworkChapterResponse(
                12,
                1,
                "Testing chapter",
                "12/10/2023",
                12000,
                30030,
                56500,
                "https://res.cloudinary.com/dsjsmbdpw/image/upload/v1729903327/comics/8857013803077632/8857013803077632.png"
            );
        },
        isAuthor() {
            return userProfileStore.currentUserId == this.creatorId;
        },
    },
    async mounted() {
        const apiResponse =
            await artworkDetailApiHandler.getArtworkChaptersByIdAsync(
                this.comicId,
                this.currentPage,
                10
            );

        // Populate the data that fetched from API.
        this.isPagination = apiResponse.isPagination;
        this.totalChapters = apiResponse.chapterCount;
        this.displayChapterList.push(...apiResponse.chapters);

        // Turn off isLoading flag to display the content.
        this.isLoading = false;
    },
};
</script>
