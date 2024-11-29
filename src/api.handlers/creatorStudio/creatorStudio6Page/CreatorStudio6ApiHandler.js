import axios from "axios";

import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { CreateArtworkDetail } from "src/api.models/creatorStudio/creatorStudio6Page/CreateArtworkDetail";
import { CategoryItem } from "src/api.models/creatorStudio/common/CategoryItem";
import { OriginItem } from "src/api.models/creatorStudio/common/OriginItem";
import { PublicLevelItem } from "src/api.models/creatorStudio/common/PublicLevelItem";
import { AxiosHelper } from "src/helpers/AxiosHelper";
import { CreateArtworkResult } from "src/api.models/creatorStudio/creatorStudio6Page/CreateArtworkResult";

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
 * @param {Array} data The array of response object.
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
            url: `${BaseWebApiUrl}/art4/categories`,
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
            url: `${BaseWebApiUrl}/art4/origins`,
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
            url: `${BaseWebApiUrl}/art4/public-levels`,
            method: HttpMethod.GET,
        });

        const publicLevelItems = parseToPublicLevelItemArray(
            response.data.body
        );

        return publicLevelItems;
    } catch (error) {}
}

/**
 * Send a request to with provided artwork detail to the WebAPI.
 * @param {CreateArtworkDetail} artworkDetail The detail information of the artwork to create.
 * @returns {Promise<CreateArtworkResult>} The result of creating the artwork.
 */
async function createArtwork(artworkDetail) {
    const requestBody = new FormData();
    // For debug purpose.
    // console.log("Create artwork detail: ", artworkDetail);

    requestBody.append("title", artworkDetail.title);
    requestBody.append("originId", artworkDetail.originId);
    requestBody.append("introduction", artworkDetail.introduction);
    requestBody.append(
        "selectedCategories",
        JSON.stringify(artworkDetail.selectedCategories)
    );
    requestBody.append("allowComment", artworkDetail.allowComment);
    requestBody.append("publicLevel", artworkDetail.publicLevel);
    requestBody.append(
        "thumbnailImageFile",
        artworkDetail.thumbnailImageFile,
        artworkDetail.thumbnailImageFile.name
    );

    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/art4/comic/create`,
            method: HttpMethod.POST,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: authStore.bearerAccessToken(),
            },
            data: requestBody,
        });

        console.log(response);

        return CreateArtworkResult.success(response.data.body.comicId);
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);

        console.log(axiosError);

        return CreateArtworkResult.failedWithErrorCode(
            axiosError.response.data.appCode
        );
    }
}

const CreatorStudio6ApiHandler = {
    createArtworkAsync: createArtwork,
    getAllCategoriesAsync: getAllCategories,
    getAllOriginsAsync: getAllOrigins,
    getAllPublicLevelsAsync: getAllPublicLevels,
};

export { CreatorStudio6ApiHandler };
