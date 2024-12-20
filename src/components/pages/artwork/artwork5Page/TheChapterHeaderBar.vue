<template>
    <section
        id="chapter-header-bar"
        class="bg-dark-900 text-light q-py-xs relative-position"
    >
        <section
            v-show="showHeaderBar"
            id="header-bar-inner-wrapper"
            class="row q-px-md"
        >
            <div class="col flex items-center text-light text-subtitle1">
                <q-btn
                    no-caps
                    dense
                    padding="none"
                    :to="`/artwork/comic/${comicId}`"
                >
                    <div
                        class="text-weight-bold text-light text-subtitle1 comic-title"
                    >
                        {{ comicTitle }}
                    </div>
                </q-btn>
                <span class="text-weight-bold">
                    <q-icon name="chevron_right" size="sm" />
                </span>

                <GetLinkButton :label="`Tập ${chapterOrder}`" />
            </div>
            <div
                id="chapter-navigation-section"
                class="col flex items-center justify-center"
            >
                <q-btn
                    @click="goToPrevChapter"
                    :disable="isProcessing || disablePrevButton"
                    id="prev_chapter_btn"
                    dense
                    class="bg-light-100 text-dark border-radius-sm"
                >
                    <q-icon
                        name="play_arrow"
                        size="sm"
                        style="transform: rotate(180deg)"
                    />
                </q-btn>
                <q-btn
                    id="chapter_list_btn"
                    @click="showChapterMenu = !showChapterMenu"
                    :disable="isProcessing"
                    :loading="isProcessing"
                    dense
                    no-caps
                    class="relative-position bg-light-100 text-dark text-weight-bold border-radius-sm q-mx-xs q-px-sm flex items-center justify-between"
                >
                    <span class="chapter_list_btn_text"
                        >{{ chapterTitle }}
                    </span>

                    <q-icon
                        name="chevron_right"
                        size="sm"
                        style="transform: rotate(90deg)"
                    />
                </q-btn>
                <q-btn
                    @click="goToNextChapter"
                    :disable="isProcessing || disableNextButton"
                    id="next_chapter_btn"
                    dense
                    class="bg-light-100 text-dark border-radius-sm"
                >
                    <q-icon name="play_arrow" size="sm" />
                </q-btn>
            </div>
            <div
                id="chapter-action-buttons-group"
                class="col flex items-center justify-end"
            >
                <q-btn
                    @click="scrollToComment"
                    dense
                    class="bg-light text-dark border-radius-sm"
                >
                    <q-icon name="chat_bubble" size="sm" />

                    <q-tooltip
                        anchor="bottom middle"
                        self="top middle"
                        :offset="[8, 8]"
                    >
                        <strong class="text-subtitle2">Mục bình luận</strong>
                    </q-tooltip>
                </q-btn>
                <q-btn
                    dense
                    class="bg-light text-dark border-radius-sm q-mx-sm"
                >
                    <q-icon name="info" size="sm" />
                </q-btn>
                <q-btn
                    dense
                    no-caps
                    class="bg-light text-dark border-radius-sm flex items-center"
                >
                    <q-icon name="bug_report" size="sm" />
                    <span class="q-ml-xs text-subtitle2 text-weight-bold"
                        >Báo lỗi</span
                    >
                </q-btn>
            </div>
        </section>

        <section id="chapter-header-toggle" @click="toggleHeaderBar" />

        <ChapterListMenu
            v-show="showChapterMenu"
            :chapterList="chapterList"
            :showMenu="showChapterMenu"
            :comicId="comicId"
            @goToChapter="goToChapter"
            @closeMenu="showChapterMenu = false"
            class="absolute"
            style="right: 0; left: 0"
        />
    </section>
</template>

<script>
// Import dependencies section.
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { ComicChapterDetailResponseDto } from "src/api.models/artwork/artwork5Page/ComicChapterDetailResponseDto";
import { ArtworkChapterResponse } from "src/api.models/artwork/artwork3Page/ArtworkChapterResponse";
import { Art5RouteNames } from "src/router/artwork/Artwork5PageRoute";

// Import components section.
import GetLinkButton from "src/components/common/artwork/buttons/GetLinkButton.vue";
import ChapterListMenu from "./ChapterListMenu.vue";

