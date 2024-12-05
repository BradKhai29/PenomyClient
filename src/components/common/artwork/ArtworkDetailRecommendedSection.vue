<template>
    <section
        id="artwork-recommended-section-wrapper"
        class="row justify-center"
    >
        <section id="artwork-recommended-section">
            <div
                id="artwork-recommended-section-header"
                class="flex items-center border-sm-bottom-light-500"
            >
                <div class="flex items-center penomy-tab">
                    <q-icon name="view_list" class="text-primary" size="sm" />
                    <span class="q-ml-xs text-subtitle1">Đề xuất</span>
                </div>
                <div id="tab-navigation-items" class="flex items-center">
                    <!-- Temporarily disable this series tab button -->
                    <!-- <q-btn
                        square
                        dense
                        flat
                        no-caps
                        class="text-subtitle1 q-mr-sm penomy-tab"
                        :class="{ selected: selectedTab == seriesTab }"
                        @click="selectedTab = seriesTab"
                    >
                        Cùng Series
                    </q-btn> -->
                    <q-btn
                        square
                        dense
                        flat
                        no-caps
                        class="text-subtitle1 penomy-tab"
                        :class="{ selected: selectedTab == recommendedTab }"
                        @click="selectedTab = recommendedTab"
                    >
                        Cùng thể loại
                    </q-btn>
                </div>
            </div>
            <div class="row q-mt-md">
                <q-tab-panels v-model="selectedTab" animated class="col-grow">
                    <q-tab-panel :name="seriesTab" class="q-pa-none row">
                        <div v-if="hasSeries" class="col-grow row">
                            <RecommendedArtworkItemCard
                                v-for="i in 3"
                                :key="i"
                                :artworkId="1"
                                :itemIndex="i"
                            />
                        </div>
                        <div
                            v-else
                            class="shadow-1 col-grow border-radius-sm text-subtitle1"
                            style="height: 130px"
                        >
                            Không có tác phẩm nào
                        </div>
                    </q-tab-panel>

                    <q-tab-panel
                        v-if="!isLoading"
                        :name="recommendedTab"
                        class="q-pa-none row"
                    >
                        <RecommendedArtworkItemCard
                            v-for="(artwork, index) in recommendedArtworks"
                            :key="artwork.id"
                            :artworkDetail="artwork"
                            :itemIndex="index + 1"
                        />
                    </q-tab-panel>
                </q-tab-panels>
            </div>
        </section>
    </section>
</template>

<script>
// Import dependencies section.
import artworkDetailApiHandler from "src/api.handlers/artwork/artwork3Page/ArtworkDetailApiHandler";
import { Art3RecommendedArtworkResponseItem } from "src/api.models/artwork/artwork3Page/Art3RecommendedArtworkResponseItem";

// Import components section.
import RecommendedArtworkItemCard from "./RecommendedArtworkItemCard.vue";

export default {
    name: "ArtworkDetailRecommendedSection",
    components: {
        RecommendedArtworkItemCard,
    },
    props: {
        hasSeries: {
            type: Boolean,
            required: true,
        },
        artworkId: {
            required: true,
        },
        isComic: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            selectedTab: null,
            isLoading: true,
            /**
             * @type {Art3RecommendedArtworkResponseItem[]} The type of this list.
             */
            recommendedArtworks: [],
        };
    },
    computed: {
        seriesTab() {
            return "series";
        },
        recommendedTab() {
            return "recommended";
        },
    },
    beforeMount() {
        this.selectedTab = this.recommendedTab;
    },
    async mounted() {
        const recommendArtworkList =
            await artworkDetailApiHandler.getRecommendedArtworksAsync(
                this.artworkId
            );

        if (recommendArtworkList) {
            console.log("Success");
            this.recommendedArtworks.push(...recommendArtworkList);
        } else {
            console.log("Something wrong.");
        }

        this.isLoading = false;
    },
};
</script>

<style scoped>
.border-bottom-dark {
    border-bottom: 3px solid dark !important;
}

@media screen and (min-width: 560px) {
    .penomy-tab {
        margin-right: 8px !important;
    }
}
</style>
