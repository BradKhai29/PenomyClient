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

                    <q-btn dense unelevated no-caps icon="more_vert">
                        <q-menu
                            :offset="[0, 6.4]"
                            anchor="bottom left"
                            self="bottom end"
                            fit
                        >
                            <q-list
                                class="text-subtitle1"
                                style="min-width: 120px"
                            >
                                <q-item clickable v-close-popup>
                                    <q-item-section
                                        @click="showRemoveDialog = true"
                                    >
                                        Xóa vĩnh viễn
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-btn>

                    <!-- Remove chapter dialog -->
                    <q-dialog v-model="showRemoveDialog">
                        <q-card style="max-width: 480px">
                            <q-card-section>
                                <div class="text-subtitle1 flex items-center">
                                    <q-badge
                                        class="bg-secondary-900 text-light"
                                    >
                                        <q-icon
                                            name="delete_forever"
                                            size="sm"
                                        />
                                    </q-badge>
                                    <span
                                        class="q-ml-sm text-weight-bold text-secondary-900"
                                    >
                                        Xóa vĩnh viễn tập truyện?
                                    </span>
                                </div>
                            </q-card-section>
                            <q-card-section class="q-py-none">
                                <div class="text-subtitle1 q-mb-md">
                                    Bạn có muốn hệ thống xóa tập truyện?

                                    <div
                                        class="q-pa-sm bg-light-300 border-radius-sm text-weight-bold text-secondary-900"
                                    >
                                        {{ uploadOrder }}: {{ title }}
                                    </div>
                                </div>
                                <div class="text-subtitle1">
                                    <strong>Lưu ý:</strong>
                                    Thao tác này không thể hoàn tác, nội dùng
                                    này sẽ bị xóa vĩnh viễn và
                                    <strong>không thể khôi phục trở lại</strong>
                                </div>
                            </q-card-section>

                            <q-card-actions align="right">
                                <q-btn
                                    flat
                                    no-caps
                                    label="Hủy"
                                    color="dark"
                                    v-close-popup
                                    class="text-subtitle1"
                                    :disable="isProcessing"
                                />
                                <q-btn
                                    flat
                                    no-caps
                                    label="Xác nhận xóa"
                                    color="negative"
                                    class="text-subtitle1 text-weight-bold"
                                    @click="removeChapter"
                                    :disable="isProcessing"
                                    :loading="isProcessing"
                                />
                            </q-card-actions>
                        </q-card>
                    </q-dialog>
                    <!-- Remove chapter dialog -->
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
import {
    PublishStatuses,
    CreatorStudio7ApiHandler,
} from "src/api.handlers/creatorStudio/creatorStudio7Page/CreatorStudio7ApiHandler";
import { CreatorStudio10RouteNames } from "src/router/creatorStudio/CreatorStudio10PageRoute";
import { CreatorStudio11RouteNames } from "src/router/creatorStudio/CreatorStudio11PageRoute";
import { NotificationHelper } from "src/helpers/NotificationHelper";

export default {
    name: "ComicChapterCard",
    emits: ["removeItem"],
    props: {
        id: {
            required: true,
        },
        comicId: {
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
            showRemoveDialog: false,
            isProcessing: false,
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
        async removeChapter() {
            this.isProcessing = true;
            this.showRemoveDialog = false;

            const removeResult =
                await CreatorStudio7ApiHandler.removeChapterAsync(
                    this.comicId,
                    this.id
                );

            if (removeResult) {
                this.$emit("removeItem", this.id, this.publishStatus);

                NotificationHelper.notifySuccess(
                    `Xóa tập ${this.uploadOrder}: ${this.title} thành công`
                );
            } else {
                NotificationHelper.notifyError(`Có gì đó không ổn...`);
            }

            this.isProcessing = false;
        },
    },
};
</script>
