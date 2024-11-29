<template>
    <div class="row items-center shadow-1 border-radius-sm">
        <router-link :to="chapterDetailRoute">
            <q-img
                :src="thumbnailUrl"
                style="width: 100px; height: 100px"
                :ratio="1"
            />
        </router-link>
        <section class="col-grow q-pl-md q-pr-sm">
            <div id="chapter_header" class="row text-subtitle2">
                <div class="flex items-center q-mr-auto text-subtitle2">
                    <span v-if="!isDrafted" class="text-weight-bold">
                        Tập {{ uploadOrder }}
                    </span>
                    <span
                        v-else-if="isDrafted"
                        class="border-radius-sm col-md-auto bg-primary-700 text-primary text-weight-bold"
                        style="padding: 2px 4px"
                    >
                        Bản nháp
                    </span>
                    <span
                        v-if="isScheduled"
                        class="q-ml-sm border-radius-sm col-md-auto bg-light-500 text-dark"
                        style="padding: 2px 4px"
                    >
                        Lên lịch
                    </span>
                </div>
                <div class="flex items-center">
                    <q-btn
                        v-if="isDrafted"
                        dense
                        unelevated
                        no-caps
                        class="text-subtitle2 bg-primary text-dark text-weight-bold q-px-sm q-mr-sm"
                        >Xuất bản</q-btn
                    >
                    <router-link :to="chapterEditRoute">
                        <q-btn
                            dense
                            unelevated
                            no-caps
                            class="text-subtitle2 bg-dark text-light text-weight-bold q-px-sm"
                            >Sửa</q-btn
                        >
                    </router-link>

                    <q-btn dense unelevated no-caps icon="more_vert" />
                </div>
            </div>
            <div>
                <router-link :to="chapterDetailRoute">
                    <q-btn
                        dense
                        flat
                        no-caps
                        class="text-subtitle1 text-dark"
                        padding="none"
                    >
                        {{ title }}
                    </q-btn>
                </router-link>
            </div>
            <div class="row items-center text-dark-500 text-subtitle2 q-mt-sm">
                <div class="flex items-center">
                    <q-icon name="task" size="xs" />
                    <span class="q-ml-xs">{{ createdAt }}</span>
                    <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[4, 4]"
                    >
                        <strong class="text-subtitle2">Ngày tạo </strong>
                    </q-tooltip>
                </div>
                <div class="q-ml-md flex items-center">
                    <q-icon name="calendar_month" size="xs" />
                    <span class="q-ml-xs">{{ publishedAt }}</span>
                    <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[4, 4]"
                    >
                        <strong class="text-subtitle2"
                            >{{
                                isScheduled ? "Ngày lên lịch" : "Ngày xuất bản"
                            }}
                        </strong>
                    </q-tooltip>
                </div>
                <div class="q-ml-md flex items-center">
                    <q-avatar
                        size="xs"
                        :class="
                            allowComment
                                ? 'bg-primary text-dark'
                                : 'bg-secondary-100 text-secondary-900'
                        "
                    >
                        <q-icon
                            :name="allowComment ? 'check' : 'close'"
                            size="12px"
                        />
                    </q-avatar>
                    <span class="q-ml-xs">
                        {{ allowComment ? "Bật bình luận" : "Tắt bình luận" }}
                    </span>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
// Import dependencies section.
import { PublishStatuses } from "src/api.handlers/creatorStudio/creatorStudio7Page/CreatorStudio7ApiHandler";
import { CreatorStudio10RouteNames } from "src/router/creatorStudio/CreatorStudio10PageRoute";
import { CreatorStudio11RouteNames } from "src/router/creatorStudio/CreatorStudio11PageRoute";

export default {
    name: "ComicChapterCard",
    props: {
        id: {
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        uploadOrder: {
            type: Number,
            required: true,
            default: 0,
        },
        thumbnailUrl: {
            type: String,
            required: true,
        },
        publishStatus: {
            type: Number,
            required: true,
        },
        publicLevel: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: String,
            required: true,
        },
        publishedAt: {
            type: String,
            required: true,
        },
        allowComment: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            isDrafted: false,
            isScheduled: false,
        };
    },
    computed: {
        chapterDetailRoute() {
            return {
                name: CreatorStudio10RouteNames.ChapterDetail,
                params: { chapterId: this.id },
            };
        },
        chapterEditRoute() {
            return {
                name: CreatorStudio11RouteNames.ChapterEdit,
                params: { chapterId: this.id },
            };
        },
    },
    beforeMount() {
        this.checkChapterPublishStatus();
    },
    methods: {
        checkChapterPublishStatus() {
            this.isDrafted = this.publishStatus == PublishStatuses.DRAFTED;
            this.isScheduled = this.publishStatus == PublishStatuses.SCHEDULED;
        },
    },
};
</script>
