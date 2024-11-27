class GuestTrackingResponseItem {
    /**
     * @param {String} guestId Id of the guest.
     * @param {String} lastActiveAt The datetime ISO string represented the last active time of the current guest.
     */
    constructor(guestId, lastActiveAt) {
        this.guestId = guestId;
        this.lastActiveAt = lastActiveAt;
    }

    /**
     * Map the input api response to GuestTrackingResponseItem instance.
     *
     * @param {GuestTrackingResponseItem} apiResponse The api response to map from.
     * @returns {GuestTrackingResponseItem} An instance of GuestTrackingResponseItem after mapping.
     */
    static mapFrom(apiResponse) {
        return new GuestTrackingResponseItem(
            apiResponse.guestId,
            apiResponse.lastActiveAt
        );
    }
}

export { GuestTrackingResponseItem };
