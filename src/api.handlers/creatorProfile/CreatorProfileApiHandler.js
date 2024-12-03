import axios from "axios";
import { HttpMethod } from "src/api.common/HttpMethod";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";

// Models for binding api response.
import { UserProfileResponseDto } from "src/api.models/userProfile/userProfile1Page/UserProfileResponseDto";
import { ArtworkTypes } from "../artwork/artwork1Page/TopRecommendedArtworkApiHandler";
import { PaginationOptionsApiResponse } from "src/api.models/creatorProfile/PaginationOptionsApiResponse";
import { ArtworkDetailResponseItem } from "src/api.models/creatorProfile/ArtworkDetailResponseItem";

/**
 * Get the profile information of the specified creator with input id.
 *
 * @param {String} creatorId Id of the creator to get the profile.
 * @returns {Promise<UserProfileResponseDto>} Promise contains the UserProfileResponseDto instance.
 */
async function getProfileAsync(creatorId) {
    const apiUrl = `${BaseWebApiUrl}/g35/creator/profile`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            params: {
                creatorId: creatorId,
            },
        });

        const result = UserProfileResponseDto.mapFrom(response.data.body);

        return result;
    } catch (error) {
        return null;
    }
}

/**
 * Get the pagination options to display the artwork from creator profile page.
 *
 * @param {String} creatorId Id of the creator to get the artwork list.
 * @param {Number} [artworkType=ArtworkTypes.COMIC] The type of the artwork to get the list. (If not specified, default value would be ArtworkTypes.COMIC)
 * @returns {Promise<PaginationOptionsApiResponse> | null} The result return from the api response. Return null if api called is failed.
 */
async function getPaginationOptionsAsync(
    creatorId,
    artworkType = ArtworkTypes.COMIC
) {
    const apiUrl = `${BaseWebApiUrl}/g28/creator/artworks/page-count`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            params: {
                creatorId: creatorId,
                artworkType: artworkType,
            },
        });

        return PaginationOptionsApiResponse.mapFrom(response.data.body);
    } catch (error) {
        console.log(error);

        return null;
    }
}

/**
 * Get the artworks from the creator profile with
 * the specified page number and artwork type.
 *
 * @param {String} creatorId Id of the creator to get the artwork list.
 * @param {Number} [artworkType=ArtworkTypes.COMIC] The type of the artwork to get the list. (If not specified, default value would be ArtworkTypes.COMIC)
 * @param {Number} pageNumber The page number to get the the artworks when pagination.
 * @returns {Promise<ArtworkDetailResponseItem[]> | null} The list of artwork items or null if call api failed.
 */
async function getArtworksByTypeWithPaginationAsync(
    creatorId,
    artworkType,
    pageNumber
) {
    const apiUrl = `${BaseWebApiUrl}/g28/creator/artworks`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            params: {
                creatorId: creatorId,
                artworkType: artworkType,
                pageNumber: pageNumber,
            },
        });

        const result = ArtworkDetailResponseItem.mapFromArray(
            response.data.body
        );

        return result;
    } catch (error) {
        console.log(error);

        return null;
    }
}

const CreatorProfileApiHandler = {
    getProfileAsync,
    getPaginationOptionsAsync,
    getArtworksByTypeWithPaginationAsync,
};

export { CreatorProfileApiHandler };
