import axios from "axios";

import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { UpdateArtworkDetail } from "src/api.models/creatorStudio/creatorStudio8Page/UpdateArtworkDetail";
import { CategoryItem } from "src/api.models/creatorStudio/common/CategoryItem";
import { OriginItem } from "src/api.models/creatorStudio/common/OriginItem";
import { PublicLevelItem } from "src/api.models/creatorStudio/common/PublicLevelItem";
import { AxiosHelper } from "src/helpers/AxiosHelper";
import { GetArtworkDetail } from "src/api.models/creatorStudio/creatorStudio8Page/GetArtworkDetail";
import { UpdateArtworkResult } from "src/api.models/creatorStudio/creatorStudio8Page/UpdateArtworkResult";
import { TemporarilyRemoveArtworkResult } from "src/api.models/creatorStudio/creatorStudio8Page/TemporarilyRemoveArtworkResult";

// Init store for later operation.
import { useAuthStore } from "src/stores/common/AuthStore";
const authStore = useAuthStore();

/**
 *  Parse the input data into category item array.
 * @param {Array} data The array of response object.
 * @returns {CategoryItem[]} The array of category item after parse.
 */
function parseToCategoryItemArray(data) {
    const categoryItems = [];

    for (let i = 0; i < data.length; i++) {
        const dataItem = data[i];

        const categoryItem = new CategoryItem(dataItem.id, dataItem.label);

        categoryItems.push(categoryItem);
    }

    return categoryItems;
}

/**
 *  Parse the input data into origin item array.
 * @param {*} data The array of response object.
 * @returns {OriginItem[]} The array of origin item after parse.
 */
function parseToOriginItemArray(data) {
    return data;
}

/**
 *  Parse the input data into public level item array.
 * @param {Array} objects The array of response object.
 * @returns {PublicLevelItem[]} The array of public level item after parse.
 */
function parseToPublicLevelItemArray(objects) {
    const publicLevels = [];

    objects.forEach((item) =>
        publicLevels.push(new PublicLevelItem(item.label, item.id, false))
    );

    return publicLevels;
}

/**
 * Get all category items from the WebAPI.
 * @returns {Promise<CategoryItem[]>} An array contains all category items.
 */
async function getAllCategories() {
    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/art7/categories`,
            method: HttpMethod.GET,
        });

        const categoryItems = parseToCategoryItemArray(response.data.body);

        return categoryItems;
    } catch (error) {}
}

/**
 * Get all origin items from the WebAPI.
 * @returns {Promise<OriginItem[]>} An array contains all origin items.
 */
async function getAllOrigins() {
    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/art7/origins`,
            method: HttpMethod.GET,
        });

        const originItems = parseToOriginItemArray(response.data.body);

        return originItems;
    } catch (error) {}
}

/**
 * Get all public level items from the WebAPI.
 * @returns {Promise<PublicLevelItem[]>} An array contains all public level items.
 */
