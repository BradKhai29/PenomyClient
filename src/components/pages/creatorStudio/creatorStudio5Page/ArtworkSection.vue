<template>
    <section :id="componentId" v-if="!isLoading">
        <div
            :id="`${componentId}_header`"
            class="flex justify-between items-center q-mb-sm"
        >
            <div :id="`${componentId}_header_interactions_buttons`">
                <q-btn
                    no-caps
                    dense
                    unelevated
                    class="bg-dark text-light q-px-sm text-subtitle1"
                >
                    Đã tạo: {{ paginationOption.totalArtworks }}
                </q-btn>
                <router-link to="/studio/comic/create">
                    <q-btn
                        no-caps
                        dense
                        color="grey-3"
                        unelevated
                        class="text-dark q-ml-sm q-px-sm text-subtitle1"
                    >
                        <span class="q-mr-xs">Tạo mới</span>
                        <q-icon name="add_circle" size="xs" />
                    </q-btn>
                </router-link>
            </div>
            <div :id="`${componentId}_pagination`">
                <AppPagination
                    v-if="paginationOption.allowPagination"
                    v-model="currentPageNumber"
                    :max="paginationOption.totalPages"
                    :showBoundaryLinks="false"
                    :showInput="true"
                    :disable="isProcessing"
                />
            </div>
        </div>
        <div
            v-for="artwork in displayArtworks"
            :key="artwork.id"
            class="artwork-card-wrapper q-mb-md"
        >
            <ArtworkDetailCard :artworkId="artwork.id" v-bind="artwork" />
        </div>
    </section>
</template>

<script>
// Import dependencies section.
import {
    ArtworkTypes,
    CreatorStudio5ApiHandler,
} from "src/api.handlers/creatorStudio/creatorStudio5Page/CreatorStudio5ApiHandler";
import { ArtworkDetailResponseItem } from "src/api.models/creatorStudio/creatorStudio5Page/ArtworkDetailResponseItem";
import { ArtworkPaginationManager } from "src/api.models/creatorStudio/creatorStudio5Page/ArtworkPaginationManager";
import { PaginationOptionResponseItem } from "src/api.models/creatorStudio/creatorStudio5Page/PaginationOptionResponseItem";

// Import component sections.
import AppPagination from "src/components/common/others/AppPagination.vue";
import ArtworkDetailCard from "./ArtworkDetailCard.vue";

export default {
    name: "ArtworkSection",
    components: {
        AppPagination,
        ArtworkDetailCard,
    },
    props: {
        /**
         * Indicate this artwork section to load artwork of type comic or animation.
         *
         * @note The default value (loadComic = true) to load the comic.
         */
        loadComic: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            componentId: null,
            isLoading: true,
            /**
             * Indicate that the current component is
             * waiting for the webapi to process the request.
             * @note The default value is (false).
             */
            isProcessing: false,
            /**
             * @type {PaginationOptionResponseItem} The pagination option support to display pagination bar.
             */
            paginationOption: {
                allowPagination: false,
                totalPages: 1,
                totalArtworks: 0,
            },
            /**
             * The current page number that indicated on the pagination bar.
             *
             * @type {Number} The type of this refs.
             */
            currentPageNumber: 1,
            /**
             * The manager instance that used to manage the pagination.
             *
             * @type {ArtworkPaginationManager} The type of this property.
             * @readonly This property is readonly.
             */
            artworkPaginationManager: new ArtworkPaginationManager(),
            /**
             * The list of artworks that will be displayed when pagination.
             *
             * @type {ArtworkDetailResponseItem[]} The type of artwork list.
             */
            displayArtworks: [],
        };
    },
    async mounted() {
        // Set the component id based on the props (loadComic).
        if (this.loadComic) {
            this.componentId = "comic_section";
        } else {
            this.componentId = "animation_section";
        }

        // Turn on the flags to load the needed states for this components.
        this.isLoading = true;
        this.isProcessing = true;

        // Fetch the pagination option first.
        CreatorStudio5ApiHandler.getPaginationOptionsAsync().then((result) => {
            if (result) {
                this.paginationOption = result;
            }
        });

        // Load the artworks with pagination.
        await this.getArtworksByPaginationAsync();

        // Turn off the flags after loading success.
        this.isLoading = false;
        this.isProcessing = false;
    },
    methods: {
        async getArtworksByPaginationAsync() {
            // Check if the entry is existed or not from the artwork pagination manager.
            const foundEntry = this.artworkPaginationManager.getEntry(
                this.currentPageNumber
            );

            // Display the belonged artwork list that stored in the entry.
            if (foundEntry) {
                this.displayArtworks = foundEntry.artworkList;

                return;
            }

            // Indicate the artwork type to load for
            // this section based on the props (loadComic).
            const artworkTypeToLoad = this.loadComic
                ? ArtworkTypes.COMIC
                : ArtworkTypes.ANIMATION;

            // Turn on the flag when call the api.
            this.isProcessing = true;

            const result =
                await CreatorStudio5ApiHandler.getArtworksByTypeWithPaginationAsync(
                    artworkTypeToLoad,
                    this.currentPageNumber
                );

            // Add the loaded result as an entry the artwork pagination manager.
            if (result) {
                const key = this.currentPageNumber;
                this.artworkPaginationManager.addEntry(key, result);
            }

            // Turn off the flag and display the artwork list that fetched from the webapi.
            this.isProcessing = false;
            this.displayArtworks = result;
        },
    },
    watch: {
        currentPageNumber() {
            this.getArtworksByPaginationAsync();
        },
    },
};
</script>
