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
                            <FollowedArtworkCard
                                :artworkDetail="comic"
                                class="q-mr-md q-mb-md"
                                @removeItem="handleRemoveItem"
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
import { FollowArtworkApiHandler } from "src/api.handlers/artwork/artwork3Page/FollowArtworkApiHandler";
import { ArtworkTypes } from "src/api.handlers/artwork/artwork1Page/TopRecommendedArtworkApiHandler";
import { useAuthStore } from "src/stores/common/AuthStore";
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { FollowedArtworkResponseItem } from "src/api.models/artwork/common/FollowedArtworkResponseItem";

// Import components section.
import FollowedArtworkCard from "../../profile/artword_cards/FollowedArtworkCard.vue";

// Components support constants.
const COMIC_TAB = "comic";
const ANIME_TAB = "anime";

// Init store for later operation.
const authStore = useAuthStore();

export default {
    name: "UserFollowedArtworksSection",
    components: {
        FollowedArtworkCard,
    },
    data() {
        return {
            isLoading: true,
            selectedTab: COMIC_TAB,
            /**
             * @type {FollowedArtworkResponseItem[]} Type of this array.
             */
            viewedComics: [],
            /**
             * @type {FollowedArtworkResponseItem[]} Type of this array.
             */
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
        this.loadFollowedArtworkListAsync();
    },
    methods: {
        async loadFollowedArtworkListAsync() {
            const result =
                await FollowArtworkApiHandler.getAllFollowedArtworkAsync(
                    authStore.bearerAccessToken(),
                    ArtworkTypes.COMIC
                );

            if (result) {
                this.viewedComics = result;
            } else {
                NotificationHelper.notifyError("Có lỗi xảy ra khi gọi API");
            }

            this.isLoading = false;
        },
        handleRemoveItem(artworkId) {
            const itemIndex = this.viewedComics.findIndex(
                (item) => item.id == artworkId
            );

            // Remove the item from the display list.
            this.viewedComics.splice(itemIndex, 1);
        },
    },
};
</script>
