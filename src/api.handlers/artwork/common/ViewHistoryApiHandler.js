import axios from "axios";
import { HttpMethod } from "src/api.common/HttpMethod";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { GuestTrackingResponseItem } from "src/api.models/artwork/common/GuestTrackingResponseItem";

// Init authStore for later operation.
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
    const apiUrl = `${BaseWebApiUrl}/g25/guest/add-history`;
}

/**
 * Add the view history of the current chapter for
 * the guest user later retrived in their view history section.
 *
 * @param {String} artworkId Id of the artwork that contains the current chapter.
 * @param {String} chapterId Id of the current chapter.
 * @returns {Promise<Boolean>} The promise contains the result of operation. True if the operation is success.
 */
async function addGuestViewHistoryAsync(artworkId, chapterId) {
    const apiUrl = `${BaseWebApiUrl}/g25/user/add-history`;

    try {
        axios({
            url: apiUrl,
            method: HttpMethod.POST,
            data: {},
        });
    } catch (error) {}
}

/**
 * Add the view history of the current chapter for
 * later retrived in the preference / personal profile section.
 *
 * @param {String} artworkId Id of the artwork that contains the current chapter.
 * @param {String} chapterId Id of the current chapter.
 * @returns {Promise<Boolean>} The promise contains the result of operation. True if the operation is success.
 */
function addViewHistoryAsync(artworkId, chapterId) {
    if (authStore.isAuth) {
        return addUserViewHistoryAsync(artworkId, chapterId);
    }

    return addGuestViewHistoryAsync(artworkId, chapterId);
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

        return response.data.body;
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

        return response.data.body;
    } catch (error) {
        console.log(error);

        return null;
    }
}

const ViewHistoryApiHandler = {
    initGuestViewHistoryAsync,
    addViewHistoryAsync,
    getGuestTrackingAsync,
    getGuestViewHistoryAsync,
    getUserViewHistoryAsync,
};

export { ViewHistoryApiHandler };
