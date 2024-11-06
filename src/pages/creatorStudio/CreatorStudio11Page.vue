<template>
    <q-page v-if="!isLoading">
        <CreatorStudio11PageHeader
            :headerTitle="chapterDetail.comicTitle"
            :comicId="chapterDetail.comicId"
            :uploadOrder="chapterDetail.uploadOrder"
            :isDrafted="chapterDetail.isDrafted()"
        />
        <form @submit.prevent class="q-pa-lg">
            <section id="general-info" class="row justify-center q-gutter-lg">
                <section class="col-auto">
                    <ThumbnailInput
                        v-model="chapterDetail.thumbnailImageFile"
                        :presetImageSrc="chapterDetail.thumbnailUrl"
                        @hasChange="detectInputChange"
                        ref="thumbnailInput"
                    />
                </section>
                <div class="col-sm-6 col-md-8 col-grow">
                    <section
                        class="q-pa-lg shadow-1 border-radius-md input-section"
                    >
                        <HeaderHighlight
                            label="Thông tin chung"
                            class="q-mb-md"
                            :badgeLabel="
                                hasChangesInData ? 'Có thay đổi' : null
                            "
                        />

                        <DisableDisplayInput
                            label="Thứ tự tập"
                            tooltipMessage="Thứ tự hiện tại của tập truyện"
                            :displayContent="`${chapterDetail.uploadOrder}`"
                            class="q-mb-sm"
                        />

                        <DisableDisplayInput
                            v-if="chapterDetail.isPublished()"
                            label="Thời điểm xuất bản"
                            tooltipMessage="Thời gian tập truyện được chỉ định xuất bản"
                            :displayContent="chapterDetail.publishedAt"
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
                            @hasChange="detectInputChange"
                        />

                        <PublicLevelInput
                            v-model="chapterDetail.publicLevel"
                            label="Giới hạn số người có thể truy cập vào mục này."
                            class="q-mb-sm"
                            @hasChange="detectInputChange"
                        />

                        <AllowCommentInput
                            v-model="chapterDetail.allowComment"
                            label="Mở phần bình luận"
                            class="q-mb-lg"
                            @hasChange="detectInputChange"
                        />

                        <EditChapterImageListInput
                            class="q-mb-sm"
                            :disableMode="isUpdating"
                            v-model="chapterDetail.chapterMedias"
                            @verifyInput="addVerifyInputCallback"
                            @hasChange="detectInputChange"
                        />

                        <ChapterPublishOptionsInput
                            v-if="!chapterDetail.isPublished()"
                            v-model="chapterDetail.scheduleOption"
                            @hasChange="detectInputChange"
                        />
                    </section>

                    <div
                        class="flex column q-pa-md shadow-1 input-section q-mt-lg border-radius-md"
                    >
                        <ConfirmPolicyInput
                            class="q-mb-md"
                            v-model="chapterDetail.confirmPolicy"
                        />
                        <div class="row q-gutter-sm">
                            <q-btn
                                v-if="chapterDetail.isPublished()"
                                class="q-mt-xs bg-primary text-dark text-weight-bold col-grow"
                                label="Lưu thay đổi"
                                :loading="isUpdating"
                                :disable="isUpdating"
                                @click="
                                    updateChapterDetail('UPDATE_CONTENT_ONLY')
                                "
                            />
                            <q-btn
                                v-else
                                class="q-mt-xs bg-primary text-dark text-weight-bold col-grow"
                                label="Xuất bản"
                                :loading="isUpdating"
                                :disable="isUpdating"
                                @click="updateChapterDetail('PUBLISHED')"
                            />
                            <q-btn
                                v-if="chapterDetail.isDrafted()"
                                :loading="isUpdating"
                                :disable="!hasChangesInData"
                                @click="updateChapterDetail"
                                class="q-mt-xs bg-dark text-light text-weight-bold col-grow"
                            >
                                <q-icon name="description" size="sm" />
                                <span class="q-ml-xs">Cập nhật bản nháp</span>
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
import { NumberHelper } from "src/helpers/NumberHelper";
import { NotificationHelper } from "src/helpers/NotificationHelper";
import {
    ChapterUpdateModes,
    CreatorStudio11ApiHandler,
} from "src/api.handlers/creatorStudio/creatorStudio11Page/CreatorStudio11ApiHandler";
import { UpdateComicChapterDetail } from "src/api.models/creatorStudio/creatorStudio11Page/UpdateComicChapterDetail";

// Import components section.
import CreatorStudio11PageHeader from "src/components/pages/creatorStudio/creatorStudio11Page/CreatorStudio11PageHeader.vue";
import HeaderHighlight from "components/common/creatorStudio/HeaderHighlight.vue";
import DisableDisplayInput from "src/components/common/creatorStudio/DisableDisplayInput.vue";
import TitleInput from "components/common/creatorStudio/ArtworkTitleInput.vue";
import IntroductionInput from "components/common/creatorStudio/ArtworkIntroductionInput.vue";
import ThumbnailInput from "components/common/creatorStudio/ChapterThumbnailInput.vue";
import AllowCommentInput from "components/common/creatorStudio/ArtworkAllowCommentInput.vue";
import PublicLevelInput from "components/common/creatorStudio/ArtworkPublicLevelInput.vue";
import EditChapterImageListInput from "components/pages/creatorStudio/creatorStudio11Page/EditChapterImageListInput.vue";
import ChapterPublishOptionsInput from "src/components/common/creatorStudio/ChapterPublishOptionsInput.vue";
import ConfirmPolicyInput from "components/common/creatorStudio/ArtworkConfirmPolicyInput.vue";

