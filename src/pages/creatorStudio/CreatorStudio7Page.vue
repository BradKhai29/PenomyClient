<template>
    <section id="artwork-detail-section-wrapper" :style="comicDetailCardStyle">
        <section
            id="artwork-detail-section"
            class="q-py-lg row justify-center"
            style="background-color: rgba(0, 0, 0, 0.4)"
        >
            <div
                id="artwork-detail-breadcrumb"
                class="row items-center q-pa-sm shadow-1 bg-light border-radius-md"
            >
                <router-link to="/studio/artworks">
                    <q-btn
                        dense
                        flat
                        no-caps
                        unelevated
                        class="text-subtitle1 text-weight-bold text-dark"
                    >
                        Quản lý chung
                    </q-btn>
                </router-link>
                <span class="text-weight-bold">
                    <q-icon name="chevron_right" size="sm" />
                </span>
                <span class="text-subtitle1 text-weight-bold">
                    {{ comicDetail.title }}
                </span>
            </div>
            <section
                id="artwork-detail-card"
                class="row q-mt-md q-pa-md shadow-1 bg-light border-radius-md"
            >
                <q-img
                    class="q-mr-md border-radius-md shadow-1"
                    :src="comicDetail.thumbnailUrl"
                    width="225px"
                    height="280px"
                />
                <div class="col-grow column q-py-xs">
                    <h5 class="q-my-none text-weight-bold q-mb-md">
                        {{ comicDetail.title }}
                    </h5>
                    <div id="artwork-metadata" class="row">
                        <div id="country-and-author" class="column col-grow">
                            <div class="q-mb-xs text-subtitle1">
                                <span class="text-weight-bold">
                                    Quốc gia:
                                </span>
                                <span>{{ comicDetail.origin }}</span>
                            </div>
                            <div class="q-mb-xs text-subtitle1">
                                <span class="text-weight-bold"> Tác giả: </span>
                                <span>{{ comicDetail.authorName }}</span>
                            </div>
                        </div>
                        <div id="status-and-series" class="column col-grow">
                            <div
                                class="q-mb-xs text-subtitle1 row items-center"
                            >
                                <span class="text-weight-bold">
                                    Trạng thái:
                                </span>
                                <span class="q-mx-xs">
                                    {{ comicDetail.getStatusName() }}
                                </span>
                                <q-icon
                                    v-if="
                                        comicDetail.artworkStatus ==
                                        artworkStatuses.finished
                                    "
                                    :name="comicDetail.getStatusIcon()"
                                    size="16px"
                                    class="bg-primary text-dark border-radius-rounded"
                                    style="padding: 2px"
                                />
                                <q-icon
                                    v-else-if="
                                        comicDetail.artworkStatus ==
                                        artworkStatuses.cancelled
                                    "
                                    :name="comicDetail.getStatusIcon()"
                                    size="16px"
                                    class="bg-secondary-500 text-light border-radius-rounded"
                                    style="padding: 2px"
                                />
                            </div>
                            <div class="q-mb-xs text-subtitle1">
                                <span class="text-weight-bold"> Series: </span>
                                <span>{{
                                    comicDetail.series ?? "Không có"
                                }}</span>
                            </div>
                        </div>
                    </div>
                    <div id="artwork-categories" class="q-gutter-sm q-my-sm">
                        <q-btn
                            v-for="category in comicDetail.categories"
                            :key="category"
                            dense
                            no-caps
                            unelevated
                            class="bg-dark text-light text-subtitle2 text-weight-bold border-radius-sm q-px-sm"
                        >
                            {{ category.label }}
                        </q-btn>
                    </div>
                    <div id="action-button-group" class="q-gutter-sm q-mt-auto">
                        <q-btn
                            class="bg-light-300 text-dark text-subtitle1 text-weight-bold"
                            no-caps
                            rounded
                            @click="goToEdit"
                        >
                            <q-icon name="edit" size="sm" />
                            <span class="q-ml-xs">Sửa</span>
                        </q-btn>
                        <q-btn
                            class="bg-light-300 text-dark text-subtitle1 text-weight-bold"
                            no-caps
                            rounded
                        >
                            <q-icon name="report" size="sm" />
                            <span class="q-ml-xs">Bị báo cáo</span>
                            <q-badge
                                rounded
                                floating
                                class="bg-dark text-light text-weight-bold"
                            >
                                0
                            </q-badge>
                        </q-btn>
                        <q-btn
                            class="bg-light-300 text-dark text-subtitle1 text-weight-bold"
                            no-caps
                            rounded
                        >
                            <q-icon name="bar_chart" size="sm" />
                            <span class="q-ml-xs">Thống kê</span>
                        </q-btn>
                        <q-btn
                            class="bg-secondary-500 text-light text-subtitle1 text-weight-bold"
                            no-caps
                            rounded
                            @click="showRemoveDialog = true"
                        >
                            <q-icon name="delete" size="sm" />
                            <span class="q-ml-xs">Xóa</span>
                        </q-btn>
                        <q-dialog v-model="showRemoveDialog" persistent>
                            <q-card>
                                <q-card-section class="row items-center">
                                    <q-avatar
                                        icon="delete"
                                        color="primary"
                                        text-color="white"
                                    />
                                    <span class="q-ml-sm text-subtitle1">
                                        Bạn xác nhận xóa tác phẩm này
                                    </span>
                                </q-card-section>

                                <q-card-actions align="right">
                                    <q-btn
                                        flat
                                        no-caps
                                        label="Hủy"
                                        color="primary"
                                        v-close-popup
                                        :disable="isProcessing"
                                        class="text-subtitle1"
                                    />
                                    <q-btn
                                        flat
                                        no-caps
                                        label="Xác nhận xóa"
                                        color="primary"
                                        class="text-subtitle1"
                                        @click="removeArtworkAsync"
                                        :disable="isProcessing"
                                    />
                                </q-card-actions>
                            </q-card>
                        </q-dialog>
                    </div>
                </div>
            </section>
        </section>
    </section>

    <section id="artwork-chapters-section" class="q-py-lg row justify-center">
        <div
            class="artwork-detail-section row items-center bg-light-100 shadow-1 border-radius-md border-md-dark-500 q-pa-sm"
        >
            <span class="q-mr-auto text-subtitle1"
                >Bạn đang xem với vai trò "<span class="text-weight-bold"
                    >Tác giả</span
                >"</span
            >
            <a
                :href="`/artwork/comic/${comicDetail.id}`"
                target="_blank"
                rel="noopener noreferrer"
            >
                <q-btn
                    no-caps
                    dense
                    unelevated
                    class="bg-dark text-light text-weight-bold q-px-sm border-radius-sm"
                >
                    Chế độ người dùng
                </q-btn>
            </a>
        </div>
        <section
            id="artwork-introduction-and-chapters"
            class="artwork-detail-section bg-light-100 shadow-1 q-mt-md border-radius-md border-md-dark-500 q-pa-md"
        >
            <div id="artwork-introduction-section" class="q-mb-md">
                <HeaderHighlight label="Phần giới thiệu" />
                <div class="text-subtitle1 q-mt-sm">
                    {{ comicDetail.introduction }}
                </div>
            </div>
            <div
                v-if="!isLoadingDrafted && draftedChapters.length != 0"
                id="artwork-introduction-section"
                class="q-mb-md"
            >
                <q-btn
                    no-caps
                    dense
                    unelevated
                    class="bg-dark text-light text-weight-bold q-px-sm border-radius-sm"
                >
                    Số bản nháp: {{ draftedChapters.length }}
                </q-btn>
                <div class="text-subtitle1 q-mt-sm q-gutter-sm">
                    <ComicChapterCard
                        v-for="chapter in draftedChapters"
                        :key="chapter.id"
                        v-bind="chapter"
                    />
                </div>
            </div>
            <div
                v-if="!isLoadingPublished"
                id="artwork-introduction-section"
                class="q-mb-md q-mt-md"
            >
                <div class="flex items-center">
                    <q-btn
                        no-caps
                        dense
                        unelevated
                        class="bg-dark text-light text-weight-bold q-px-sm border-radius-sm"
                    >
                        Đã xuất bản: {{ publishedChapters.length }}
                    </q-btn>
                    <q-btn
                        no-caps
                        dense
                        color="grey-3"
                        class="text-dark q-ml-sm q-px-sm"
                        @click="goToAddChapter"
                    >
                        <span class="q-mr-xs">Tạo mới</span>
                        <q-icon name="add_circle" size="xs" />
                    </q-btn>
                </div>
                <div class="text-subtitle1 q-mt-md q-gutter-sm">
                    <ComicChapterCard
                        v-for="chapter in publishedChapters"
                        :key="chapter.id"
                        v-bind="chapter"
                    />
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import {
    CreatorStudio7ApiHandler,
    PublishStatuses,
} from "src/api.handlers/creatorStudio/creatorStudio7Page/CreatorStudio7ApiHandler";
import {
    ComicDetail,
    artworkStatuses,
} from "src/api.models/creatorStudio/creatorStudio7Page/ComicDetail";
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { CreatorStudio8ApiHandler } from "src/api.handlers/creatorStudio/creatorStudio8Page/CreatorStudio8ApiHandler";

