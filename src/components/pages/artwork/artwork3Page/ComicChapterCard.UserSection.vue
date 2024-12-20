<template>
    <router-link
        :to="chapterDetailRoute"
        class="text-decoration-none text-dark"
    >
        <div
            class="row items-center border-sm-top-light-500 border-sm-bottom-light-500"
        >
            <div class="chapter-image relative-position">
                <q-img
                    :src="chapterDetail.thumbnailUrl"
                    :ratio="1"
                    width="100%"
                    height="100%"
                />
            </div>
            <section class="col-grow q-pl-md q-pr-sm">
                <div
                    id="chapter_header"
                    class="row text-subtitle2 items-center text-dark justify-between"
                >
                    <div class="text-weight-bold flex items-center">
                        <span class="q-mr-xs">
                            Tập {{ chapterDetail.uploadOrder }}
                        </span>
                        <q-icon
                            v-if="hasViewed"
                            name="check"
                            size="14px"
                            class="text-primary"
                        />
                        <q-tooltip
                            v-if="hasViewed"
                            anchor="top middle"
                            self="bottom middle"
                            :offset="tooltipOffset"
                        >
                            <strong class="text-subtitle2"> Đã xem </strong>
                        </q-tooltip>
                    </div>
                    <q-btn
                        v-if="isAuthor"
                        :to="chapterEditRoute"
                        dense
                        flat
                        no-caps
                        padding="2px"
                        class="bg-dark text-primary"
                    >
                        <q-icon name="edit" size="xs" />
                        <span class="q-ml-xs text-light text-weight-bold">
                            Sửa
                        </span>
                    </q-btn>
                </div>
                <div class="text-subtitle1 text-dark">
                    {{ chapterDetail.chapterName }}
                </div>
                <div
                    class="row items-center text-dark-500 text-subtitle2 q-mt-sm"
                >
                    <!-- Chapter created time metadata -->
                    <div class="flex items-center">
                        <q-icon name="task" size="xs" />
                        <span class="q-ml-xs">
                            {{ createdAt }}
                        </span>
                        <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="tooltipOffset"
                        >
                            <strong class="text-subtitle2">
                                Ngày đăng tải
                            </strong>
                        </q-tooltip>
                    </div>
                    <!-- Chapter created time metadata -->

                    <!-- Chapter view count metadata -->
                    <div class="flex items-center q-ml-md">
                        <q-icon name="visibility" size="xs" />
                        <span class="q-ml-xs">{{ viewCountShort }}</span>
                        <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="tooltipOffset"
                        >
                            <strong class="text-subtitle2">
                                Lượt xem: {{ viewCount }}
                            </strong>
                        </q-tooltip>
                    </div>
                    <!-- Chapter view count metadata -->

                    <!-- Chapter favorite count metadata -->
                    <!-- <div class="flex items-center q-ml-md">
                        <q-icon name="favorite" size="xs" />
                        <span class="q-ml-xs">{{ favoriteCountShort }}</span>
                        <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="tooltipOffset"
                        >
                            <strong class="text-subtitle2">
                                Lượt yêu thích: {{ favoriteCount }}
                            </strong>
                        </q-tooltip>
                    </div> -->
                    <!-- Chapter favorite count metadata -->

                    <!-- Chapter comment metadata -->
                    <div v-if="!allowComment" class="q-ml-md flex items-center">
                        <q-avatar
                            size="xs"
                            class="bg-secondary-100 text-secondary-900"
                        >
                            <q-icon name="close" size="12px" />
                        </q-avatar>
                        <span class="q-ml-xs">Tắt bình luận </span>
                    </div>
                    <div
                        v-else-if="allowComment"
                        class="flex items-center q-ml-md"
                    >
                        <q-icon name="chat_bubble" size="xs" />
                        <span class="q-ml-xs">{{ commentCountShort }}</span>
                        <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="tooltipOffset"
                        >
                            <strong class="text-subtitle2">
                                Lượt bình luận: {{ commentCount }}
                            </strong>
                        </q-tooltip>
                    </div>
                    <!-- Chapter comment metadata -->
                </div>
            </section>
        </div>
    </router-link>
</template>

<script>
// Import dependencies section.
import { Art5RouteNames } from "src/router/artwork/Artwork5PageRoute";
import { ArtworkChapterResponse } from "src/api.models/artwork/artwork3Page/ArtworkChapterResponse";
import { CreatorStudio11RouteNames } from "src/router/creatorStudio/CreatorStudio11PageRoute";
import { NumberHelper } from "src/helpers/NumberHelper";
import { DateTimeHelper } from "src/helpers/DateTimeHelper";

// Component constants.
const TOOLTIP_OFFSET = [4, 4];

export default {
    name: "UserComicChapterCard",
    props: {
        comicId: {
            required: true,
        },
        isAuthor: {
            type: Boolean,
            default: false,
        },
        chapterDetail: {
            type: ArtworkChapterResponse,
            required: true,
        },
        hasViewed: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        tooltipOffset() {
            return TOOLTIP_OFFSET;
        },
        /**
         * Get the route to the chapter detail page.
         */
        chapterDetailRoute() {
            return {
                name: Art5RouteNames.ComicChapterDetail,
                params: {
                    comicId: this.comicId,
                    chapterId: this.chapterDetail.id,
                },
            };
        },
        chapterEditRoute() {
            return {
                name: CreatorStudio11RouteNames.ChapterEdit,
                params: { chapterId: this.chapterDetail.id },
            };
        },
        createdAt() {
            return DateTimeHelper.formatISODate(
                this.chapterDetail.createdTime,
                DateTimeHelper.DD_MM_YYYY_FORMAT
            );
        },
        viewCount() {
            return NumberHelper.formatNumberWithPeriods(
                this.chapterDetail.viewCount
            );
        },
        viewCountShort() {
            // Return a short string that represented the value of view count.
            return NumberHelper.formatNumberShort(this.chapterDetail.viewCount);
        },
        favoriteCount() {
            return NumberHelper.formatNumberWithPeriods(
                this.chapterDetail.favoriteCount
            );
        },
        favoriteCountShort() {
            // Return a short string that represented the value of favorite count.
            return NumberHelper.formatNumberShort(
                this.chapterDetail.favoriteCount
            );
        },
        commentCount() {
            return NumberHelper.formatNumberWithPeriods(
                this.chapterDetail.commentCount
            );
        },
        commentCountShort() {
            // Return a short string that represented the value of comment count.
            return NumberHelper.formatNumberShort(
                this.chapterDetail.commentCount
            );
        },
        allowComment() {
            return this.chapterDetail.allowComment;
        },
    },
};
</script>

<style scoped>
.chapter-image {
    width: 100px;
    height: 100px;
    background-color: rgba(0, 0, 0, 0.16);
}
</style>
