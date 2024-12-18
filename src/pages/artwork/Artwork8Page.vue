<template>
    <q-page>
        <section>Search text:</section>
        <section class="q-pa-lg">
            <AnimeChapterVideoInput />
        </section>
    </q-page>
</template>

<script>
import AnimeChapterVideoInput from "src/components/common/creatorStudio/AnimeChapterVideoInput.vue";

export default {
    name: "Artwork8Page",
    components: {
        AnimeChapterVideoInput,
    },
};
</script>

<!-- <script setup>
import { ref, computed } from "vue";
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
import { useRoute } from "vue-router";

const watchingAreaStore = useWatchingAreaStore();
const searchStore = useSearchStore();
const route = useRoute();

searchStore.setUp();

const showMenu = ref(false);
const showDialog = ref(false);
const searchText = ref(null);
const isProcessing = ref(false);
/**
 * @type {HTMLInputElement} The input element to input search text.
 */
const searchInput = ref(null);
const timeOutId = ref(null);
/**
 * @type {SearchResponseItem[]} Type of this list.
 */
const searchItems = ref([]);
computed({
    hasSearchItems() {
        return this.searchItems.length > 0;
    },
    hasSearchHistory() {
        return searchStore.hasSearchHistory;
    },
    searchHistory() {
        return searchStore.searchHistory;
    },
})

mounted(() => {
    // Bind the search input for later operation.
    searchInput.value = route.query.searchInput;

})

function onInputFocus() {
    this.showMenu = true;
}
function hideAdvancedSearch() {
    this.showMenu = false;
}
function displayAdvancedSearch() {
    this.showMenu = false;
    this.showDialog = true;
}
function getArtworkLink(artworkId) {
    if (watchingAreaStore.isComicArea) {
        return `/artwork/comic/${artworkId}`;
    }

    return `/artwork/anime/${artworkId}`;
}
function onInputSearch() {
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
}
function disablePreviousTimeout() {
    if (this.timeOutId != null) {
        clearTimeout(this.timeOutId);
    }
}
function handleRemoveItem(itemIndex) {
    searchStore.removeSearchHistory(itemIndex);
}
async function searchArtworkAsync() {
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
}

</script> -->