export default {
    name: "TheChapterHeaderBar",
    emits: ["changeChapter"],
    components: {
        GetLinkButton,
        ChapterListMenu,
    },
    props: {
        comicId: {
            required: true,
        },
        comicTitle: {
            type: String,
            required: true,
        },
        chapterId: {
            required: true,
        },
        chapterDetail: {
            type: ComicChapterDetailResponseDto,
            required: true,
        },
        isProcessing: {
            type: Boolean,
            default: false,
        },
        chapterList: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            isCopyLink: false,
            showHeaderBar: true,
            showChapterMenu: false,
        };
    },
    computed: {
        chapterTitle() {
            return this.chapterDetail.title;
        },
        chapterOrder() {
            return this.chapterDetail.uploadOrder;
        },
        /**
         * @returns {ArtworkChapterResponse[]} The list of chapters.
         */
        comicChapterList() {
            return this.chapterList;
        },
        totalChapters() {
            if (!this.comicChapterList) {
                return 0;
            }

            return this.comicChapterList.length;
        },
        disablePrevButton() {
            return this.chapterOrder == 1;
        },
        disableNextButton() {
            return this.chapterOrder == this.totalChapters;
        },
    },
    methods: {
        scrollToComment() {
            const commentSection = document.querySelector("#comment-section");

            if (commentSection) {
                commentSection.scrollIntoView({ behavior: "smooth" });
            }
        },
        toggleHeaderBar() {
            this.showHeaderBar = !this.showHeaderBar;
        },
        getChapterLink(inputChapterId) {
            return {
                name: Art5RouteNames.ComicChapterDetail,
                params: {
                    comicId: this.comicId,
                    chapterId: inputChapterId,
                },
            };
        },
        prevChapterLink() {
            if (this.chapterOrder <= 1) {
                return {
                    name: Art5RouteNames.ComicChapterDetail,
                    params: {
                        comicId: this.comicId,
                        chapterId: this.chapterId,
                    },
                };
            }

            // Get the previous chapter item for navigation.
            const prevChapterOrder = this.chapterOrder - 1;

            // Get the previous item.
            const previousChapter = this.comicChapterList.find(
                (chapter) => chapter.uploadOrder == prevChapterOrder
            );

            if (previousChapter) {
                return {
                    name: Art5RouteNames.ComicChapterDetail,
                    params: {
                        comicId: this.comicId,
                        chapterId: previousChapter.id,
                    },
                };
            }

            return "";
        },
        nextChapterLink() {
            if (this.totalChapters <= 1) {
                return {
                    name: Art5RouteNames.ComicChapterDetail,
                    params: {
                        comicId: this.comicId,
                        chapterId: this.chapterId,
                    },
                };
            }

            // Get the next chapter item for navigation.
            const nextChapterOrder = this.chapterOrder + 1;

            // Get the previous item.
            const nextChapter = this.comicChapterList.find(
                (chapter) => chapter.uploadOrder == nextChapterOrder
            );

            if (nextChapter) {
                return {
                    name: Art5RouteNames.ComicChapterDetail,
                    params: {
                        comicId: this.comicId,
                        chapterId: nextChapter.id,
                    },
                };
            }

            return "";
        },
        goToChapter(chapterLink) {
            this.showChapterMenu = false;

            this.$emit("changeChapter", chapterLink);
        },
        goToPrevChapter() {
            if (this.disablePrevButton) {
                NotificationHelper.notifySuccess("Đã đến số tập giới hạn");

                return;
            }

            // Get the chapter link to route to the different chapter.
            const chapterLink = this.prevChapterLink();
            this.$emit("changeChapter", chapterLink);
        },
        goToNextChapter() {
            if (this.disableNextButton) {
                NotificationHelper.notifySuccess("Đã đến số tập giới hạn");

                return;
            }

            // Get the chapter link to route to the different chapter.
            const chapterLink = this.nextChapterLink();
            this.$emit("changeChapter", chapterLink);
        },
    },
};
</script>

<style scoped>
* {
    --chapter-list-btn-width: 200px;
    --comic-title-width: 280px;
}

#chapter-header-bar {
    position: fixed !important;
    top: 50px;
    width: 100% !important;
}

#chapter-header-toggle {
    position: fixed;
    z-index: -1;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: transparent;
}

#chapter_list_btn {
    width: var(--chapter-list-btn-width);
}

.chapter_list_btn_text {
    max-width: calc(var(--chapter-list-btn-width) - 40px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.comic-title {
    max-width: var(--comic-title-width) !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.comic-title:hover {
    opacity: 0.8;
}
</style>
