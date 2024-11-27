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
        normalizedLastActiveAt() {
            return this.lastActiveAt.toLocaleString("vi-VN", {
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

    actions: {
        /**
         * Asynchronously set up the guest store before the application run
         * if the current user does not sign in yet.
         */
        async setUp() {
            // Try to load the guestId from the local-storage.
            const loadedGuestId = internalLoadGuestId();

            // If the guestId load success, then try to load the view history.
            if (loadedGuestId) {
                const loadedGuestTracking =
                    await ViewHistoryApiHandler.getGuestTrackingAsync(
                        loadedGuestId
                    );

                // After loading the view history, re-check if the current guestId
                // is existed or not based on the return value for the api handler.
                if (loadedGuestTracking) {
                    this.guestId = loadedGuestId;
                    this.lastActiveAt = loadedGuestTracking.lastActiveAt;
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
        },
        async initNewGuestTrackingRecordAsync() {
            const guestTrackingRecord =
                await ViewHistoryApiHandler.initGuestViewHistoryAsync();

            this.guestId = guestTrackingRecord.guestId;
            this.lastActiveAt = guestTrackingRecord.lastActiveAt;

            // Set the new guestId to local storage.
            internalSetGuestId(this.guestId);
        },
    },
});

export { useGuestStore };
