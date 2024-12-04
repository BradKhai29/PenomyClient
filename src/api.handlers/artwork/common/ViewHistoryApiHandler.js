import axios from "axios";
import { HttpMethod } from "src/api.common/HttpMethod";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";

// Models for mapping api response section.
import { GuestTrackingResponseItem } from "src/api.models/artwork/common/GuestTrackingResponseItem";
import { ViewHistoryArtworkResponseItem } from "src/api.models/artwork/common/ViewHistoryArtworkResponseItem";

// Init store for later operation.
import { useAuthStore } from "src/stores/common/AuthStore";

const authStore = useAuthStore();
/**
 * Init a new guest view history record to track the current guest activity.
 *
 * @returns {Promise<GuestTrackingResponseItem> | null} Return null if the init guest operation is failed.
 */
async function initGuestViewHistoryAsync() {
    const apiUrl = `${BaseWebApiUrl}/g25/guest/init-history`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.POST,
        });

        return GuestTrackingResponseItem.mapFrom(response.data.body);
    } catch (error) {
        return null;
    }
}

/**
 * Get the guest tracking detail of the specified guestId.
 *
 * @param {String} guestId Id of the guest to get the tracking detail.
 * @returns {Promise<GuestTrackingResponseItem> | null} Return null if the guestId is not found.
 * Otherwise, return GuestTrackingResponseItem instance contain detail of the specified guest.
 */
async function getGuestTrackingAsync(guestId) {
    const apiUrl = `${BaseWebApiUrl}/g25/guest`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            params: {
                guestId: guestId,
            },
        });

        return GuestTrackingResponseItem.mapFrom(response.data.body);
    } catch (error) {
        console.log(error);

        return null;
    }
}

/**
 * Add the view history of the current chapter for
 * user later retrived in their preference section.
 *
 * @param {String} artworkId Id of the artwork that contains the current chapter.
 * @param {String} chapterId Id of the current chapter.
 * @returns {Promise<Boolean>} The promise contains the result of operation. True if the operation is success.
 */
async function addUserViewHistoryAsync(artworkId, chapterId) {
    const apiUrl = `${BaseWebApiUrl}/g25/user/add-history`;

    try {
        await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            data: {
                artworkId: artworkId,
                chapterId: chapterId,
            },
        });

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

/**
 * Add the view history of the current chapter for
 * the guest user later retrived in their view history section.
 *
 * @param {String} artworkId Id of the artwork that contains the current chapter.
 * @param {String} chapterId Id of the current chapter.
 * @param {String} guestId Id of the guest (if no auth).
 * @returns {Promise<Boolean>} The promise contains the result of operation. True if the operation is success.
 */
async function addGuestViewHistoryAsync(artworkId, chapterId, guestId) {
    const apiUrl = `${BaseWebApiUrl}/g25/guest/add-history`;

    try {
        await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            data: {
                guestId: guestId,
                artworkId: artworkId,
                chapterId: chapterId,
            },
        });

        return true;
    } catch (error) {
        console.log(error);

        return false;
    }
}

/**
 * Add the view history of the current chapter for
 * later retrived in the preference / personal profile section.
 *
 * @param {String} artworkId Id of the artwork that contains the current chapter.
 * @param {String} chapterId Id of the current chapter.
 * @param {String} guestId Id of the guest (if no auth).
 * @returns {Promise<Boolean>} The promise contains the result of operation. True if the operation is success.
 */
function addViewHistoryAsync(artworkId, chapterId, guestId) {
    if (authStore.isAuth) {
        return addUserViewHistoryAsync(artworkId, chapterId);
    }

    return addGuestViewHistoryAsync(artworkId, chapterId, guestId);
}

const ArtworkTypes = {
    COMIC: 1,
    ANIME: 2,
};

/**
 * Get the guest view history by the specified id and artworkType.
 *
 * @param {String} guestId Id of the guest to get the view history.
 * @param {Number} [artworkType=ArtworkTypes.COMIC] The type of artwork to get the view history. (Default is set to comic is not specified)
 * @returns {Promise<Array> | null} The list of viewed artworks of the current guest. Return null if the api call is failed.
 */
async function getGuestViewHistoryAsync(
    guestId,
    artworkType = ArtworkTypes.COMIC
) {
    const apiUrl = `${BaseWebApiUrl}/g25/guest/view-history`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            params: {
                guestId: guestId,
                artworkType: artworkType,
            },
        });

        return ViewHistoryArtworkResponseItem.mapFromArray(response.data.body);
    } catch (error) {
        console.log(error);

        return null;
    }
}

/**
 * Get the guest view history by the specified id and artworkType.
 *
 * @param {Number} [artworkType=ArtworkTypes.COMIC] The type of artwork to get the view history. (Default is set to comic is not specified)
 * @param {Number} [pageNum=1] The page number to get the view history when pagination available. (Default pageNumber is set to 1 if not specified)
 * @returns {Promise<Array> | null} The list of viewed artworks of the current guest. Return null if the api call is failed.
 */
async function getUserViewHistoryAsync(
    artworkType = ArtworkTypes.COMIC,
    pageNum = 1
) {
    const apiUrl = `${BaseWebApiUrl}/g25/user/view-history`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            params: {
                artworkType: artworkType,
                pageNum: pageNum,
            },
        });

        return ViewHistoryArtworkResponseItem.mapFromArray(response.data.body);
    } catch (error) {
        console.log(error);

        return null;
    }
}

/**
 * Remove the guest history item by the specified artworkId.
 *
 * @param {String} guestId Id of the guest to remove the history item.
 * @param {String} artworkId Id of the artwork item to remove.
 * @returns {Promise<Boolean>} The promise contains the operation result.
 */
async function removeGuestHistoryItemAsync(guestId, artworkId) {
    const apiUrl = `${BaseWebApiUrl}/g25/guest/remove-history`;

    try {
        await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            data: {
                guestId: guestId,
                artworkId: artworkId,
            },
        });

        return true;
    } catch (error) {
        console.log(error);

        return false;
    }
}

/**
 * Remove the user history item by the specified artworkId.
 *
 * @param {String} artworkId Id of the artwork item to remove.
 * @returns {Promise<Boolean>} The promise contains the operation result.
 */
async function removeUserHistoryItemAsync(artworkId) {
    const apiUrl = `${BaseWebApiUrl}/g25/user/remove-history`;

    try {
        await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            data: {
                artworkId: artworkId,
            },
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
        });

        return true;
    } catch (error) {
        console.log(error);

        return false;
    }
}

const ViewHistoryApiHandler = {
    initGuestViewHistoryAsync,
    addViewHistoryAsync,
    getGuestTrackingAsync,
    getGuestViewHistoryAsync,
    getUserViewHistoryAsync,
    removeGuestHistoryItemAsync,
    removeUserHistoryItemAsync,
};

export { ViewHistoryApiHandler };