// Import components section.
import HeaderHighlight from "src/components/common/creatorStudio/HeaderHighlight.vue";
import ComicChapterCard from "src/components/pages/creatorStudio/creatorStudio7Page/ComicChapterCard.vue";

export default {
    components: {
        HeaderHighlight,
        ComicChapterCard,
    },
    data() {
        return {
            showRemoveDialog: false,
            comicDetailCardStyle: {
                background:
                    "url(https://res.cloudinary.com/dsjsmbdpw/image/upload/v1728123518/comics/1605215803461632/1605215803461632.jpg) no-repeat",
                backgroundSize: "cover",
            },
            comicDetail: new ComicDetail(),
            artworkStatuses: artworkStatuses,
            draftedChapters: [],
            isLoadingDrafted: true,
            publishedChapters: [],
            isLoadingPublished: true,
        };
    },
    beforeMount() {
        this.comicDetail.id = this.$route.params.comicId;
    },
    async mounted() {
        const result = await CreatorStudio7ApiHandler.getComicDetailByIdAsync(
            this.comicDetail.id
        );

        if (!result) {
            NotificationHelper.notifyError("Tác phẩm không tồn tại");

            // Redirect back to artwork manager page.
            this.$router.push("/studio/artworks");
            return;
        }

        this.comicDetail = result;
        this.getBackground();

        // Get all drafted chapters
        CreatorStudio7ApiHandler.getComicChaptersByIdAndPublishStatusAsync(
            this.comicDetail.id,
            PublishStatuses.DRAFTED
        ).then((result) => {
            this.draftedChapters = result;
            this.isLoadingDrafted = false;
        });

        // Get all published chapters
        CreatorStudio7ApiHandler.getComicChaptersByIdAndPublishStatusAsync(
            this.comicDetail.id,
            PublishStatuses.PUBLISHED
        ).then((result) => {
            this.publishedChapters = result;
            this.isLoadingPublished = false;
        });
    },
    methods: {
        getBackground() {
            const backgroundStyle = `url(${this.comicDetail.thumbnailUrl}) no-repeat`;
            this.comicDetailCardStyle.background = backgroundStyle;
        },
        goToEdit() {
            this.$router.push(`/studio/comic/edit/${this.comicDetail.id}`);
        },
        async removeArtworkAsync() {
            const result =
                await CreatorStudio8ApiHandler.temporarilyRemoveComicByIdAsync(
                    this.comicDetail.id
                );

            // Check the removing result.
            if (result.isSuccess) {
                NotificationHelper.notifySuccess("Tác phẩm đã bị tạm xóa");

                // Redirect back to artwork manager page.
                this.$router.push("/studio/artworks");
            } else {
                NotificationHelper.notifyError(result.message);
            }

            this.showRemoveDialog = false;
        },
        goToAddChapter() {
            this.$router.push({
                name: "create-chapter",
                query: { id: this.comicDetail.id },
            });
        },
    },
};
</script>

<style scoped>
#artwork-detail-breadcrumb,
#artwork-detail-card,
.artwork-detail-section {
    --max-width: 80%;

    max-width: var(--max-width);
    width: var(--max-width);
}
</style>