async function getAllPublicLevels() {
    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/art7/public-levels`,
            method: HttpMethod.GET,
        });

        const publicLevelItems = parseToPublicLevelItemArray(
            response.data.body
        );

        return publicLevelItems;
    } catch (error) {}
}

/**
 * Update the artwork with given detail.
 * @param {UpdateArtworkDetail} artworkDetail The detail of artwork to update
 * @param {Boolean} isCategoriesUpdated Specify if the current artwork has updated in categories
 * @returns {Promise<UpdateArtworkResult>} The promise contains the result of update the artwork detail.
 */
async function updateArtworkDetail(artworkDetail, isCategoriesUpdated) {
    const requestBody = new FormData();
    // For debug purpose.
    // console.log("Update artwork detail: ", artworkDetail);

    requestBody.append("comicId", artworkDetail.id);
    requestBody.append("title", artworkDetail.title);
    requestBody.append("originId", artworkDetail.originId);
    requestBody.append("introduction", artworkDetail.introduction);
    requestBody.append("isCategoriesUpdated", isCategoriesUpdated);
    requestBody.append(
        "selectedCategories",
        JSON.stringify(artworkDetail.selectedCategories)
    );
    requestBody.append("allowComment", artworkDetail.allowComment);
    requestBody.append("publicLevel", artworkDetail.publicLevel);

    if (artworkDetail.thumbnailImageFile) {
        requestBody.append(
            "thumbnailImageFile",
            artworkDetail.thumbnailImageFile,
            artworkDetail.thumbnailImageFile.name
        );
    }

    const result = new UpdateArtworkResult(false, null);

    try {
        await axios({
            url: `${BaseWebApiUrl}/art7/comic/edit`,
            method: HttpMethod.PATCH,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: authStore.bearerAccessToken(),
            },
            data: requestBody,
        });

        result.isSuccess = true;
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);
        // console.log(axiosError);

        const errorMessage = UpdateArtworkResult.getMessageFromErrorCode(
            axiosError.response.data.appCode
        );

        result.message = errorMessage;
    }

    return result;
}

/**
 *  Parse the input data into category item array.
 * @param {Array} data The array of response object.
 * @returns {CategoryItem[]} The array of category item after parse.
 */
function parseToCategoryItemArrayFromArtworkDetail(data) {
    const categoryItems = [];

    for (let i = 0; i < data.length; i++) {
        const dataItem = data[i];

        const categoryItem = new CategoryItem(
            dataItem.categoryId,
            dataItem.categoryId,
            true
        );

        categoryItems.push(categoryItem);
    }

    return categoryItems;
}

/**
 * Get the artwork detail with the provide artworkId to edit the artwork information.
 * @param {Number} artworkId The id of the artwork to get detail.
 * @returns {Promise<GetArtworkDetail>} The detail of the artwork.
 */
async function getArtworkDetailById(artworkId) {
    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/art7/comic/detail/${artworkId}`,
            method: HttpMethod.GET,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
        });

        const responseBody = response.data.body;
        const artworkDetail = new GetArtworkDetail();

        artworkDetail.id = responseBody.id;
        artworkDetail.title = responseBody.title;
        artworkDetail.originId = responseBody.originId;
        artworkDetail.introduction = responseBody.introduction;
        artworkDetail.thumbnailUrl = responseBody.thumbnailUrl;
        artworkDetail.allowComment = responseBody.allowComment;
        artworkDetail.publicLevel = responseBody.publicLevel;
        artworkDetail.selectedCategories =
            parseToCategoryItemArrayFromArtworkDetail(
                responseBody.selectedCategories
            );

        return artworkDetail;
    } catch (error) {
        return GetArtworkDetail.NotFound();
    }
}

/**
 * Temporarily remove the comic with specified input id.
 *
 * @param {String} comicId The id of the comic to remove.
 * @returns {Promise<TemporarilyRemoveArtworkResult>} The result after removing the artwork.
 */
async function temporarilyRemoveComicByIdAsync(comicId) {
    const result = new TemporarilyRemoveArtworkResult(false, null);

    try {
        await axios({
            url: `${BaseWebApiUrl}/art8/temp-remove/${comicId}`,
            method: HttpMethod.DELETE,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
        });

        result.isSuccess = true;
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);

        const errorMessage =
            TemporarilyRemoveArtworkResult.getMessageFromErrorCode(
                axiosError.response.data.appCode
            );

        result.message = errorMessage;
    }

    return result;
}

const CreatorStudio8ApiHandler = {
    getArtworkDetailByIdAsync: getArtworkDetailById,
    updateArtworkDetailAsync: updateArtworkDetail,
    getAllCategoriesAsync: getAllCategories,
    getAllOriginsAsync: getAllOrigins,
    getAllPublicLevelsAsync: getAllPublicLevels,
    temporarilyRemoveComicByIdAsync: temporarilyRemoveComicByIdAsync,
};

export { CreatorStudio8ApiHandler };
