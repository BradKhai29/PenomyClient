// Import dependencies section.
import { defineStore } from "pinia";
import { CreatorStudioDeletedManagerApiHandler } from "src/api.handlers/creatorStudio/common/CreatorStudioDeletedManagerApiHandler";
import { CheckDeleteItemsResponseDto } from "src/api.models/creatorStudio/creatorStudio25Page/CheckDeleteItemsResponseDto";

const useCreatorStore = defineStore("creatorStore", {
    state: () => ({
        hasSetUp: false,
        studioBinStatus: new CheckDeleteItemsResponseDto(),
    }),

    getters: {
        /**
         * Check if the current creator has any deleted artwork items.
         *
         * @returns {Boolean} Return true if the current creator has any deleted artwork items.
         */
        hasDeletedItems() {
            return this.totalDeletedComics > 0 || this.totalDeletedAnimes > 0;
        },
        /**
         * Get the total deleted comics has been deleted by current creator.
         *
         * @returns {Number} The total deleted comics of current creator studio.
         */
        totalDeletedComics() {
            return this.studioBinStatus.totalDeletedComics;
        },
        /**
         * Get the total deleted animes has been deleted by current creator.
         *
         * @returns {Number} The total deleted animes of current creator studio.
         */
        totalDeletedAnimes() {
            return this.studioBinStatus.totalDeletedAnimes;
        },
    },

    actions: {
        /**
         * Asynchronously set up the creator store before
         * the current creator accesses the creator studio section.
         *
         * @param {String} bearerAccessToken Bearer access token of current creator.
         */
        async setUp() {
            if (this.hasSetUp) {
                return;
            }

            const currentBinStatus =
                await CreatorStudioDeletedManagerApiHandler.checkCreatorStudioBinStatusAsync();

            if (currentBinStatus != null) {
                this.studioBinStatus.totalDeletedAnimes =
                    currentBinStatus.totalDeletedAnimes;
                this.studioBinStatus.totalDeletedComics =
                    currentBinStatus.totalDeletedComics;
            }

            this.hasSetUp = true;
        },
        /**
         * Internal wait for the set up operation to complete before accessing the store.
         *
         * @returns {Promise<void>} The Promise of the operation.
         */
        async waitForSetUp() {
            if (this.hasSetUp) {
                return new Promise((resolve) => {
                    resolve("COMPLETED");
                });
            }

            // Check the isProcessing flag every 50 ms
            const CHECKING_INTERVAL_TIMEOUT = 50;

            return new Promise((resolve) => {
                const intervalId = setInterval(() => {
                    if (this.hasSetUp) {
                        // Stop checking once it's false
                        clearInterval(intervalId);

                        resolve("COMPLETED");
                    }
                }, CHECKING_INTERVAL_TIMEOUT);
            });
        },
        setTotalDeletedComics(value) {
            this.studioBinStatus.totalDeletedComics = value;
        },
        setTotalDeletedAnimes(value) {
            this.studioBinStatus.totalDeletedAnimes = value;
        },
    },
});

export { useCreatorStore };
