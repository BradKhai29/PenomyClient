<template>
    <q-page v-if="!isLoading">
        <CreatorStudio9PageHeader
            :comicId="chapterDetail.comicId"
            :headerTitle="chapterDetail.comicTitle"
        />
        <form @submit.prevent class="q-pa-lg">
            <section id="general-info" class="row justify-center q-gutter-lg">
                <section class="col-auto">
                    <ThumbnailInput
                        v-model="chapterDetail.thumbnailImageFile"
                        ref="thumbnailInput"
                    />
                </section>
                <div class="col-sm-6 col-md-8 col-grow">
                    <section class="q-pa-lg shadow-1 input-section">
                        <HeaderHighlight
                            label="Thông tin chung"
                            class="q-mb-md"
                        />

                        <ChapterUploadOrderInput
                            label="Thứ tự tập"
                            tooltipMessage="Thứ tự của tập truyện sẽ được đăng tải"
                            :displayContent="`${chapterDetail.uploadOrder}`"
                            class="q-mb-sm"
                        />

                        <TitleInput
                            v-model="chapterDetail.title"
                            :maxLength="100"
                            :required="true"
                            footerCaption="Đặt tiêu đề liên quan đến nội dung của tập truyện"
                            class="q-mb-sm"
                            ref="titleInput"
                            @hasChange="detectInputChange"
                            @verifyInput="addVerifyInputCallback"
                        />

                        <IntroductionInput
                            v-model="chapterDetail.description"
                            label="Giới thiệu về tập"
                            :maxLength="1000"
                            :required="false"
                            :rows="4"
                            footerCaption="Phần giới thiệu về tập này để đọc giả có thể nắm bắt thêm nội dung, tối đa 1000 ký tự"
                            class="q-mb-sm"
                        />

                        <PublicLevelInput
                            v-model="chapterDetail.publicLevel"
                            label="Giới hạn số người có thể truy cập vào mục này."
                            class="q-mb-sm"
                        />

                        <AllowCommentInput
                            v-model="chapterDetail.allowComment"
                            label="Mở phần bình luận"
                            class="q-mb-lg"
                        />

                        <ChapterImageListInput
                            class="q-mb-sm"
                            v-model="chapterDetail.chapterImageItems"
                            :disableMode="isCreating"
                            @verifyInput="addVerifyInputCallback"
                        />

                        <ChapterPublishOptionsInput
                            v-model="chapterDetail.scheduleOption"
                        />
                    </section>

                    <div
                        class="flex column q-pa-md shadow-1 input-section q-mt-lg"
                    >
                        <ConfirmPolicyInput
                            class="q-mb-md"
                            v-model="chapterDetail.confirmPolicy"
                        />
                        <div class="row q-gutter-sm">
                            <q-btn
                                v-if="hasInputData"
                                class="q-mt-xs bg-primary text-dark text-weight-bold col-grow"
                                label="Xác nhận tạo"
                                :loading="isCreating"
                                :disable="isCreating"
                                @click="createChapter(false)"
                            />
                            <q-btn
                                v-else
                                disable
                                class="q-mt-xs bg-primary text-dark text-weight-bold col-grow"
                                label="Xác nhận tạo"
                            />
                            <q-btn
                                v-if="!hasInputData"
                                disable
                                class="q-mt-xs bg-dark text-light text-weight-bold col-grow"
                            >
                                <q-icon name="description" size="sm" />
                                <span class="q-ml-xs">Tạo bản nháp</span>
                            </q-btn>
                            <q-btn
                                v-else-if="hasInputData"
                                :loading="isCreating"
                                :disable="isCreating"
                                @click="createChapter(true)"
                                class="q-mt-xs bg-dark text-light text-weight-bold col-grow"
                            >
                                <q-icon name="description" size="sm" />
                                <span class="q-ml-xs">Tạo bản nháp</span>
                            </q-btn>
                        </div>
                    </div>
                </div>
            </section>
        </form>
    </q-page>
</template>

<script>
// Import dependencies section.
import { computed } from "vue";
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { NumberHelper } from "src/helpers/NumberHelper";
import { CreatorStudio9ApiHandler } from "src/api.handlers/creatorStudio/creatorStudio9Page/CreatorStudio9ApiHandler";

