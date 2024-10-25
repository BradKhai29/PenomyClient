import axios from "axios";

import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ComicDetail } from "src/api.models/creatorStudio/creatorStudio7Page/ComicDetail";

async function getComicDetailByIdAsync(comicId) {
    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/art5/comic/detail/${comicId}`,
            method: HttpMethod.GET,
        });

        const responseBody = response.data.body;
        const comicDetail = new ComicDetail();

        comicDetail.id = responseBody.id;
        comicDetail.title = responseBody.title;
        comicDetail.originId = responseBody.originId;
        comicDetail.introduction = responseBody.introduction;
        comicDetail.thumbnailUrl = responseBody.thumbnailUrl;
        comicDetail.allowComment = responseBody.allowComment;
        comicDetail.publicLevel = responseBody.publicLevel;
        comicDetail.selectedCategories =
            parseToCategoryItemArrayFromArtworkDetail(
                responseBody.selectedCategories
            );

        return comicDetail;
    } catch (error) {
        return ComicDetail.NotFound();
    }
}

const CreatorStudio7ApiHandler = {
    getComicDetailByIdAsync: getComicDetailByIdAsync,
};

export { CreatorStudio7ApiHandler };
