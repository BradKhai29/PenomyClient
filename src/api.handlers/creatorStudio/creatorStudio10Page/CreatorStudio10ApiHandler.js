import axios from "axios";

import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { AxiosHelper } from "src/helpers/AxiosHelper";
import { DateTimeHelper } from "src/helpers/DateTimeHelper";
import { ComicChapterDetailRequestDto } from "src/api.models/creatorStudio/creatorStudio9Page/ComicChapterDetailRequestDto";
import { ComicDetailToCreateChapterResponseDto } from "src/api.models/creatorStudio/creatorStudio9Page/ComicDetailToCreateChapterResponseDto";
import { CreateComicChapterResult } from "src/api.models/creatorStudio/creatorStudio9Page/CreateComicChapterResult";
import { CreateChapterErrorCodeParser } from "src/api.models/creatorStudio/creatorStudio9Page/CreateComicChapterError";

/**
 * Get the detail of the specified comic with input id
 * to create a new chapter for the comic.
 *
 * @param {String} comicId The id of the comic to get detail.
 * @returns {Promise<ComicDetailToCreateChapterResponseDto>} The promise contains the comic detail result.
 */
async function getChapterDetailByIdAsync(comicId) {
    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/art10/comic/${comicId}`,
            method: HttpMethod.GET,
        });

        const body = response.data.body;

        return new ComicDetailToCreateChapterResponseDto(
            true,
            body.title,
            body.lastChapterUploadOrder
        );
    } catch (error) {
        console.log(error);

        return ComicDetailToCreateChapterResponseDto.failed();
    }
}

const CreatorStudio10ApiHandler = {
    getChapterDetailByIdAsync: getChapterDetailByIdAsync,
};

export { CreatorStudio10ApiHandler };
