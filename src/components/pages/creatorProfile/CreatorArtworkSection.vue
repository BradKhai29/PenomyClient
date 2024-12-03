<template>
    <section id="guest-history-section" class="q-mt-md">
        <div
            id="header-section"
            class="border-sm-bottom-light-500 q-px-lg flex"
        >
            <span class="flex items-center penomy-tab selected q-px-xs">
                <q-icon name="palette" size="sm" class="text-primary" />
                <span class="q-ml-xs text-subtitle1">Đăng tải</span>

                <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[8, 8]"
                    :class="isComicType ? 'bg-dark text-light' : ''"
                >
                    <strong class="text-subtitle2">Tác phẩm đã đăng tải</strong>
                </q-tooltip>
            </span>
        </div>

        <!-- View history section -->
        <section class="q-mx-lg q-mt-md">
            <div class="flex items-center q-mb-sm" id="button-group">
                <q-btn
                    id="comic-tab-button"
                    @click="selectedTab = comicTab"
                    dense
                    no-caps
                    unelevated
                    class="flex items-center bg-light-300 text-subtitle1 border-radius-sm q-px-sm q-mr-sm"
                    :class="selectedTab == comicTab ? 'bg-dark text-light' : ''"
                >
                    <span>Truyện tranh</span>
                    <span class="q-ml-xs">({{ totalComics }})</span>
                </q-btn>
                <q-btn
                    id="anime-tab-button"
                    @click="selectedTab = animeTab"
                    dense
                    no-caps
                    unelevated
                    class="flex items-center bg-light-300 text-subtitle1 border-radius-sm q-px-sm"
                    :class="selectedTab == animeTab ? 'bg-dark text-light' : ''"
                >
                    <span>Hoạt hình</span>
                    <span class="q-ml-xs">({{ totalAnimes }})</span>
                </q-btn>
            </div>

            <div class="row q-mt-md" v-if="!isLoading">
                <q-tab-panels v-model="selectedTab" animated class="col-grow">
                    <q-tab-panel :name="comicTab" class="q-pa-none q-py-xs row">
                        <div v-if="!isLoading" class="row col-grow">
                            <div
                                v-for="comic in displayComicList"
                                :key="comic.id"
                                class="view-history-card-wrapper col-md-3"
                            >
                                <CreatorProfileArtworkCard
                                    :artworkDetail="comic"
                                    :isComic="true"
                                    :isAuthor="isProfileOwner"
                                    class="q-mr-md q-mb-md"
                                />
                            </div>
                        </div>
                        <div v-if="isLoading" class="row col-grow">
                            <RecentlyUpdatedArtworkCardSkeleton
                                v-for="index in totalSkeletons"
                                :key="index"
                                class="q-mr-md q-mb-md"
                            />
                        </div>
                    </q-tab-panel>

                    <q-tab-panel :name="animeTab" class="q-pa-none row">
                        Hello
                    </q-tab-panel>
                </q-tab-panels>
            </div>
        </section>
        <!-- View history section -->
    </section>
</template>

<script>
// Import dependencies section.
import { CreatorProfileApiHandler } from "src/api.handlers/creatorProfile/CreatorProfileApiHandler";
import { ArtworkTypes } from "src/api.handlers/artwork/artwork1Page/TopRecommendedArtworkApiHandler";
import { ArtworkDetailResponseItem } from "src/api.models/creatorProfile/ArtworkDetailResponseItem";
import { ItemDictionary } from "src/api.models/common/ItemDictionary";
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { ArrayHelper } from "src/helpers/ArrayHelper";

// Import components section.
import CreatorProfileArtworkCard from "../profile/artword_cards/CreatorProfileArtworkCard.vue";
import RecentlyUpdatedArtworkCardSkeleton from "src/components/common/artwork/recently_updated/RecentlyUpdatedArtworkCardSkeleton.vue";

// Components support constants.
const COMIC_TAB = "comic";
const ANIME_TAB = "anime";

