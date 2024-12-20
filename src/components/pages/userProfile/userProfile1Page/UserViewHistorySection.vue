<template>
    <section id="user-history-section" class="">
        <!-- View history section -->
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

                <q-tab-panel :name="animeTab" class="q-pa-none q-py-xs row">
                    <div
                        v-if="totalAnimes == 0"
                        class="col-grow q-mx-xs q-pa-md bg-light-100 shadow-1 border-radius-sm flex justify-center text-dark-500"
                    >
                        <div class="column items-center">
                            <q-icon name="outbox" size="120px"></q-icon>
                            <span class="text-subtitle1">
                                Không có nội dung
                            </span>
                        </div>
                    </div>
                </q-tab-panel>
            </q-tab-panels>
        </div>
        <!-- View history section -->
    </section>
</template>

<script>
// Import dependencies section.
import { ViewHistoryApiHandler } from "src/api.handlers/artwork/common/ViewHistoryApiHandler";
import { ArtworkTypes } from "src/api.handlers/artwork/artwork1Page/TopRecommendedArtworkApiHandler";
import { ViewHistoryArtworkResponseItem } from "src/api.models/artwork/common/ViewHistoryArtworkResponseItem";
import { useUserProfileStore } from "src/stores/common/UserProfileStore";

// Import components section.
import ViewHistoryArtworkCard from "../../profile/artword_cards/ViewHistoryArtworkCard.vue";

// Components support constants.
const COMIC_TAB = "comic";
const ANIME_TAB = "anime";

// Init store for later operation.
const userProfileStore = useUserProfileStore();

export default {
    name: "UserViewHistorySection",
    components: {
        ViewHistoryArtworkCard,
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
        this.loadViewHistoryAsync();
    },
    methods: {
        loadViewHistoryAsync() {
            userProfileStore.waitToLoadOwnerProfile().then(async () => {
                this.viewedComics =
                    await ViewHistoryApiHandler.getUserViewHistoryAsync(
                        ArtworkTypes.COMIC
                    );

                this.isLoading = false;
            });
        },
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
