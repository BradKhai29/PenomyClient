import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { useAuthStore } from "src/stores/common/AuthStore";

const authStore = useAuthStore();
async function GetArtworksByType(artworkType, pageNumber) {
    var url = `${BaseWebApiUrl}/g28/user-profile/created-artworks/`;

    try {
        const response = await axios({
            url: url,
            method: HttpMethod.GET,
            params: {
                artworkType: artworkType,
                pageNumber: pageNumber,
            },
            headers: {
                Authorization: authStore.bearerAccessToken,
            },
        });

        return response.data.body;
    } catch (error) {
        console.log(error);
    }
}

async function GetPageCount(artworkType) {
    var url = `${BaseWebApiUrl}/g28/user-profile/created-artworks/page-count`;

    try {
        const response = await axios({
            url: url,
            method: HttpMethod.GET,
            params: {
                artworkType: artworkType,
            },
            headers: {
                Authorization: authStore.bearerAccessToken,
            },
        });

        return response.data.body;
    } catch (error) {
        console.log(error);
    }
}

export { GetArtworksByType, GetPageCount };
