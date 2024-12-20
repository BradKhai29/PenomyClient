import { ScheduleOptionDetail } from "../common/ScheduleOptionDetail";
import { AnimeChapterDetailToEditResponseDto } from "./AnimeChapterDetailToEditResponseDto";

const publishStatuses = {
    DRAFTED: 1,
    PUBLISHED: 2,
};

class EditAnimeChapterDetailRequestDto {
    /**
     * @param {String} id Id of current anime chapter.
     * @param {String} animeId Id of anime that contains this chapter.
     * @param {String} title Title of current anime chapter.
     * @param {String} animeTitle anime title of current chapter.
     * @param {String} thumbnailUrl Thumbnail URL of current anime chapter.
     * @param {Number} uploadOrder Upload order of current anime chapter.
     * @param {String} description The description of current anime chapter.
     * @param {Number} publishStatus Publish status value of current anime chapter.
     * @param {Number} publicLevel Public level value of current anime chapter.
     * @param {Boolean} allowComment Indicate to allow comment on this anime chapter.
     * @param {Strign} publishedAt The datetime that current anime chapter is published at.
     * @param {String} chapterVideoUrl The current video url of this chapter.
     * @param {Number} totalMediaSize The total media size in bytes of current anime chapter.
     * @param {ScheduleOptionDetail} scheduleOption The schedule option support for published the chapter in schedule mode.
     * @param {File} thumbnailImageFile The thumbnail image file that will be upload to update for this chapter.
     * @param {File} chapterVideoFile The video file that will upload if has any updates.
     */
    constructor(
        id,
        animeId,
        title,
        animeTitle,
        thumbnailUrl,
        uploadOrder,
        description,
        publishStatus,
        publicLevel,
        allowComment,
        publishedAt,
        chapterVideoUrl,
        totalMediaSize,
        scheduleOption = ScheduleOptionDetail.new(),
        thumbnailImageFile = null,
        chapterVideoFile = null
    ) {
        // Chapter detail section.
        this.id = id;
        this.animeId = animeId;
        this.title = title;
        this.animeTitle = animeTitle;
        this.thumbnailUrl = thumbnailUrl;
        this.uploadOrder = uploadOrder;
        this.description = description;
        this.publishStatus = publishStatus;
        this.publicLevel = publicLevel;
        this.allowComment = allowComment;
        this.publishedAt = publishedAt;
        this.chapterVideoUrl = chapterVideoUrl;
        this.totalMediaSize = totalMediaSize;
        this.scheduleOption = scheduleOption;
        this.thumbnailImageFile = thumbnailImageFile;
        this.chapterVideoFile = chapterVideoFile;
    }

    /**
     * Populate the information get from the input AnimeChapterDetailToEditResponseDto
     * instance to this EditAnimeChapterDetailRequestDto instance
     * @param {AnimeChapterDetailToEditResponseDto} chapterDetail The AnimeChapterDetailToEditResponseDto instance to get info
     */
    populate(chapterDetail) {
        this.id = chapterDetail.id;
        this.animeId = chapterDetail.animeId;
        this.title = chapterDetail.title;
        this.animeTitle = chapterDetail.animeTitle;
        this.thumbnailUrl = chapterDetail.thumbnailUrl;
        this.uploadOrder = chapterDetail.uploadOrder;
        this.description = chapterDetail.description;
        this.publishStatus = chapterDetail.publishStatus;
        this.publicLevel = chapterDetail.publicLevel;
        this.allowComment = chapterDetail.allowComment;
        this.publishedAt = chapterDetail.publishedAt;
        this.chapterVideoUrl = chapterDetail.chapterVideoUrl;
        this.totalMediaSize = chapterDetail.totalMediaSize;
    }

    isPublished() {
        return this.publishStatus == publishStatuses.PUBLISHED;
    }

    isDrafted() {
        return this.publishStatus == publishStatuses.DRAFTED;
    }
}

export { EditAnimeChapterDetailRequestDto };
