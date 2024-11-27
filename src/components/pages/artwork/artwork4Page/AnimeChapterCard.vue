<template>
    <router-link
        :to="chapterDetailRoute"
        class="text-decoration-none text-dark"
    >
        <div
            class="bg-dark-blur anime-chapter-card image border-radius-sm shadow-1 relative-position"
        >
            <q-img
                class="bg-light-300"
                :src="chapterDetail.thumbnailUrl"
                :ratio="1"
                width="100%"
                height="100%"
            />

            <div
                class="absolute flex items-center q-pa-sm"
                style="bottom: 0; right: 0"
            >
                <span class="bg-primary text-dark border-radius-sm q-px-xs">
                    Tập {{ chapterDetail.uploadOrder }}
                </span>
            </div>
        </div>

        <div class="chapter-detail-section q-mt-sm">
            <p class="flex q-mb-none">
                <span class="text-weight-bold">
                    Tập {{ chapterDetail.uploadOrder }}
                </span>
                <span class="q-ml-xs">: Lorem ipsum ffffff</span>
            </p>
            <!-- Chapter metadata section -->
            <div class="row items-center text-dark-500 text-subtitle2 q-mt-xs">
                <!-- Chapter created time metadata -->
                <div class="flex items-center">
                    <q-icon name="task" size="12px" />
                    <span class="q-ml-xs">
                        {{ createdAt }}
                    </span>
                    <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="tooltipOffset"
                    >
                        <strong class="text-subtitle2"> Ngày đăng tải </strong>
                    </q-tooltip>
                </div>
                <!-- Chapter created time metadata -->

                <!-- Chapter view count metadata -->
                <div class="flex items-center q-ml-md">
                    <q-icon name="visibility" size="12px" />
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
                <div class="flex items-center q-ml-md">
                    <q-icon name="favorite" size="12px" />
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
                </div>
                <!-- Chapter favorite count metadata -->
            </div>
            <!-- Chapter metadata section -->
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
    name: "AnimeChapterCard",
    props: {
        artworkId: {
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
                    comicId: this.artworkId,
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
.anime-chapter-card.image {
    --width: 226px;
    --ratio: 0.64;

    width: var(--width);
    height: calc(var(--width) * var(--ratio));
}
</style>
