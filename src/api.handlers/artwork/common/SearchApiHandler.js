import axios from "axios";
import { HttpMethod } from "src/api.common/HttpMethod";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";

// Import DTOs for api response body binding.
import { SearchResponseItem } from "src/api.models/artwork/search/SearchResponseItem";

/**
 * Search the comic by the input search text.
 *
 * @param {String} searchText The search key word for searching.
 * @returns {Promise<SearchResponseItem[]> | null} Return the list of manga searching items. Or return null if call api failed.
 */
async function searchComicAsync(searchText) {
    const apiUrl = `${BaseWebApiUrl}/typs3`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            params: {
                searchText: searchText,
            },
        });

        const result = SearchResponseItem.mapFromMangaArray(response.data.body);
        console.log(result);

        return result;
    } catch (error) {
        console.log(error);

        return null;
    }
}

/**
 * Search the anime by the input search text.
 *
 * @param {String} searchText The search key word for searching.
 * @returns {Promise<SearchResponseItem[]> | null} Return the list of anime searching items. Or return null if call api failed.
 */
async function searchAnimeAsync(searchText) {}

const SearchApiHandler = {
    searchComicAsync,
    searchAnimeAsync,
};

export { SearchApiHandler };
