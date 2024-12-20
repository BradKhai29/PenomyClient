import { ScheduleOptionDetail } from "../common/ScheduleOptionDetail";
import { EditableChapterImageItem } from "./EditableChapterImageItem";
import { GetComicChapterDetailResponseDto } from "./GetComicChapterDetailResponseDto";

const publishStatuses = {
    DRAFTED: 1,
    PUBLISHED: 2,
};

class UpdateComicChapterDetail {
    /**
     * @param {String} id Id of current comic chapter.
     * @param {String} comicId Id of comic that contains this chapter.
     * @param {String} title Title of current comic chapter.
     * @param {String} comicTitle Comic title of current chapter.
     * @param {String} thumbnailUrl Thumbnail URL of current comic chapter.
     * @param {File} thumbnailImageFile Thumbnail image file that will be updated for current chapter.
     * @param {Number} uploadOrder Upload order of current comic chapter.
     * @param {String} description The description of current comic chapter.
     * @param {Number} publishStatus Publish status value of current comic chapter.
     * @param {Number} publicLevel Public level value of current comic chapter.
     * @param {Boolean} allowComment Indicate to allow comment on this comic chapter.
     * @param {Strign} publishedAt The datetime that current comic chapter is published at.
     * @param {EditableChapterImageItem[]} chapterMedias The list of medias of current comic chapter.
     * @param {Number} totalMediaSize The total media size in bytes of current comic chapter.
     * @param {ScheduleOptionDetail} scheduleOption The schedule option support for published the chapter in schedule mode.
     * @param {File} thumbnailImageFile The thumbnail image file that will be upload to update for this chapter.
     */
    constructor(
        id,
        comicId,
        title,
        comicTitle,
        thumbnailUrl,
        uploadOrder,
        description,
        publishStatus,
        publicLevel,
        allowComment,
        publishedAt,
        chapterMedias,
        totalMediaSize,
        scheduleOption = ScheduleOptionDetail.new(),
        thumbnailImageFile = null
    ) {
        // Chapter detail section.
        this.id = id;
        this.comicId = comicId;
        this.title = title;
        this.comicTitle = comicTitle;
        this.thumbnailUrl = thumbnailUrl;
        this.uploadOrder = uploadOrder;
        this.description = description;
        this.publishStatus = publishStatus;
        this.publicLevel = publicLevel;
        this.allowComment = allowComment;
        this.publishedAt = publishedAt;
        this.chapterMedias = chapterMedias;
        this.totalMediaSize = totalMediaSize;
        this.scheduleOption = scheduleOption;
        this.thumbnailImageFile = thumbnailImageFile;
    }

    /**
     * Populate the information get from the input GetComicChapterDetailResponseDto
     * instance to this UpdateComicChapterDetail instance
     * @param {GetComicChapterDetailResponseDto} chapterDetail The UpdateComicChapterDetail instance to get info
     */
    populate(chapterDetail) {
        this.id = chapterDetail.id;
        this.comicId = chapterDetail.comicId;
        this.title = chapterDetail.title;
        this.comicTitle = chapterDetail.comicTitle;
        this.thumbnailUrl = chapterDetail.thumbnailUrl;
        this.uploadOrder = chapterDetail.uploadOrder;
        this.description = chapterDetail.description;
        this.publishStatus = chapterDetail.publishStatus;
        this.publicLevel = chapterDetail.publicLevel;
        this.allowComment = chapterDetail.allowComment;
        this.publishedAt = chapterDetail.publishedAt;
        this.chapterMedias = chapterDetail.chapterMedias;
        this.totalMediaSize = chapterDetail.totalMediaSize;
    }

    isPublished() {
        return this.publishStatus == publishStatuses.PUBLISHED;
    }

    isDrafted() {
        return this.publishStatus == publishStatuses.DRAFTED;
    }
}

export { UpdateComicChapterDetail };
