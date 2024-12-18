<template>
    <q-page v-if="!isLoading">
        <section id="artwork-detail-section-wrapper" :style="detailCardStyle">
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
                        {{ title }}
                    </span>
                </div>
                <section
                    id="artwork-detail-card"
                    class="row q-mt-md q-pa-md shadow-1 bg-light border-radius-md"
                >
                    <q-img
                        class="q-mr-md border-radius-md shadow-1"
                        :src="thumbnailUrl"
                        width="225px"
                        height="280px"
                    />
                    <div class="col-grow column q-py-xs">
                        <h5 class="q-my-none text-weight-bold q-mb-md">
                            {{ title }}
                        </h5>
                        <div id="artwork-metadata" class="row">
                            <div
                                id="country-and-author"
                                class="column col-grow"
                            >
                                <div class="q-mb-xs text-subtitle1">
                                    <span class="text-weight-bold">
                                        Quốc gia:
                                    </span>
                                    <span>{{ origin }}</span>
                                </div>
                                <div class="q-mb-xs text-subtitle1">
                                    <span class="text-weight-bold">
                                        Tác giả:
                                    </span>
                                    <span>{{ authorName }}</span>
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
                                        {{ statusName }}
                                    </span>
                                    <q-icon
                                        :name="statusIcon"
                                        size="16px"
                                        class="border-radius-rounded"
                                        :class="
                                            isCancelled
                                                ? 'bg-secondary-900 text-light'
                                                : 'bg-primary text-dark '
                                        "
                                        style="padding: 2px"
                                    />
                                </div>
                                <div class="q-mb-xs text-subtitle1">
                                    <span class="text-weight-bold">
                                        Series:
                                    </span>
                                    <span>{{ series }}</span>
                                </div>
                            </div>
                        </div>
                        <div
                            id="artwork-categories"
                            class="q-gutter-sm q-my-sm"
                        >
                            <q-btn
                                v-for="category in categories"
                                :key="category"
                                dense
                                no-caps
                                unelevated
                                class="bg-dark text-light text-subtitle2 text-weight-bold border-radius-sm q-px-sm"
                            >
                                {{ category.label }}
                            </q-btn>
                        </div>
                        <div
                            id="action-button-group"
                            class="q-gutter-sm q-mt-auto"
                        >
                            <q-btn
                                :to="artworkEditLink"
                                class="bg-light-300 text-dark text-subtitle1 text-weight-bold"
                                no-caps
                                rounded
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
                                class="text-light text-subtitle1 text-weight-bold"
                                no-caps
                                rounded
                                color="negative"
                                @click="showRemoveDialog = true"
                            >
                                <q-icon name="delete" size="sm" />
                                <span class="q-ml-xs">Xóa</span>
                            </q-btn>
                            <q-dialog v-model="showRemoveDialog">
                                <q-card>
                                    <q-card-section class="row items-center">
                                        <q-avatar
                                            icon="delete"
                                            color="negative"
                                            text-color="white"
                                        />
                                        <span class="q-ml-sm text-subtitle1">
                                            Tạm xóa tác phẩm này?
                                        </span>
                                    </q-card-section>

                                    <q-card-actions align="right">
                                        <q-btn
                                            flat
                                            no-caps
                                            label="Hủy"
                                            color="dark"
                                            v-close-popup
                                            :disable="isProcessing"
                                            class="text-subtitle1"
                                        />
                                        <q-btn
                                            flat
                                            no-caps
                                            label="Xác nhận xóa"
                                            color="negative"
                                            class="text-subtitle1 text-weight-bold"
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

        <section
            id="artwork-chapters-section"
            class="q-py-lg row justify-center"
        >
            <div
                class="artwork-detail-section row items-center bg-light-100 shadow-1 border-radius-md border-md-dark-500 q-pa-sm"
            >
                <span class="q-mr-auto text-subtitle1"
                    >Bạn đang xem với vai trò "<span class="text-weight-bold"
                        >Tác giả</span
                    >"</span
                >
                <a
                    :href="artworkDetailLink"
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
                        {{ introduction }}
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
                            :to="addChapterLink"
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
                            :artworkId="artworkId"
                            @removeItem="handleRemoveChapter"
                        />
                    </div>
                </div>
            </section>
        </section>
    </q-page>
</template>

<script>
import {
    CreatorStudio7ApiHandler,
    PublishStatuses,
} from "src/api.handlers/creatorStudio/creatorStudio7Page/CreatorStudio7ApiHandler";
import { ComicDetail } from "src/api.models/creatorStudio/creatorStudio7Page/ComicDetail";
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { CreatorStudio8ApiHandler } from "src/api.handlers/creatorStudio/creatorStudio8Page/CreatorStudio8ApiHandler";
import { ComicChapterDetail } from "src/api.models/creatorStudio/creatorStudio7Page/ComicChapterDetail";

// Import components section.
import HeaderHighlight from "src/components/common/creatorStudio/HeaderHighlight.vue";
import ComicChapterCard from "src/components/pages/creatorStudio/creatorStudio7Page/ComicChapterCard.vue";

