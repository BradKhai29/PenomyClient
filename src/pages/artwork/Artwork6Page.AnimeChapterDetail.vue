<template>
    <q-page v-if="!isLoading">
        <section
            id="chapter-video-section"
            class="flex items-center align-stretch"
            :class="isVideoExpanded ? 'video-expanded' : ''"
        >
            <section class="chapter-video-player-wrapper">
                <ChapterVideoPlayer
                    :chapterDetail="chapterDetail"
                    @expanded="handleOnExpanded"
                />

                <div
                    class="flex bg-dark-900 text-primary text-subtitle1 q-px-md q-py-sm"
                >
                    <!-- Favorite count -->
                    <div class="metadata-tag q-mr-md">
                        <q-icon name="favorite" />
                        <span class="q-ml-xs">100K</span>
                    </div>
                    <!-- Followers count -->
                    <div class="metadata-tag">
                        <q-icon name="add_box" />
                        <span class="q-ml-xs">100K</span>
                    </div>
                </div>
            </section>

            <ChapterListSection
                :artworkId="artworkId"
                :chapterId="chapterId"
                :isVideoExpanded="isVideoExpanded"
                @changeChapter="handleChangeChapter"
            />
        </section>

        <section
            id="anime-detail-section"
            class="flex items-center align-stretch q-mt-sm"
        >
            <section class="anime-description-section">
                <div class="anime-description-container">
                    <p class="q-mb-none flex items-center text-dark text-h6">
                        <q-btn
                            no-caps
                            dense
                            padding="none"
                            unelevated
                            flat
                            class="text-weight-bold text-h6"
                        >
                            {{ animeTitle }}
                        </q-btn>
                        <span class="text-weight-bold">
                            <q-icon name="chevron_right" size="md" />
                        </span>
                        <span> Tập {{ uploadOrder }} </span>
                    </p>

                    <!-- Artwork detail section -->
                    <section id="artwork-detail-section">
                        <div class="flex items-center text-subtitle1 text-dark">
                            <span class="flex items-center"> Nhật Bản </span>
                            <!-- Separator -->
                            <span
                                class="border-sm-dark q-mx-sm"
                                style="padding: 6.4px 0px"
                            ></span>

                            <span> {{ totalViewShort }} lượt xem </span>

                            <!-- Separator -->
                            <span
                                class="border-sm-dark q-mx-sm"
                                style="padding: 6.4px 0px"
                            ></span>

                            <span>
                                Tập {{ uploadOrder }}: {{ chapterTitle }}
                            </span>
                        </div>

                        <div id="artwork-categories" class="q-mt-xs">
                            <q-btn
                                :to="`${$route.path}?categoryId=${category.categoryId}`"
                                v-for="category in categories"
                                :key="category"
                                :id="category.categoryId"
                                dense
                                no-caps
                                unelevated
                                class="bg-light-500 text-dark text-subtitle2 text-weight-bold border-radius-sm q-px-sm q-mr-xs"
                            >
                                {{ category.categoryName }}
                            </q-btn>
                            <q-btn
                                dense
                                flat
                                no-caps
                                unelevated
                                class="shadow-1 bg-dark-900 text-light q-px-sm border-radius-sm"
                            >
                                <q-icon name="info_outline" />
                                <span
                                    class="text-subtitle2 border-radius-sm q-ml-xs text-weight-bold"
                                    >Khác</span
                                >
                                <q-tooltip
                                    anchor="top middle"
                                    self="bottom middle"
                                    :offset="[10, 10]"
                                >
                                    <strong
                                        class="text-subtitle2 text-weight-bold"
                                    >
                                        Thông tin khác về tác phẩm
                                    </strong>
                                </q-tooltip>
                            </q-btn>
                        </div>

                        <p
                            class="q-mt-sm text-subtitle1"
                            style="line-height: 1.4"
                        >
                            <strong> Mô tả tập: </strong>
                            {{ chapterDescription }}
                        </p>
                    </section>
                </div>
            </section>

            <section class="q-ml-md flex-grow">
                <div class="border-sm-bottom-light-500 flex">
                    <span class="penomy-tab selected text-subtitle1 q-px-sm">
                        Đề xuất
                    </span>
                </div>
            </section>
        </section>
    </q-page>
</template>

<script>
// Import dependencies section.
import { AnimeChapterApiHandler } from "src/api.handlers/artwork/artwork6Page/AnimeChapterApiHandler";
import { AnimeChapterDetailResponseDto } from "src/api.models/artwork/artwork6Page/AnimeChapterDetailResponseDto";
import { AnimeDetailApiHandler } from "src/api.handlers/artwork/artwork4Page.AnimeDetail/AnimeDetailApiHandler";
import { NumberHelper } from "src/helpers/NumberHelper";
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { AnimeDetailResponseDto } from "src/api.models/creatorStudio/creatorStudio13Page.AnimeDetail/AnimeDetailResponseDto";
import { ViewHistoryApiHandler } from "src/api.handlers/artwork/common/ViewHistoryApiHandler";

// Import components section.
import ChapterVideoPlayer from "src/components/pages/artwork/artwork6Page.AnimeChapterDetail/ChapterVideoPlayer.vue";
import ChapterListSection from "src/components/pages/artwork/artwork6Page.AnimeChapterDetail/ChapterDetail.ChapterListSection.vue";