export default {
    components: {
        CreatorStudio11PageHeader,
        HeaderHighlight,
        DisableDisplayInput,
        TitleInput,
        IntroductionInput,
        ThumbnailInput,
        AllowCommentInput,
        PublicLevelInput,
        EditChapterImageListInput,
        ChapterPublishOptionsInput,
        ConfirmPolicyInput,
    },
    data() {
        return {
            isLoading: true,
            isUpdating: false,
            hasChangesInData: false,
            titleInput: null,
            chapterImageListInput: null,
            /**
             * @type {UpdateComicChapterDetail} The type of this property.
             */
            chapterDetail: new UpdateComicChapterDetail(),
            verifyInputCallbacks: [],
            chapterDetailChangeDetect: {
                titleChange: false,
                introductionChange: false,
                thumbnailChange: false,
                publicLevelChange: false,
                allowCommentChange: false,
                chapterImagesChange: false,
            },
        };
    },
    provide() {
        return {
            hasChangesInData: computed(() => this.hasChangesInData),
        };
    },
    beforeMount() {
        const chapterId = this.$route.params.chapterId;

        // Check if the comic id is valid or not.
        const MINIMUM_ID_LENGTH = 10;
        if (
            !NumberHelper.isNumber(chapterId) ||
            chapterId.length < MINIMUM_ID_LENGTH
        ) {
            this.invalidComicId = true;
            NotificationHelper.notifyError("ID không hợp lệ");

            this.redirectToArtworkManagementPage();
            return;
        }

        this.chapterDetail.id = chapterId;
    },
    async mounted() {
        const apiResponse =
            await CreatorStudio11ApiHandler.getChapterDetailByIdAsync(
                this.chapterDetail.id
            );

        if (!apiResponse.isSuccess) {
            NotificationHelper.notifyError(apiResponse.errorMessage);

            this.redirectToArtworkManagementPage();
            return;
        }

        // Populate the information from the api response body.
        this.chapterDetail.populate(apiResponse);

        // Turn off the isLoading flag.
        this.isLoading = false;
    },
    methods: {
        redirectToArtworkManagementPage() {
            const managementRoute = "/studio/artworks";

            this.$router.push(managementRoute);
        },
        /**
         * Detect if any change in input to trigger the hasChangesInData flag.
         */
        detectInputChange(inputName, hasChange) {
            // Detect changes in all 6 inputs of the chapter details.
            switch (inputName) {
                case "title":
                    this.chapterDetailChangeDetect.titleChange = hasChange;
                    break;

                case "introduction":
                    this.chapterDetailChangeDetect.introductionChange =
                        hasChange;
                    break;

                case "chapterThumbnail":
                    this.chapterDetailChangeDetect.thumbnailChange = hasChange;
                    break;

                case "publicLevel":
                    this.chapterDetailChangeDetect.publicLevelChange =
                        hasChange;
                    break;

                case "allowComment":
                    this.chapterDetailChangeDetect.allowCommentChange =
                        hasChange;
                    break;

                case "chapterImages":
                    this.chapterDetailChangeDetect.chapterImagesChange =
                        hasChange;
                    break;
            }

            // Update hasChangesInData state if changes are detected.
            this.hasChangesInData =
                this.chapterDetailChangeDetect.titleChange ||
                this.chapterDetailChangeDetect.introductionChange ||
                this.chapterDetailChangeDetect.thumbnailChange ||
                this.chapterDetailChangeDetect.publicLevelChange ||
                this.chapterDetailChangeDetect.allowCommentChange ||
                this.chapterDetailChangeDetect.chapterImagesChange;
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
        async updateChapterDetail(updateMode) {
            let selectUpdateMode = ChapterUpdateModes.UPDATE_CONTENT_ONLY;
            let isDrafted = false;

            // If the update mode as published, then check
            // if any schedule time is set or not to get the final update mode.
            if (updateMode == ChapterUpdateModes.PUBLISHED.name) {
                const isPublishedWithSchedule =
                    this.chapterDetail.scheduleOption.isScheduled;

                if (isPublishedWithSchedule) {
                    selectUpdateMode = ChapterUpdateModes.SCHEDULED;
                } else {
                    selectUpdateMode = ChapterUpdateModes.PUBLISHED;
                }
            }

            const isValidInput = this.verifyInput();

            if (!isValidInput) {
                NotificationHelper.notifyError("Bạn điền thiếu thông tin");

                return;
            }

            // Turn on is updating flag.
            this.isUpdating = true;

            const result =
                await CreatorStudio11ApiHandler.updateComicChapterAsync(
                    this.chapterDetail,
                    selectUpdateMode.value
                );

            if (result.isSuccess) {
                const message = isDrafted
                    ? "Bản nháp được lưu"
                    : "Cập nhật thành công";

                this.hasChangesInData = false;
                NotificationHelper.notifySuccess(message);

                // Redirect back to the comic detail page.
                this.$router.push(
                    `/studio/comic/detail/${this.chapterDetail.comicId}`
                );
            } else {
                NotificationHelper.notifyError(result.message);
            }

            // Turn off is updating flag.
            this.isUpdating = false;
        },
    },
};
</script>
