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
                    class="bg-dark text-light border-radius-sm q-px-sm text-subtitle1"
                >
                    Đã tạo: {{ paginationOption.totalArtworks }}
                </q-btn>
                <q-btn
                    to="/studio/comic/create"
                    no-caps
                    dense
                    color="grey-3"
                    class="text-dark border-radius-sm shadow-1 q-ml-sm q-px-sm text-subtitle1"
                >
                    <span class="q-mr-xs">Tạo mới</span>
                    <q-icon name="add_circle" size="xs" />

                    <q-tooltip
                        anchor="center right"
                        self="center left"
                        :offset="[4, 10]"
                    >
                        <strong class="text-subtitle2">
                            Tạo mới truyện tranh
                        </strong>
                    </q-tooltip>
                </q-btn>
            </div>
        </div>
        <div
            v-for="(artwork, index) in displayArtworks"
            :key="artwork.id"
            class="artwork-card-wrapper q-mb-md"
        >
            <ArtworkDetailCard
                v-bind="artwork"
                :isComic="loadComic"
                :itemOrder="index + 1"
                @removeItem="handleRemoveItem"
            />
        </div>
        <div :id="`${componentId}_footer`" class="row">
            <q-btn
                v-if="!reachMaxPage"
                no-caps
                :loading="isProcessing || isLoading"
                @click="loadNextPage"
                class="col-grow text-light bg-dark text-subtitle1 text-weight-bold"
            >
                Tải thêm
            </q-btn>
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
import { PaginationOptionResponseItem } from "src/api.models/creatorStudio/creatorStudio5Page/PaginationOptionResponseItem";
import { useCreatorStudio5Store } from "src/stores/pages/creatorStudio5/CreatorStudio5Store";

// Import component sections.
import ArtworkDetailCard from "./ArtworkDetailCard.vue";

const store = useCreatorStudio5Store();

export default {
    name: "ArtworkSection",
    emits: ["updateSection"],
    components: {
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
            reachMaxPage: true,
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
                if (this.paginationOption.totalPages > 0) {
                    this.reachMaxPage =
                        this.currentPageNumber ==
                        this.paginationOption.totalPages;
                }
            }
        });

        // Load the artworks with pagination.
        await this.getArtworksByPaginationAsync();

        // Turn off the flags after loading success.
        this.isLoading = false;
        this.isProcessing = false;
    },
    methods: {
        loadNextPage() {
            if (this.currentPageNumber < this.paginationOption.totalPages) {
                this.currentPageNumber++;
            }
        },
        async getArtworksByPaginationAsync() {
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

            // Turn off the flag and display the artwork list that fetched from the webapi.
            this.isProcessing = false;
            if (result) {
                this.displayArtworks.push(...result);
            }
        },
        handleRemoveItem(artworkId) {
            const foundIndex = this.displayArtworks.findIndex(
                (item) => item.id == artworkId
            );

            const notFoundIndex = -1;
            if (foundIndex == notFoundIndex) {
                return;
            }

            // Remove the items from the display artwork list.
            this.displayArtworks.splice(foundIndex, 1);
            this.paginationOption.totalArtworks--;

            if (this.loadComic) {
                store.setTotalComics(this.paginationOption.totalArtworks);
            } else {
                store.setTotalAnimations(this.paginationOption.totalArtworks);
            }

            this.$emit("updateSection");
        },
    },
    watch: {
        currentPageNumber() {
            this.reachMaxPage =
                this.currentPageNumber >= this.paginationOption.totalPages;

            this.getArtworksByPaginationAsync();
        },
    },
};
</script>
