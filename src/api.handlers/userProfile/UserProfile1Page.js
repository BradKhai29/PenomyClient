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
                Authorization: authStore.bearerAccessToken(),
            },
        });
        var artworkList = response.data.body.artworkList;
        artworkList.forEach((item) => {
            item.lastUpdateAt = calculateDayDifference(item.lastUpdateAt);
        });
        return artworkList;
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
                Authorization: authStore.bearerAccessToken(),
            },
        });
        return response.data.body.result;
    } catch (error) {
        console.log(error);
    }
}

function calculateDayDifference(startDate) {
    const start = new Date(startDate);
    const end = new Date(new Date());
    const millisecondsDifference = end.getTime() - start.getTime();
    const delta = millisecondsDifference / 86400000;
    if (delta < 30) {
        return `${Math.floor(delta)} ngày trước`;
    } else {
        const months = Math.floor(delta / 30);
        return `${months} tháng trước`;
    }
}

export { GetArtworksByType, GetPageCount };