export default {
    name: "CreatorArtworkSection",
    components: {
        CreatorProfileArtworkCard,
        RecentlyUpdatedArtworkCardSkeleton,
    },
    props: {
        creatorId: {
            required: true,
        },
        isProfileOwner: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isLoading: true,
            selectedTab: COMIC_TAB,
            /**
             * @type {ArtworkDetailResponseItem[]} Type of this array
             */
            displayComicList: [],
            /**
             * @type {ArtworkDetailResponseItem[]} Type of this array
             */
            displayAnimeList: [],
            // Comic Pagination section.
            comicListDictionary: ItemDictionary.New(),
            currentComicPage: 1,
            isComicPagination: false,
            totalComics: 0,
            totalComicPages: 0,
            // Anime Pagination section.
            animeListDictionary: ItemDictionary.New(),
            currentAnimePage: 1,
            isAnimePagination: false,
            totalAnimes: 0,
            totalAnimePages: 0,
        };
    },
    computed: {
        comicTab() {
            return COMIC_TAB;
        },
        animeTab() {
            return ANIME_TAB;
        },
        totalSkeletons() {
            return 4;
        },
    },
    async mounted() {
        await this.getComicPaginationOptionsAsync();
        await this.getComicPaginationOptionsAsync();
        await this.loadComicWithPaginationAsync();

        this.isLoading = false;
    },
    methods: {
        async getComicPaginationOptionsAsync() {
            const paginationOptions =
                await CreatorProfileApiHandler.getPaginationOptionsAsync(
                    this.creatorId,
                    ArtworkTypes.COMIC
                );

            this.isComicPagination = paginationOptions.isPagination;
            this.totalComics = paginationOptions.totalArtworks;
            this.totalComicPages = paginationOptions.totalPages;
        },
        async getAnimePaginationOptionsAsync() {
            const paginationOptions =
                await CreatorProfileApiHandler.getPaginationOptionsAsync(
                    this.creatorId,
                    ArtworkTypes.ANIMATION
                );

            this.isAnimePagination = paginationOptions.isPagination;
            this.totalAnimes = paginationOptions.totalArtworks;
            this.totalAnimePages = paginationOptions.totalPages;
        },
        async loadComicWithPaginationAsync() {
            const existedEntry = this.comicListDictionary.getEntry(
                this.currentComicPage
            );

            if (existedEntry) {
                ArrayHelper.clear(this.displayComicList);

                const existedList = existedEntry.value;
                this.displayComicList.push(...existedList);
                return;
            }

            // Get the comic list when the dictionary entry is not found.
            const comicList =
                await CreatorProfileApiHandler.getArtworksByTypeWithPaginationAsync(
                    this.creatorId,
                    ArtworkTypes.COMIC,
                    this.currentComicPage
                );

            if (!comicList) {
                NotificationHelper.notifyError("Call API failed");
                return;
            }

            ArrayHelper.clear(this.displayComicList);
            this.displayComicList.push(...comicList);

            this.comicListDictionary.addEntry(this.currentComicPage, comicList);
        },
        async loadAnimeWithPaginationAsync() {
            const existedEntry = this.animeListDictionary.getEntry(
                this.currentAnimePage
            );

            if (existedEntry) {
                ArrayHelper.clear(this.displayAnimeList);

                const existedList = existedEntry.value;
                this.displayAnimeList.push(...existedList);
                return;
            }

            // Get the comic list when the dictionary entry is not found.
            const animeList =
                await CreatorProfileApiHandler.getArtworksByTypeWithPaginationAsync(
                    this.creatorId,
                    ArtworkTypes.ANIMATION,
                    this.currentAnimePage
                );

            if (!animeList) {
                NotificationHelper.notifyError("Call API failed");
                return;
            }

            ArrayHelper.clear(this.displayAnimeList);
            this.displayAnimeList.push(...animeList);

            this.animeListDictionary.addEntry(this.currentAnimePage, animeList);
        },
    },
};
</script>
