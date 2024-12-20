<template>
    <section id="search-bar-section">
        <teleport to="#q-app">
            <div
                v-show="showMenu"
                class="search-bar-blur-light"
                @click="hideAdvancedSearch"
            ></div>
        </teleport>
        <div
            class="search-bar-blur"
            v-show="showMenu"
            @click="hideAdvancedSearch"
        ></div>
        <section class="search-bar">
            <div class="row col-grow search-bar-input-section">
                <input
                    v-model="searchText"
                    @focus="onInputFocus"
                    @input="onInputSearch"
                    placeholder="Tìm kiếm"
                    class="bg-white col search-bar-input text-subtitle1 q-py-md"
                    ref="searchBarInput"
                />
                <q-btn
                    dense
                    round
                    class="bg-dark q-ml-xs"
                    text-color="white"
                    icon="search"
                    :disable="isProcessing"
                    :loading="isProcessing"
                />
            </div>
            <div
                v-show="showMenu && hasSearchHistory"
                class="search-bar-menu bg-light-100 shadow-1"
            >
                <!-- <div class="flex q-mb-md">
                    <q-btn
                        id="btn-login"
                        no-caps
                        class="bg-dark text-light flex col-grow radius-4"
                        @click="displayAdvancedSearch"
                    >
                        <q-icon name="zoom_in" size="sm" />
                        <span class="q-ml-sm text-subtitle1"
                            >Tìm kiếm nâng cao</span
                        >
                    </q-btn>
                </div> -->
                <!-- Display if user does not trigger search -->
                <ul
                    v-if="!hasSearchItems && hasSearchHistory"
                    id="search-bar-menu-item-list"
                >
                    <SearchBarItem
                        v-for="(keyword, index) in searchHistory"
                        :key="index"
                        :label="keyword"
                        :index="index"
                        @click="showMenu = false"
                        @removeItem="handleRemoveItem"
                    />
                </ul>

                <ul v-else-if="hasSearchItems" id="search-bar-menu-item-list">
                    <li v-for="artwork in searchItems" :key="artwork.id">
                        <router-link
                            @click="showMenu = false"
                            class="underline-none"
                            :to="getArtworkLink(artwork.id)"
                        >
                            <div
                                class="flex items-center q-pa-sm bg-light-300 q-mb-sm border-radius-sm align-stretch"
                            >
                                <div
                                    class="artwork-recommend-image border-radius-sm shadow-1"
                                >
                                    <q-img
                                        :src="artwork.avatar"
                                        :ratio="1"
                                        width="100%"
                                        height="100%"
                                    />
                                </div>

                                <div class="q-ml-sm text-dark flex-grow">
                                    <p
                                        class="artwork-item-name text-subtitle1 text-weight-bold q-mb-none"
                                    >
                                        {{ artwork.name }}
                                    </p>

                                    <div class="flex items-center q-mb-xs">
                                        <span
                                            class="star-rate flex items-center"
                                        >
                                            <q-icon
                                                name="star"
                                                size="20px"
                                                class="text-primary"
                                            />
                                            <span
                                                style="margin-left: 2px"
                                                class="text-subtitle2 text-weight-bold"
                                            >
                                                {{ artwork.averageStarRates }}
                                            </span>
                                        </span>

                                        <span
                                            class="q-ml-md total-followers flex items-center"
                                        >
                                            <q-icon
                                                name="person_add"
                                                size="20px"
                                                class="text-primary"
                                            />
                                            <span
                                                style="margin-left: 2px"
                                                class="text-subtitle2 text-weight-bold"
                                            >
                                                {{ artwork.numberOfFollowers }}
                                            </span>
                                        </span>
                                    </div>

                                    <div class="flex items-center">
                                        <span
                                            style="padding: 2px 4px"
                                            class="bg-dark flex items-center border-radius-sm"
                                        >
                                            <q-icon
                                                name="circle"
                                                class="text-primary"
                                            />
                                            <span class="q-ml-xs text-light"
                                                >Còn cập nhật</span
                                            >
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>

            <q-dialog v-model="showDialog" position="top">
                <TheAdvancedSearchModal />
            </q-dialog>
        </section>
    </section>
</template>

<script>
// Import dependencies section.
import { StringHelper } from "src/helpers/StringHelper";
import { SearchResponseItem } from "src/api.models/artwork/search/SearchResponseItem.js";
import { SearchApiHandler } from "src/api.handlers/artwork/common/SearchApiHandler.js";
import { ArrayHelper } from "src/helpers/ArrayHelper";

// Import components section.
import SearchBarItem from "./TheSearchBarItem.vue";
import TheAdvancedSearchModal from "components/common/artwork/advancedSearch/TheAdvancedSearchModal.vue";

// Support constants.
const DELAY_TRIGGER_SEARCH_TIMEOUT = 1000;

// Init store for later operation.
import { useWatchingAreaStore } from "src/stores/common/WatchingAreaStore";
import { useSearchStore } from "src/stores/common/SearchStore";

