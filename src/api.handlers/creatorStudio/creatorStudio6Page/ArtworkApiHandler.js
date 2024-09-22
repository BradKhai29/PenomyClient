import axios from "axios";

import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { CreateArtworkDetail } from "src/api.models/creatorStudio/creatorStudio6Page/CreateArtworkDetail";
import { CategoryItem } from "src/api.models/creatorStudio/creatorStudio6Page/CategoryItem";
import { OriginItem } from "src/api.models/creatorStudio/creatorStudio6Page/OriginItem";
import { PublicLevelItem } from "src/api.models/creatorStudio/creatorStudio6Page/PublicLevelItem";
import { AxiosHelper } from "src/helpers/AxiosHelper";
import { GetArtworkDetail } from "src/api.models/creatorStudio/creatorStudio6Page/GetArtworkDetail";

/**
 *  Parse the input data into category item array.
 * @param {CategoryItem[]} data The array of response object.
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
 * @param {*} data The array of response object.
 * @returns {PublicLevelItem[]} The array of public level item after parse.
 */
function parseToPublicLevelItemArray(data) {
    return data;
}

/**
 * Get all category items from the WebAPI.
 * @returns {Promise<CategoryItem[]>} An array contains all category items.
 */
async function getAllCategories() {
    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/artwork/categories`,
            method: HttpMethod.GET,
        });

        const categoryItems = parseToCategoryItemArray(response.data);

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
            url: `${BaseWebApiUrl}/artwork/origins`,
            method: HttpMethod.GET,
        });

        const originItems = parseToOriginItemArray(response.data);

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
            url: `${BaseWebApiUrl}/artwork/public-levels`,
            method: HttpMethod.GET,
        });

        const publicLevelItems = parseToPublicLevelItemArray(response.data);

        return publicLevelItems;
    } catch (error) {}
}

/**
 * Send a request to with provided artwork detail to the WebAPI.
 * @param {CreateArtworkDetail} artworkDetail The detail information of the artwork to create.
 */
async function createArtwork(artworkDetail) {
    const formData = new FormData();
    // For debug purpose.
    // console.log("Create artwork detail: ", artworkDetail);

    formData.append("title", artworkDetail.title);
    formData.append("originId", artworkDetail.originId);
    formData.append("introduction", artworkDetail.introduction);
    formData.append(
        "selectedCategories",
        JSON.stringify(artworkDetail.selectedCategories)
    );
    formData.append("allowComment", artworkDetail.allowComment);
    formData.append("publicLevel", artworkDetail.publicLevel);
    formData.append(
        "thumbnailImageFile",
        artworkDetail.thumbnailImageFile,
        artworkDetail.thumbnailImageFile.name
    );

    try {
        await axios({
            url: `${BaseWebApiUrl}/artwork/create`,
            method: HttpMethod.POST,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData,
        });
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);

        console.log(axiosError);
    }
}

async function updateArtworkDetail(artworkDetail) {
    const formData = new FormData();
    // For debug purpose.
    // console.log("Create artwork detail: ", artworkDetail);

    formData.append("title", artworkDetail.title);
    formData.append("originId", artworkDetail.originId);
    formData.append("introduction", artworkDetail.introduction);
    formData.append(
        "selectedCategories",
        JSON.stringify(artworkDetail.selectedCategories)
    );
    formData.append("allowComment", artworkDetail.allowComment);
    formData.append("publicLevel", artworkDetail.publicLevel);

    if (artworkDetail.thumbnailImageFile) {
        formData.append(
            "thumbnailImageFile",
            artworkDetail.thumbnailImageFile,
            artworkDetail.thumbnailImageFile.name
        );
    }

    try {
        await axios({
            url: `${BaseWebApiUrl}/artwork/update`,
            method: HttpMethod.PUT,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData,
        });
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);

        console.log(axiosError);
    }
}

/**
 * Get the artwork detail with the provide artworkId to edit the artwork information.
 * @param {Number} artworkId The id of the artwork to get detail.
 * @returns {Promise<GetArtworkDetail>} The detail of the artwork.
 */
async function getArtworkDetailById(artworkId) {
    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/artwork/${artworkId}`,
            method: HttpMethod.GET,
        });

        return response.data;
    } catch (error) {}
}

const ArtworkApiHandler = {
    createArtworkAsync: createArtwork,
    updateArtworkDetailAsync: updateArtworkDetail,
    getAllCategoriesAsync: getAllCategories,
    getAllOriginsAsync: getAllOrigins,
    getAllPublicLevelsAsync: getAllPublicLevels,
    getArtworkDetailByIdAsync: getArtworkDetailById,
};

export { ArtworkApiHandler };
