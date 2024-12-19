<template>
    <q-page v-if="!isLoading && !isNotFound">
        <CreatorStudio14PageHeader
            :headerTitle="artworkDetail.titleRef"
            :animeId="artworkDetail.id"
        />
        <form @submit.prevent class="q-pa-lg">
            <section class="flex justify-center q-mb-md">
                <div
                    v-if="showAlert"
                    class="q-pa-md shadow-1 border-sm-dark-500 border-radius-sm flex justify-between"
                    style="max-width: 1240px; width: 100%"
                >
                    <div class="flex items-center">
                        <q-icon
                            size="28px"
                            name="videocam"
                            class="text-primary"
                        />
                        <span class="text-subtitle1 q-ml-xs">
                            Cập nhật lần cuối: {{ updatedAt }}
                        </span>
                    </div>

                    <q-btn
                        @click="showAlert = false"
                        dense
                        no-caps
                        class="bg-dark text-light q-px-sm text-subtitle1"
                    >
                        Đóng
                    </q-btn>
                </div>
            </section>

            <section id="general-info" class="row justify-center q-gutter-lg">
                <section class="col-auto">
                    <ThumbnailInput
                        v-model="artworkDetail.thumbnailImageFile"
                        :presetImageSrc="artworkDetail.thumbnailUrl"
                        @verifyInput="addVerifyInputCallback"
                        @hasChange="detectInputChange"
                    />
                </section>
                <div class="col-sm-6 col-md-8 col-grow">
                    <section class="q-pa-lg shadow-1 input-section">
                        <HeaderHighlight
                            label="Thông tin chung"
                            :badgeLabel="
                                hasChangesInData ? 'Có thay đổi' : null
                            "
                            class="q-mb-md"
                        />

                        <TitleInput
                            v-model="artworkDetail.title"
                            v-bind="titleInputBind"
                            class="q-mb-sm"
                            @verifyInput="addVerifyInputCallback"
                            @hasChange="detectInputChange"
                        />

                        <OriginInput
                            v-model="artworkDetail.originId"
                            :artworkOriginId="artworkDetail.originId"
                            class="q-mb-sm"
                            @verifyInput="addVerifyInputCallback"
                            @hasChange="detectInputChange"
                        />

                        <IntroductionInput
                            v-model="artworkDetail.introduction"
                            v-bind="introductionInputBind"
                            class="q-mb-sm"
                            @verifyInput="addVerifyInputCallback"
                            @hasChange="detectInputChange"
                        />

                        <CategoriesInput
                            v-model="artworkDetail.selectedCategories"
                            class="q-mb-sm"
                            @verifyInput="addVerifyInputCallback"
                            @hasChange="detectInputChange"
                        />

                        <PublicLevelInput
                            v-model="artworkDetail.publicLevel"
                            :artworkPublicLevel="artworkDetail.publicLevel"
                            class="q-mb-sm"
                            @hasChange="detectInputChange"
                        />

                        <AllowCommentInput
                            v-model="artworkDetail.allowComment"
                            :oldAllowComment="artworkDetail.allowComment"
                            @hasChange="detectInputChange"
                        />
                    </section>

                    <div
                        class="flex column q-pa-md shadow-1 input-section q-mt-lg"
                    >
                        <ConfirmPolicyInput
                            class="q-mb-sm"
                            v-model="artworkDetail.confirmPolicy"
                        />
                        <q-btn
                            v-if="hasChangesInData"
                            :loading="isDetailUpdating"
                            class="q-mt-xs bg-primary text-dark text-weight-bold"
                            label="Cập nhật thông tin"
                            @click="updateComicDetail"
                        />
                        <q-btn
                            v-else
                            disable
                            class="q-mt-xs bg-primary text-dark text-weight-bold"
                            label="Cập nhật thông tin"
                        />
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
import { EditAnimeDetailApiHandler } from "src/api.handlers/creatorStudio/creatorStudio14Page/EditAnimeDetailApiHandler";

