<template>
    <section id="guest-history-section" class="q-mt-md">
        <div
            id="header-section"
            class="border-sm-bottom-light-500 q-px-lg flex"
        >
            <span class="flex items-center penomy-tab selected q-px-xs">
                <q-icon name="history" size="sm" class="text-primary" />
                <span class="q-ml-xs text-subtitle1">Lịch sử</span>

                <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[8, 8]"
                    :class="isComicType ? 'bg-dark text-light' : ''"
                >
                    <strong class="text-subtitle2">Lịch sử xem của bạn</strong>
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
                        <div class="row col-grow">
                            <div
                                v-for="comic in viewedComics"
                                :key="comic.id"
                                class="view-history-card-wrapper col-md-3"
                            >
                                <ViewHistoryArtworkCard
                                    :artworkDetail="comic"
                                    class="q-mr-md q-mb-md"
                                    @removeItem="handleRemoveHistoryItem"
                                />
                            </div>
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
import { ViewHistoryApiHandler } from "src/api.handlers/artwork/common/ViewHistoryApiHandler";
import { ArtworkTypes } from "src/api.handlers/artwork/artwork1Page/TopRecommendedArtworkApiHandler";
import { ViewHistoryArtworkResponseItem } from "src/api.models/artwork/common/ViewHistoryArtworkResponseItem";

// Import components section.
import ViewHistoryArtworkCard from "../profile/artword_cards/ViewHistoryArtworkCard.vue";

// Components support constants.
const COMIC_TAB = "comic";
const ANIME_TAB = "anime";

export default {
    name: "GuestHistorySection",
    components: {
        ViewHistoryArtworkCard,
    },
    props: {
        guestId: {
            required: true,
        },
    },
    data() {
        return {
            isLoading: true,
            selectedTab: COMIC_TAB,
            /**
             * @type {ViewHistoryArtworkResponseItem[]} Type of this array
             */
            viewedComics: [],
            viewedAnimes: [],
        };
    },
    computed: {
        comicTab() {
            return COMIC_TAB;
        },
        animeTab() {
            return ANIME_TAB;
        },
        isAtComicTab() {
            return this.selectedTab == COMIC_TAB;
        },
        totalComics() {
            return this.viewedComics.length;
        },
        totalAnimes() {
            return this.viewedAnimes.length;
        },
    },
    async mounted() {
        this.viewedComics =
            await ViewHistoryApiHandler.getGuestViewHistoryAsync(
                this.guestId,
                ArtworkTypes.COMIC
            );

        console.log(this.viewedComics);
        this.isLoading = false;
    },
    methods: {
        handleRemoveHistoryItem(artworkId) {
            const itemIndex = this.viewedComics.findIndex(
                (item) => item.id == artworkId
            );

            // Remove the item from the display list.
            this.viewedComics.splice(itemIndex, 1);
        },
    },
};
</script>
