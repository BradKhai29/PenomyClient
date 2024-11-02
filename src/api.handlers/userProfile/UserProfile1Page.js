import axios from "axios";
import { ArtworkType } from "src/api.common/ArtworkType";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";

async function GetArtworksByType(artworkType, pageNumber) {
    if (artworkType === ArtworkType.COMIC) {
        try {
            const response = await axios({
                url: `${BaseWebApiUrl}/profile/artworks?artworkType=${artworkType}&pageNumber=${pageNumber}`,
                method: HttpMethod.GET,
            });

            return response.data.body;
        } catch (error) {
            console.log(error);
        }
    } else if (artworkType === ArtworkType.ANIMATION) {
        try {
            const response = await axios({
                url: `${BaseWebApiUrl}/art2/artworks?artworkType=${artworkType}&pageNumber=${pageNumber}`,
                method: HttpMethod.GET,
            });

            return response.data.body;
        } catch (error) {
            console.log(error);
        }
    }
}

async function GetPageCount(artworkType) {
    if (artworkType === ArtworkType.COMIC) {
        try {
            const response = await axios({
                url: `${BaseWebApiUrl}/art1/pagination?artworkType=${artworkType}`,
                method: HttpMethod.GET,
            });

            return response.data.body;
        } catch (error) {
            console.log(error);
        }
    } else if (artworkType === ArtworkType.ANIMATION) {
        try {
            const response = await axios({
                url: `${BaseWebApiUrl}/art2/pagination?artworkType=${artworkType}`,
                method: HttpMethod.GET,
            });

            return response.data.body;
        } catch (error) {
            console.log(error);
        }
    }
}

export { GetArtworksByType, GetPageCount };
