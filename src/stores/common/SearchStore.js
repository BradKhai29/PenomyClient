// Import dependencies section.
import { defineStore } from "pinia";

// Support constants for store.
const MAX_PERSIST_HISTORY_ITEMS = 10;
const SEARCH_HISTORY_KEY = "user:search_history";

const useSearchStore = defineStore("searchStore", {
    state: () => ({
        /**
         * @type {String[]} The array of search keywords.
         */
        userSearchHistory: [],
    }),

    getters: {
        /**
         * @returns {String[]} The list of search keywords.
         */
        searchHistory() {
            return this.userSearchHistory;
        },
        /**
         *
         * @returns {Boolean} Return true if the search history is not empty.
         */
        hasSearchHistory() {
            return this.searchHistory.length > 0;
        },
    },

    actions: {
        persistToLocalStorage() {
            // Save the search history to local storage.
            const searchHistoryItems = JSON.stringify(this.searchHistory);

            localStorage.setItem(SEARCH_HISTORY_KEY, searchHistoryItems);
        },
        loadFromLocalStorage() {
            try {
                const searchHistoryItems = JSON.parse(
                    localStorage.getItem(SEARCH_HISTORY_KEY)
                );

                this.userSearchHistory = [...searchHistoryItems];
            } catch (error) {
                console.log(error);

                this.userSearchHistory = [];
            }
        },
        setUp() {
            this.loadFromLocalStorage();
        },
        addSearchHistory(searchText) {
            this.userSearchHistory.unshift(searchText);

            if (this.userSearchHistory.length > MAX_PERSIST_HISTORY_ITEMS) {
                this.userSearchHistory.pop();
            }

            this.persistToLocalStorage();
        },
        removeSearchHistory(index) {
            if (index < 0 || index >= this.searchHistory.length) {
                return;
            }

            this.searchHistory.splice(index, 1);

            this.persistToLocalStorage();
        },
    },
});

export { useSearchStore };
