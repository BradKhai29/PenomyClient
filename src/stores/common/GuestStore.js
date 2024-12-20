// Import dependencies section.
import { defineStore } from "pinia";
import { NumberHelper } from "src/helpers/NumberHelper";
import { ViewHistoryApiHandler } from "src/api.handlers/artwork/common/ViewHistoryApiHandler";

// Support constants for guest store.
const guestIdKeyName = "guest:id";

/**
 * Load the current guestId that stored in local storage for later operation.
 * @returns {String | null} The value of guestId.
 */
function internalLoadGuestId() {
    const guestId = localStorage.getItem(guestIdKeyName);

    const isValidId = NumberHelper.isNumber(guestId);

    // If the current guest id store in the local storage is valid
    // then return. Otherwise, return null to re-init the new guest.
    if (isValidId) {
        return guestId;
    }

    return null;
}

/**
 * Set the guestId to the local storage for next retrieve.
 *
 * @param {String} guestId The guestId value to set.
 */
function internalSetGuestId(guestId) {
    localStorage.setItem(guestIdKeyName, guestId);
}

const useGuestStore = defineStore("guestStore", {
    state: () => ({
        hasSetUp: false,
        guestId: null,
        /**
         * @type {Date} Type of this state property.
         */
        lastActiveAt: new Date(),
    }),

    getters: {
        currentGuestId() {
            return this.guestId;
        },
    },

    actions: {
        /**
         * Asynchronously set up the guest store before the application run
         * if the current user does not sign in yet.
         */
        async setUp() {
            if (this.hasSetUp) {
                return;
            }

            // Try to load the guestId from the local-storage.
            const loadedGuestId = internalLoadGuestId();

            // If the guestId load success, then try to load the guest tracking record.
            if (loadedGuestId) {
                const loadedGuestTracking =
                    await ViewHistoryApiHandler.getGuestTrackingAsync(
                        loadedGuestId
                    );

                // After loading the guest tracking, re-check if the current guestId
                // is existed or not based on the return value for the api handler.
                if (loadedGuestTracking) {
                    this.guestId = loadedGuestId;
                    this.lastActiveAt = new Date(
                        loadedGuestTracking.lastActiveAt
                    );
                }
                // Otherwise re-init new guest tracking record for current user.
                else {
                    this.initNewGuestTrackingRecordAsync();
                }
            }
            // If the loaded guest id is null, init new guest tracking record.
            else {
                this.initNewGuestTrackingRecordAsync();
            }

            // Mark the setup flag to true.
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
        async initNewGuestTrackingRecordAsync() {
            const guestTrackingRecord =
                await ViewHistoryApiHandler.initGuestViewHistoryAsync();

            this.guestId = guestTrackingRecord.guestId;
            this.lastActiveAt = new Date(guestTrackingRecord.lastActiveAt);

            // Set the new guestId to local storage.
            internalSetGuestId(this.guestId);
        },
        normalizedLastActiveAt() {
            return this.lastActiveAt.toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true, // use 24-hour format
            });
        },
    },
});

export { useGuestStore };
