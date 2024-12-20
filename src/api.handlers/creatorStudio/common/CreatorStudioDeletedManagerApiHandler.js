import axios from "axios";

import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { CheckDeleteItemsResponseDto } from "src/api.models/creatorStudio/creatorStudio25Page/CheckDeleteItemsResponseDto";
import { ArtworkTypes } from "../creatorStudio5Page/CreatorStudio5ApiHandler";
import { DeletedArtworkItemResponseDto } from "src/api.models/creatorStudio/creatorStudio25Page/DeletedArtworkItemResponseDto";

// Init store for later operation.
import { useAuthStore } from "src/stores/common/AuthStore";
const authStore = useAuthStore();

/**
 * Check the current creator studio's bin (temporarily deleted storage status).
 *
 * @returns {Promise<CheckDeleteItemsResponseDto> | null} The response item contains detail of checking deleted status. Return null if call api failed.
 */
async function checkCreatorStudioBinStatusAsync() {
    const apiUrl = `${BaseWebApiUrl}/art3/deleted/check`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
        });

        return CheckDeleteItemsResponseDto.mapFrom(response.data.body);
    } catch (error) {
        console.log(error);

        return null;
    }
}

/**
 * Get all temporarily removed items from current creator by specified artwork type.
 *
 * @param {Number} artworkType The type of the artwork to get the list of remove items.
 * @returns {Promise<DeletedArtworkItemResponseDto[]>} The list of temp removed items, or null if call api failed.
 */
async function getAllTempRemovedItemsByArtworkTypeAsync(
    artworkType = ArtworkTypes.COMIC
) {
    const apiUrl = `${BaseWebApiUrl}/art3/deleted/artworks`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            params: {
                artworkType: artworkType,
            },
        });

        const tempRemovedItems = DeletedArtworkItemResponseDto.mapFromArray(
            response.data.body
        );

        return tempRemovedItems;
    } catch (error) {
        console.log(error);

        return null;
    }
}

/**
 * Remove the selected artworks by input list of artwork ids.
 *
 * @param {Number[]} artworkIds List of artwork ids to be removed.
 * @returns {Promise<Boolean>} Return true if operation success. Otherwise, false.
 */
async function removeSelectedArtworksAsync(artworkIds) {
    const apiUrl = `${BaseWebApiUrl}/art3/deleted/remove`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            data: {
                artworkIds: artworkIds,
            },
        });

        return true;
    } catch (error) {
        console.log(error);

        return false;
    }
}

/**
 * Restore the selected artworks by input list of artwork ids.
 *
 * @param {Number[]} artworkIds List of artwork ids to be restored.
 * @returns {Promise<Boolean>} Return true if operation success. Otherwise, false.
 */
async function restoreSelectedArtworksAsync(artworkIds) {
    const apiUrl = `${BaseWebApiUrl}/art3/deleted/restore`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            data: {
                artworkIds: artworkIds,
            },
        });

        return true;
    } catch (error) {
        console.log(error);

        return false;
    }
}

/**
 * Restore all the temporarily removed artworks.
 *
 * @param {number} [artworkType=ArtworkTypes.COMIC] The section of artwork type to restore.
 * @returns {Promise<Boolean>} Return true if operation success. Otherwise, false.
 */
async function restoreAllTempRemovedItemsAsync(
    artworkType = ArtworkTypes.COMIC
) {
    const apiUrl = `${BaseWebApiUrl}/art3/restore/artworks/all`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            data: {
                artworkType: artworkType,
            },
        });

        return true;
    } catch (error) {
        console.log(error);

        return false;
    }
}

/**
 * Remove all the temporarily removed artworks.
 *
 * @param {number} [artworkType=ArtworkTypes.COMIC] The section of artwork type to remove.
 */
async function removeAllTempRemovedItemsAsync(
    artworkType = ArtworkTypes.COMIC
) {
    const apiUrl = `${BaseWebApiUrl}/art3/deleted/artworks/all`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            data: {
                artworkType: artworkType,
            },
        });

        return true;
    } catch (error) {
        console.log(error);

        return false;
    }
}

const CreatorStudioDeletedManagerApiHandler = {
    checkCreatorStudioBinStatusAsync,
    getAllTempRemovedItemsByArtworkTypeAsync,
    restoreSelectedArtworksAsync,
    removeSelectedArtworksAsync,
    restoreAllTempRemovedItemsAsync,
    removeAllTempRemovedItemsAsync,
};

export { CreatorStudioDeletedManagerApiHandler };
