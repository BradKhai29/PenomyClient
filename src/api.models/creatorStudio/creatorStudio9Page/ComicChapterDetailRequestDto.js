import { ChapterImageItem } from "./ChapterImageItem";

class ComicChapterDetailRequestDto {
    /**
     * Constructor to initialize ChapterDetail with provided values.

     * @param {string} comicId - The unique ID of the comic.
     * @param {string} title - The title of the chapter.
     * @param {string} description - The description of the chapter.
     * @param {File|null} thumbnailImageFile - The thumbnail image file for the chapter.
     * @param {number|null} publicLevel - The public visibility level (null or a specific level).
     * @param {boolean} allowComment - Whether comments are allowed on the chapter.
     * @param {boolean} confirmPolicy - Whether the user confirmed the policy.
     * @param {ChapterImageItem[]} chapterImageItems - List of image items for the chapter.
     * @param {Object} scheduleOption - The scheduling option for the chapter.
     * @param {boolean} scheduleOption.isScheduled - Whether the chapter is scheduled.
     * @param {Date} scheduleOption.scheduleDate - The date to schedule the chapter.
     * @param {Date|null} scheduleOption.scheduleDateTime - The specific date and time to schedule.
     */
    constructor(
        comicId = "",
        title = "",
        description = "",
        thumbnailImageFile = null,
        publicLevel = null,
        allowComment = false,
        confirmPolicy = false,
        chapterImageItems = [],
        scheduleOption = {
            isScheduled: false,
            scheduleDate: new Date(),
            scheduleDateTime: null,
        }
    ) {
        this.comicId = comicId;
        this.title = title;
        this.description = description;
        this.thumbnailImageFile = thumbnailImageFile;
        this.publicLevel = publicLevel;
        this.allowComment = allowComment;
        this.confirmPolicy = confirmPolicy;
        this.chapterImageItems = chapterImageItems;
        this.scheduleOption = scheduleOption;
    }
}

export { ComicChapterDetailRequestDto };