// Init store for later operation.
import { useCreatorStore } from "src/stores/common/CreatorStore";
const creatorStore = useCreatorStore();

export default {
    components: {
        HeaderHighlight,
        ComicChapterCard,
    },
    data() {
        return {
            isLoading: true,
            showRemoveDialog: false,
            detailCardStyle: {
                background:
                    "url(https://res.cloudinary.com/dsjsmbdpw/image/upload/v1728123518/comics/1605215803461632/1605215803461632.jpg) no-repeat",
                backgroundSize: "cover",
            },
            artworkId: null,
            /**
             * @type {ComicDetail} Type of this data property.
             */
            artworkDetail: null,
            /**
             * @type {ComicChapterDetail[]} Type of this array.
             */
            draftedChapters: [],
            isLoadingDrafted: true,
            /**
             * @type {ComicChapterDetail[]} Type of this array.
             */
            publishedChapters: [],
            isLoadingPublished: true,
        };
    },
    computed: {
        artworkDetailLink() {
            return `/artwork/comic/${this.artworkId}`;
        },
        artworkEditLink() {
            return `/studio/comic/edit/${this.artworkId}`;
        },
        addChapterLink() {
            return {
                name: "create-chapter",
                query: { id: this.artworkId },
            };
        },
        title() {
            return this.artworkDetail.title;
        },
        introduction() {
            return this.artworkDetail.introduction;
        },
        isCancelled() {
            return this.artworkDetail.isCancelled();
        },
        thumbnailUrl() {
            return this.artworkDetail.thumbnailUrl;
        },
        origin() {
            return this.artworkDetail.origin;
        },
        authorName() {
            return this.artworkDetail.authorName;
        },
        statusName() {
            return this.artworkDetail.getStatusName();
        },
        statusIcon() {
            return this.artworkDetail.getStatusIcon();
        },
        series() {
            return this.artworkDetail.series ?? "Không có";
        },
        categories() {
            return this.artworkDetail.categories;
        },
    },
    beforeMount() {
        this.artworkId = this.$route.params.artworkId;
    },
    async mounted() {
        const result = await CreatorStudio7ApiHandler.getComicDetailByIdAsync(
            this.artworkId
        );

        if (!result) {
            NotificationHelper.notifyError("Tác phẩm không tồn tại");

            // Redirect back to artwork manager page.
            this.$router.push("/studio/artworks");
            return;
        }

        this.artworkDetail = result;
        this.getBackground();

        // Turn off loading flag to display content.
        this.isLoading = false;

        this.getAllPublishedChapters();
        this.getAllDraftedChapters();
    },
    methods: {
        getBackground() {
            const backgroundStyle = `url(${this.artworkDetail.thumbnailUrl}) no-repeat`;
            this.detailCardStyle.background = backgroundStyle;
        },
        async getAllPublishedChapters() {
            const chapterList =
                await CreatorStudio7ApiHandler.getComicChaptersByIdAndPublishStatusAsync(
                    this.artworkId,
                    PublishStatuses.PUBLISHED
                );

            this.publishedChapters.push(...chapterList);
            this.isLoadingPublished = false;
        },
        async getAllDraftedChapters() {
            // Get all drafted chapters
            const chapterList =
                await CreatorStudio7ApiHandler.getComicChaptersByIdAndPublishStatusAsync(
                    this.artworkId,
                    PublishStatuses.DRAFTED
                );

            this.draftedChapters.push(...chapterList);
            this.isLoadingDrafted = false;
        },
        async removeArtworkAsync() {
            const result =
                await CreatorStudio8ApiHandler.temporarilyRemoveComicByIdAsync(
                    this.artworkId
                );

            // Check the removing result.
            if (result.isSuccess) {
                this.updateStoreState();

                NotificationHelper.notifySuccess("Tác phẩm đã bị tạm xóa");

                // Redirect back to artwork manager page.
                this.$router.push("/studio/artworks");
            } else {
                NotificationHelper.notifyError(result.message);
            }

            this.showRemoveDialog = false;
        },
        handleRemoveChapter(chapterId, publishStatus) {
            const isDrafted = publishStatus == PublishStatuses.DRAFTED;
            const notFoundIndex = -1;

            if (isDrafted) {
                const itemIndex = this.draftedChapters.findIndex(
                    (item) => item.id == chapterId
                );

                if (itemIndex != notFoundIndex) {
                    this.draftedChapters.splice(itemIndex, 1);
                }
            } else {
                const itemIndex = this.publishedChapters.findIndex(
                    (item) => item.id == chapterId
                );

                if (itemIndex != notFoundIndex) {
                    const removedChapter = this.publishedChapters.splice(
                        itemIndex,
                        1
                    )[0];

                    // Update the upload order of all chapters
                    //that publish after removed chapter.
                    this.publishedChapters.forEach((chapter) => {
                        if (chapter.uploadOrder > removedChapter.uploadOrder) {
                            chapter.uploadOrder = chapter.uploadOrder - 1;
                        }
                    });
                }
            }
        },
        updateStoreState() {
            creatorStore.setTotalDeletedComics(
                creatorStore.totalDeletedComics + 1
            );
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