// Import components section.
import CreatorStudio9PageHeader from "components/pages/creatorStudio/creatorStudio9Page/CreatorStudio9PageHeader.vue";
import HeaderHighlight from "components/common/creatorStudio/HeaderHighlight.vue";
import ChapterUploadOrderInput from "src/components/common/creatorStudio/DisableDisplayInput.vue";
import TitleInput from "components/common/creatorStudio/ArtworkTitleInput.vue";
import IntroductionInput from "components/common/creatorStudio/ArtworkIntroductionInput.vue";
import ThumbnailInput from "components/common/creatorStudio/ChapterThumbnailInput.vue";
import AllowCommentInput from "components/common/creatorStudio/ArtworkAllowCommentInput.vue";
import PublicLevelInput from "components/common/creatorStudio/ArtworkPublicLevelInput.vue";
import ChapterImageListInput from "components/common/creatorStudio/ChapterImageListInput.vue";
import ChapterPublishOptionsInput from "src/components/common/creatorStudio/ChapterPublishOptionsInput.vue";
import ConfirmPolicyInput from "components/common/creatorStudio/ArtworkConfirmPolicyInput.vue";
import { ScheduleOptionDetail } from "src/api.models/creatorStudio/common/ScheduleOptionDetail";

export default {
    components: {
        CreatorStudio9PageHeader,
        HeaderHighlight,
        ChapterUploadOrderInput,
        TitleInput,
        IntroductionInput,
        ThumbnailInput,
        AllowCommentInput,
        PublicLevelInput,
        ChapterImageListInput,
        ChapterPublishOptionsInput,
        ConfirmPolicyInput,
    },
    data() {
        return {
            invalidComicId: false,
            isLoading: true,
            isCreating: false,
            hasInputData: false,
            titleInput: null,
            chapterImageListInput: null,
            chapterDetail: {
                comicId: "",
                comicTitle: "",
                title: "",
                description: "",
                uploadOrder: 0,
                thumbnailImageFile: null,
                publicLevel: null,
                allowComment: false,
                confirmPolicy: false,
                chapterImageItems: [],
                /**
                 * @type {ScheduleOptionDetail} The type of this property.
                 */
                scheduleOption: ScheduleOptionDetail.new(),
            },
            verifyInputCallbacks: [],
        };
    },
    provide() {
        return {
            hasInputData: computed(() => this.hasInputData),
        };
    },
    beforeMount() {
        const comicId = this.$route.query.id;

        // Check if the comic id is valid or not.
        if (!NumberHelper.isNumber(comicId)) {
            this.invalidComicId = true;

            this.redirectToArtworkManagementPage();
            return;
        }

        this.chapterDetail.comicId = comicId;
    },
    async mounted() {
        if (this.invalidComicId) {
            return;
        }

        // Fetch the comic detail from api and check if the comic is existed or not.
        const comicDetail =
            await CreatorStudio9ApiHandler.getComicDetailToCreateChapterAsync(
                this.chapterDetail.comicId
            );

        if (!comicDetail.isExisted) {
            this.redirectToArtworkManagementPage();
        }

        // Populate important information to the chapter detail supported for creating.
        this.chapterDetail.comicTitle = comicDetail.title;
        this.chapterDetail.uploadOrder = comicDetail.lastChapterUploadOrder + 1;

        // Turn off the isLoading flag.
        this.isLoading = false;
    },
    methods: {
        redirectToArtworkManagementPage() {
            const artworkManagementRoute = "/studio/artworks";
            this.$router.push(artworkManagementRoute);
        },
        /**
         * Detect if any change in input to trigger the hasInputData flag.
         */
        detectInputChange(_, hasChange) {
            // Just need to detect at title input, no need to detect all.
            this.hasInputData = hasChange;
        },
        addVerifyInputCallback(callback) {
            this.verifyInputCallbacks.push(callback);
        },
        /**
         * Verify the input from the page and return result (boolean).
         *
         * @returns {Boolean} The result after verification.
         */
        verifyInput() {
            let isValid = true;

            for (const inputCallback of this.verifyInputCallbacks) {
                isValid &= inputCallback.verifyInput();
            }

            return isValid;
        },
        /**
         * Create a new chapter for this comic with the
         * provided information from chapter detail.
         *
         * @param {Boolean} [isDrafted=false] Specify to create a draft for this chapter. (Default is false)
         */
        async createChapter(isDrafted = false) {
            const isValidInput = this.verifyInput();

            if (!isValidInput) {
                NotificationHelper.notifyError("Bạn điền thiếu thông tin");

                return;
            }

            // Turn on is creating flag.
            this.isCreating = true;

            const result =
                await CreatorStudio9ApiHandler.createComicChapterAsync(
                    this.chapterDetail,
                    isDrafted
                );

            // Turn off is creating flag.
            this.isCreating = false;

            if (result.isSuccess) {
                const message = isDrafted
                    ? "Bản nháp được lưu"
                    : "Tạo mới thành công";

                this.hasInputData = false;
                NotificationHelper.notifySuccess(message);
                this.$router.push(
                    `/studio/comic/detail/${this.chapterDetail.comicId}`
                );
            } else {
                NotificationHelper.notifyError(result.message);
            }
        },
    },
};
</script>