// Import components section.
import CreatorStudio14PageHeader from "components/pages/creatorStudio/CreatorStudio14Page.EditAnime/CreatorStudio14PageHeader.vue";
import HeaderHighlight from "components/common/creatorStudio/HeaderHighlight.vue";
import TitleInput from "components/common/creatorStudio/ArtworkTitleInput.vue";
import IntroductionInput from "components/common/creatorStudio/ArtworkIntroductionInput.vue";
import OriginInput from "components/common/creatorStudio/ArtworkOriginInput.vue";
import AllowCommentInput from "components/common/creatorStudio/ArtworkAllowCommentInput.vue";
import PublicLevelInput from "components/common/creatorStudio/ArtworkPublicLevelInput.vue";
import ThumbnailInput from "components/common/creatorStudio/ArtworkThumbnailInput.vue";
import ConfirmPolicyInput from "components/common/creatorStudio/ArtworkConfirmPolicyInput.vue";
import CategoriesInput from "components/common/creatorStudio/ArtworkCategoriesInput.vue";
import { CategoryItem } from "src/api.models/creatorStudio/common/CategoryItem";
import { DateTimeHelper } from "src/helpers/DateTimeHelper";

export default {
    components: {
        CreatorStudio14PageHeader,
        HeaderHighlight,
        TitleInput,
        IntroductionInput,
        OriginInput,
        AllowCommentInput,
        PublicLevelInput,
        ThumbnailInput,
        ConfirmPolicyInput,
        CategoriesInput,
    },
    data() {
        return {
            showAlert: true,
            isLoading: true,
            isNotFound: false,
            /**
             * This flag used to check if creator inputs any
             * data to update a comic, support for navigation guard
             * when creator accidentally exits the page while inputting information
             */
            hasChangesInData: false,
            isDetailUpdating: false,
            artworkDetail: {
                id: 0,
                title: "",
                titleRef: "",
                /**
                 * @type {Number} The originId of this artwork.
                 */
                originId: 0,
                introduction: "",
                /**
                 * @type {CategoryItem[]} Type of this array.
                 */
                selectedCategories: [],
                publicLevel: 0,
                allowComment: false,
                confirmPolicy: false,
                thumbnailImageFile: null,
                thumbnailUrl: null,
                updatedAt: null,
            },
            artworkDetailChangeDetect: {
                titleChange: false,
                introductionChange: false,
                thumbnailChange: false,
                originIdChange: false,
                categoryChange: false,
                publicLevelChange: false,
                allowCommentChange: false,
            },
            titleInputBind: titleInputBind,
            introductionInputBind: introductionInputBind,
            verifyInputCallbacks: [],
        };
    },
    computed: {
        updatedAt() {
            const updateAtDateTime = new Date(this.artworkDetail.updatedAt);

            return DateTimeHelper.formatLocaleDateTimeString(
                updateAtDateTime,
                DateTimeHelper.DD_MM_YYYY_HH_MM_FORMAT
            );
        },
    },
    provide() {
        return {
            hasChangesInData: computed(() => this.hasChangesInData),
        };
    },
    beforeMount() {
        const artworkManagementRoute = "/studio/artworks";
        const artworkId = this.$route.params.artworkId;

        if (!NumberHelper.isNumber(artworkId)) {
            this.$router.push(artworkManagementRoute);

            NotificationHelper.notifyError("Mã truyện không hợp lệ");
        }
    },
    async mounted() {
        const artworkId = this.$route.params.artworkId;

        // If artworkId is null, then display not found.
        if (!artworkId) {
            this.isNotFound = true;
            this.isLoading = false;

            return;
        }

        // Get artwork detail from api.
        const _artworkDetail =
            await EditAnimeDetailApiHandler.getArtworkDetailByIdAsync(
                artworkId
            );

        if (_artworkDetail.isNotFound) {
            this.isNotFound = true;
            this.isLoading = false;

            this.$router.push("/studio/artworks");

            NotificationHelper.notifyError("Không tìm thấy nội dung");

            return;
        }

        // If call WebAPI success, then populate the artwork detail information.
        this.artworkDetail.id = _artworkDetail.id;
        this.artworkDetail.title = _artworkDetail.title;
        this.artworkDetail.titleRef = _artworkDetail.title;
        this.artworkDetail.originId = _artworkDetail.originId;
        this.artworkDetail.introduction = _artworkDetail.introduction;
        this.artworkDetail.publicLevel = _artworkDetail.publicLevel;
        this.artworkDetail.allowComment = _artworkDetail.allowComment;
        this.artworkDetail.thumbnailUrl = _artworkDetail.thumbnailUrl;
        this.artworkDetail.updatedAt = _artworkDetail.updatedAt;

        _artworkDetail.selectedCategories.forEach((item) =>
            this.artworkDetail.selectedCategories.push(item)
        );

        // Turn off the loading flag to load the page.
        this.isLoading = false;
    },
    methods: {
        /**
         * @param {String} inputName The name of the input that has changed or input data.
         */
        detectInputChange(inputName, hasChange) {
            // Detect changes in all 7 inputs of the comic details.
            switch (inputName) {
                case "title":
                    // console.log("title");

                    this.artworkDetailChangeDetect.titleChange = hasChange;
                    break;

                case "introduction":
                    // console.log("introduction");

                    this.artworkDetailChangeDetect.introductionChange =
                        hasChange;
                    break;

                case "origin":
                    // console.log("origin");

                    this.artworkDetailChangeDetect.originIdChange = hasChange;
                    break;

                case "category":
                    // console.log("category");

                    this.artworkDetailChangeDetect.categoryChange = hasChange;
                    break;

                case "thumbnail":
                    // console.log("thumbn");

                    this.artworkDetailChangeDetect.thumbnailChange = hasChange;
                    break;

                case "publicLevel":
                    // console.log("public level");

                    this.artworkDetailChangeDetect.publicLevelChange =
                        hasChange;
                    break;

                case "allowComment":
                    // console.log("allow-comm");

                    this.artworkDetailChangeDetect.allowCommentChange =
                        hasChange;
                    break;
            }

            // Update hasChangesInData state if changes are detected.
            this.hasChangesInData =
                this.artworkDetailChangeDetect.titleChange ||
                this.artworkDetailChangeDetect.introductionChange ||
                this.artworkDetailChangeDetect.originIdChange ||
                this.artworkDetailChangeDetect.thumbnailChange ||
                this.artworkDetailChangeDetect.categoryChange ||
                this.artworkDetailChangeDetect.publicLevelChange ||
                this.artworkDetailChangeDetect.allowCommentChange;
        },
        async updateComicDetail() {
            const isValid = this.verifyAllInputs();

            if (!isValid) {
                NotificationHelper.notifyError(
                    "Bạn chưa điền đầy đủ thông tin"
                );

                return;
            }

            if (!this.artworkDetail.confirmPolicy) {
                NotificationHelper.notifyError(
                    "Bạn chưa xác nhận quy tắc nội dung"
                );

                return;
            }

            // Turn on the isDetailUpdating flag to prevent user from clicking
            // the button while the api is processing the data.
            this.isDetailUpdating = true;

            const result =
                await EditAnimeDetailApiHandler.updateArtworkDetailAsync(
                    this.artworkDetail,
                    this.artworkDetailChangeDetect.categoryChange
                );

            if (result.isSuccess) {
                NotificationHelper.notifySuccess(
                    "Cập nhật thông tin thành công"
                );

                // Update the flag when the changes are updated successfully.
                this.hasChangesInData = false;
                this.isDetailUpdating = false;
            } else {
                NotificationHelper.notifyError(
                    result.message ?? "Có lỗi từ server khi cập nhật"
                );
            }
        },
        addVerifyInputCallback(callback) {
            this.verifyInputCallbacks.push(callback);
        },
        verifyAllInputs() {
            let isValid = true;

            for (let i = 0; i < this.verifyInputCallbacks.length; i++) {
                const callback = this.verifyInputCallbacks[i];

                if (callback) {
                    isValid &= callback.verifyInput();
                }
            }

            return isValid;
        },
    },
};

// Define all input-bind objects to display custom inputs.
const titleInputBind = {
    required: true,
    label: "Tiêu đề",
    maxLength: 100,
    footerCaption:
        "Đặt tiêu đề liên quan đến nội dung tác phẩm của bạn để người đọc dễ tìm, tối đa 100 ký tự",
    errorMessage: "Không để trống",
};

const introductionInputBind = {
    required: true,
    label: "Phần giới thiệu",
    maxLength: 1000,
    footerCaption:
        "Phần giới thiệu hay về nội dung có thể khiến người đọc quan tâm hơn đến tác phẩm, tối đa 1000 ký tự",
    errorMessage: "Không để trống",
};
</script>

<style scoped>
.input-section {
    --light-100: #f9fafc;

    border-radius: 4px;
    background-color: var(--light-100);
}
</style>
