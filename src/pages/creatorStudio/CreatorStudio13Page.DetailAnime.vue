<template>
    <q-page v-if="!isLoading">
        <section id="artwork-detail-section-wrapper" :style="detailCardStyle">
            <section
                id="artwork-detail-section"
                class="q-py-lg row justify-center"
                style="background-color: rgba(0, 0, 0, 0.48)"
            >
                <div
                    id="artwork-detail-breadcrumb"
                    class="row items-center q-pa-sm shadow-1 bg-dark-900 border-radius-md text-primary"
                >
                    <router-link to="/studio/artworks">
                        <q-btn
                            dense
                            flat
                            no-caps
                            unelevated
                            class="text-subtitle1 text-weight-bold text-primary"
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
                    class="row q-mt-md shadow-1 border-radius-md text-light"
                    style="background-color: rgba(0, 0, 0, 0.64)"
                >
                    <div class="col-grow column q-pa-md">
                        <h5 class="q-my-none text-weight-bold q-mb-md">
                            {{ title }}
                        </h5>
                        <div id="artwork-metadata" class="row">
                            <div
                                id="status-and-series"
                                class="flex col-grow items-center"
                            >
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
                                <!-- Separator -->
                                <span
                                    class="border-sm-light"
                                    style="height: 14px; margin: 0 10px"
                                ></span>
                                <div class="text-subtitle1">
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
                                class="bg-light text-dark text-subtitle2 text-weight-bold border-radius-sm q-px-sm"
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
                                class="bg-primary text-dark text-subtitle1 text-weight-bold"
                                no-caps
                            >
                                <q-icon name="edit" size="sm" />
                                <span class="q-ml-xs">Sửa</span>
                            </q-btn>
                            <q-btn
                                class="bg-primary text-dark text-subtitle1 text-weight-bold"
                                no-caps
                            >
                                <q-icon name="bar_chart" size="sm" />
                                <span class="q-ml-xs">Thống kê</span>
                            </q-btn>
                            <q-btn
                                class="bg-light-300 text-dark text-subtitle1 text-weight-bold"
                                no-caps
                            >
                                <q-icon name="report" size="sm" />
                                <span class="q-ml-xs">Bị báo cáo</span>
                                <q-badge
                                    rounded
                                    floating
                                    class="bg-light text-dark text-weight-bold"
                                >
                                    0
                                </q-badge>
                            </q-btn>
                            <q-btn
                                class="text-light text-subtitle1 text-weight-bold"
                                no-caps
                                color="negative"
                                @click="showRemoveDialog = true"
                            >
                                <q-icon name="delete" size="sm" />
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
                    <q-img
                        class="q-ml-md border-radius-md shadow-1"
                        :src="thumbnailUrl"
                        width="225px"
                        height="280px"
                    />
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
                    <HeaderHighlight label="Giới thiệu" />
                    <p class="text-subtitle1 q-mt-sm">{{ introduction }}</p>
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
                        <StudioAnimeChapterCard
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
                        >
                            <span class="q-mr-xs">Tạo mới</span>
                            <q-icon name="add_circle" size="xs" />
                        </q-btn>
                    </div>
                    <div class="text-subtitle1 q-mt-md q-gutter-sm">
                        <StudioAnimeChapterCard
                            v-for="chapter in publishedChapters"
                            :key="chapter.id"
                            v-bind="chapter"
                            :comicId="artworkId"
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
    CreatorStudioAnimeDetailApiHandler,
    PublishStatuses,
} from "src/api.handlers/creatorStudio/creatorStudio13Page.DetailAnime/CreatorStudioAnimeDetailApiHandler.js";
import { AnimeDetailResponseDto } from "src/api.models/creatorStudio/creatorStudio13Page.AnimeDetail/AnimeDetailResponseDto";

import { NotificationHelper } from "src/helpers/NotificationHelper";
import { CreatorStudio8ApiHandler } from "src/api.handlers/creatorStudio/creatorStudio8Page/CreatorStudio8ApiHandler";
import { ComicChapterDetail } from "src/api.models/creatorStudio/creatorStudio7Page/ComicChapterDetail";

// Import components section.
import HeaderHighlight from "src/components/common/creatorStudio/HeaderHighlight.vue";
import StudioAnimeChapterCard from "src/components/pages/creatorStudio/creatorStudio13Page.AnimeDetail/StudioAnimeChapterCard.vue";

// Init store for later operation.
import { useCreatorStore } from "src/stores/common/CreatorStore";
const creatorStore = useCreatorStore();

export default {
    components: {
        HeaderHighlight,
        StudioAnimeChapterCard,
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
             * @type {AnimeDetailResponseDto} Type of this property.
             */
            artworkDetail: null,
            comicDetail: new AnimeDetailResponseDto(),
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
            return `/artwork/anime/${this.artworkId}`;
        },
        artworkEditLink() {
            return `/studio/anime/edit/${this.artworkId}`;
        },
        addChapterLink() {
            return {
                name: "create-anime-chapter",
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
        await this.getArtworkDetailAsync();

        if (!this.artworkDetail) {
            NotificationHelper.notifyError("Tác phẩm không tồn tại");

            // Redirect back to artwork manager page.
            this.$router.push("/studio/artworks");
            return;
        }

        this.setBackground();
        this.getAllDraftedChapters();
        this.getAllPublishedChapters();

        this.isLoading = false;
    },
    methods: {
        async getArtworkDetailAsync() {
            const artworkDetail =
                await CreatorStudioAnimeDetailApiHandler.getAnimeDetailByIdAsync(
                    this.artworkId
                );

            this.artworkDetail = artworkDetail;
        },
        setBackground() {
            const backgroundStyle = `url(${this.artworkDetail.thumbnailUrl}) no-repeat`;
            this.detailCardStyle.background = backgroundStyle;
        },
        async getAllPublishedChapters() {
            const chapterList =
                await CreatorStudioAnimeDetailApiHandler.getChaptersByIdAndPublishStatusAsync(
                    this.artworkId,
                    PublishStatuses.PUBLISHED
                );

            this.publishedChapters.push(...chapterList);
            this.isLoadingPublished = false;
        },
        async getAllDraftedChapters() {
            // Get all drafted chapters
            const chapterList =
                await await CreatorStudioAnimeDetailApiHandler.getChaptersByIdAndPublishStatusAsync(
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
            creatorStore.setTotalDeletedAnimes(
                creatorStore.totalDeletedAnimes + 1
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