const watchingAreaStore = useWatchingAreaStore();
const searchStore = useSearchStore();
searchStore.setUp();

export default {
    name: "TheSearchBar",
    components: {
        SearchBarItem,
        TheAdvancedSearchModal,
    },
    data() {
        return {
            showMenu: false,
            showDialog: false,
            searchText: null,
            isProcessing: false,
            /**
             * @type {HTMLInputElement} The input element to input search text.
             */
            searchInput: null,
            timeOutId: null,
            /**
             * @type {SearchResponseItem[]} Type of this list.
             */
            searchItems: [],
        };
    },
    computed: {
        hasSearchItems() {
            return this.searchItems.length > 0;
        },
        hasSearchHistory() {
            return searchStore.hasSearchHistory;
        },
        searchHistory() {
            return searchStore.searchHistory;
        },
    },
    mounted() {
        // Bind the search input for later operation.
        this.searchInput = this.$refs.searchBarInput;
        this.searchInput.addEventListener("keydown", this.handleOnKeyDown);
    },
    methods: {
        /**
         * @param {KeyboardEvent} event Tracking the keyboard event to trigger correct action.
         */
        handleOnKeyDown(event) {
            const pressKey = event.key.toLocaleLowerCase();
            const ENTER_KEY = "enter";

            if (pressKey != ENTER_KEY) {
                return;
            }

            if (this.searchText != null && this.searchText.length > 0) {
                this.disablePreviousTimeout();
                this.isProcessing = false;
                this.showMenu = false;

                this.$router.push(
                    `/artwork/search?searchText=${this.searchText}`
                );
            }
        },
        onInputFocus() {
            this.showMenu = true;
        },
        hideAdvancedSearch() {
            this.showMenu = false;
        },
        displayAdvancedSearch() {
            this.showMenu = false;
            this.showDialog = true;
        },
        getArtworkLink(artworkId) {
            if (watchingAreaStore.isComicArea) {
                return `/artwork/comic/${artworkId}`;
            }

            return `/artwork/anime/${artworkId}`;
        },
        onInputSearch() {
            const inputValue = this.searchInput.value + "";

            // If user triggers rapidly the search bar, then wait until
            // the user finishes to type their search text.
            this.disablePreviousTimeout();

            // Check if the input value is empty or white space to disable when search.
            const isEmpty = StringHelper.isNullOrEmpty(inputValue);

            if (isEmpty) {
                this.isProcessing = false;
                ArrayHelper.clear(this.searchItems);

                return;
            }

            // Turn on isProcessing flag when searching.
            this.isProcessing = true;

            this.timeOutId = setTimeout(() => {
                this.searchArtworkAsync();
            }, DELAY_TRIGGER_SEARCH_TIMEOUT);
        },
        disablePreviousTimeout() {
            if (this.timeOutId != null) {
                clearTimeout(this.timeOutId);
            }
        },
        handleRemoveItem(itemIndex) {
            searchStore.removeSearchHistory(itemIndex);
        },
        async searchArtworkAsync() {
            const isEmpty = StringHelper.isNullOrEmpty(this.searchText);

            if (isEmpty) {
                this.isProcessing = false;
                return;
            }

            console.log("Trigger search");
            const searchResult = await SearchApiHandler.searchComicAsync(
                this.searchText
            );

            if (searchResult) {
                searchStore.addSearchHistory(this.searchText);

                ArrayHelper.clear(this.searchItems);

                this.searchItems.push(...searchResult);
            }

            this.isProcessing = false;
            this.timeOutId = null;
        },
    },
};
</script>

<style scoped>
.radius-4 {
    border-radius: 4px;
}

.search-bar {
    --max-width: 540px;
    --min-width: 300px;

    width: clamp(
        var(--min-width),
        calc(100vw - var(--max-width)),
        var(--max-width)
    );

    position: relative;
}

.search-bar-input-section {
    position: absolute;
    top: 0;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    z-index: 9999 !important;
}

.search-bar-blur-light {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.search-bar-blur {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    z-index: 200 !important;
    background-color: black;
    opacity: 0.2;
}

.search-bar-input {
    --light-300: #eeeeee;

    border: none;
    border-radius: 32px;
    outline: none;
    padding: 0px 16px;
    background-color: var(--light-300) !important;
}

.search-bar-menu {
    --search-bar-input-height: 36px;
    --offset: 8px;
    --padding: 12px;
    --border-radius: 6.4px;

    position: absolute;
    z-index: 999;
    top: calc(var(--search-bar-input-height) - var(--offset));
    right: 0;
    left: 0;
    padding: var(--padding);
    border-radius: var(--border-radius);
}

#search-bar-menu-item-list {
    padding: 0 !important;
    margin: 0;
    list-style-type: none !important;
}

/* Artwork search result item */
.artwork-recommend-image {
    --width: 80px;
    --height: var(--width);

    width: var(--width);
    height: var(--height);
}

.artwork-item-name {
    max-width: 320px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