// Init store for later operation.
import { useAuthStore } from "src/stores/common/AuthStore";
import { useGuestStore } from "src/stores/common/GuestStore";

const authStore = useAuthStore();
const guestStore = useGuestStore();

export default {
    name: "Artwork6Page.Temp",
    components: {
        ChapterVideoPlayer,
        ChapterListSection,
    },
    data() {
        return {
            isLoading: true,
            artworkId: null,
            chapterId: null,
            isVideoExpanded: false,
            /**
             * @type {AnimeDetailResponseDto} The detail of anime contains this chapter.
             */
            animeDetail: null,
            /**
             * @type {AnimeChapterDetailResponseDto} Type of this property.
             */
            chapterDetail: null,
        };
    },
    computed: {
        animeTitle() {
            if (this.animeDetail) {
                return this.animeDetail.title;
            }

            return "null";
        },
        categories() {
            if (this.animeDetail) {
                return this.animeDetail.categories;
            }

            return [];
        },
        uploadOrder() {
            if (this.chapterDetail) {
                return this.chapterDetail.uploadOrder;
            }

            return 0;
        },
        totalViewShort() {
            if (this.chapterDetail) {
                return NumberHelper.formatNumberShort(
                    this.chapterDetail.totalViews
                );
            }

            return 0;
        },
        chapterTitle() {
            if (this.chapterDetail) {
                return this.chapterDetail.title;
            }

            return "";
        },
        chapterDescription() {
            if (this.chapterDetail) {
                if (this.chapterDetail.description.length > 10) {
                    console.log(this.chapterDetail.description);

                    return this.chapterDetail.description;
                }
            }

            return "Không có mô tả";
        },
    },
    beforeMount() {
        this.loadArtworkIdAndChapterIdFromRoute();

        this.isValidId =
            NumberHelper.isNumber(this.artworkId) &&
            NumberHelper.isNumber(this.chapterId);

        if (!this.isValidId) {
            // Redirect back to homepage when find invalid id.
            NotificationHelper.notifyError("Đường dẫn không hợp lệ");

            this.$router.push("/");

            return;
        }
    },
    async mounted() {
        await this.loadAnimeDetailAsync();
        await this.loadChapterDetailAsync();

        this.saveViewHistoryAsync();

        this.isLoading = false;
    },
    methods: {
        loadArtworkIdAndChapterIdFromRoute() {
            // Get the artworkId and chapterId from route.
            this.artworkId = this.$route.params.artworkId;
            this.chapterId = this.$route.params.chapterId;
        },
        handleOnExpanded(isVideoExpanded) {
            this.isVideoExpanded = isVideoExpanded;
        },
        async loadAnimeDetailAsync() {
            // Turn on the loading flag to wait for the content being loaded.
            this.isLoading = true;
            let guestId = -1;
            let accessToken = "null_token";

            const artworkDetail =
                await AnimeDetailApiHandler.getArtworkDetailByIdAsync(
                    this.artworkId,
                    guestId,
                    accessToken
                );

            if (!artworkDetail) {
                NotificationHelper.notifyError("Không tìm thấy nội dung");

                this.$router.push("/");
                return;
            }

            // If result is success, then get the information and bind to the comic detail.
            this.animeDetail = artworkDetail;
        },
        async saveViewHistoryAsync() {
            const isAuth = await authStore.isAuthAsync();

            if (isAuth) {
                ViewHistoryApiHandler.addViewHistoryAsync(
                    this.artworkId,
                    this.chapterId,
                    guestStore.currentGuestId
                );
            } else {
                await guestStore.waitForSetUp();

                ViewHistoryApiHandler.addViewHistoryAsync(
                    this.artworkId,
                    this.chapterId,
                    guestStore.currentGuestId
                );
            }
        },
        async loadChapterDetailAsync() {
            const chapterDetail =
                await AnimeChapterApiHandler.getChapterDetailByIdAsync(
                    this.artworkId,
                    this.chapterId
                );

            if (!chapterDetail) {
                NotificationHelper.notifyError("Nội dung không tồn tại");

                return;
            }

            this.chapterDetail = chapterDetail;
        },
        async handleChangeChapter() {
            this.loadArtworkIdAndChapterIdFromRoute();

            this.isLoading = true;
            await this.loadChapterDetailAsync();

            this.saveViewHistoryAsync();

            this.isLoading = false;
        },
    },
};
</script>

<style scoped>
#anime-detail-section,
#chapter-video-section {
    --margin-width: 60px;
    --marigin-top-width: 28px;

    overflow: hidden;
    max-width: 100% !important;

    margin-left: var(--margin-width);
    margin-right: var(--margin-width);
}

#chapter-video-section {
    margin-top: var(--marigin-top-width);
}

#chapter-video-section.video-expanded {
    --margin-width: 0;
    --marigin-top-width: 0;
}

.metadata-tag {
    display: flex;
    align-items: center;
}

/* Anime Description section */
.anime-description-section {
    --max-width: 1064px;
    --max-height: 600px;

    width: 100%;
    max-width: var(--max-width);
    max-height: var(--max-height);
    overflow: hidden !important;
}

/* Responsive section */
@media screen and (max-width: 1440px) {
    #chapter-video-section {
        --margin-width: 60px;
        --marigin-top-width: 20px;
    }

    .anime-description-section {
        --max-width: 888px;
        --max-height: 500px;
    }
}
</style>
