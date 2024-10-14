<template>
    <q-page>
        <CreatorStudio6PageHeader />
        <form @submit.prevent class="q-pa-lg">
            <section id="general-info" class="row justify-center q-gutter-lg">
                <section class="col-auto">
                    <ThumbnailInput
                        v-model="artworkDetail.thumbnailImageFile"
                        ref="thumbnailInput"
                    />
                </section>
                <div class="col-sm-6 col-md-8 col-grow">
                    <section class="q-pa-lg shadow-1 input-section">
                        <HeaderHighlight
                            label="Thông tin chung"
                            class="q-mb-md"
                        />

                        <TitleInput
                            v-model="artworkDetail.title"
                            v-bind="titleInputBind"
                            class="q-mb-sm"
                            @hasChange="detectInputChange"
                            ref="titleInput"
                        />

                        <OriginInput
                            v-model="artworkDetail.originId"
                            class="q-mb-sm"
                            ref="originInput"
                        />

                        <IntroductionInput
                            v-model="artworkDetail.introduction"
                            v-bind="introductionInputBind"
                            class="q-mb-sm"
                            ref="introductionInput"
                            @hasChange="detectInputChange"
                        />

                        <CategoriesInput
                            v-model="artworkDetail.selectedCategories"
                            class="q-mb-sm"
                            ref="categoriesInput"
                        />

                        <PublicLevelInput
                            v-model="artworkDetail.publicLevel"
                            class="q-mb-sm"
                        />

                        <AllowCommentInput
                            v-model="artworkDetail.allowComment"
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
                            v-if="hasInputData"
                            class="q-mt-xs bg-primary text-dark text-weight-bold"
                            label="Xác nhận tạo"
                            :loading="isCreating"
                            @click="createNewComic"
                        />
                        <q-btn
                            v-else
                            disable
                            class="q-mt-xs bg-primary text-dark text-weight-bold"
                            label="Xác nhận tạo"
                        />
                    </div>
                </div>
            </section>
        </form>
    </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { CreatorStudio6ApiHandler } from "src/api.handlers/creatorStudio/creatorStudio6Page/CreatorStudio6ApiHandler";

import CreatorStudio6PageHeader from "components/pages/creatorStudio/CreatorStudio6Page/CreatorStudio6PageHeader.vue";
import HeaderHighlight from "components/common/creatorStudio/HeaderHighlight.vue";
import TitleInput from "components/common/creatorStudio/ArtworkTitleInput.vue";
import IntroductionInput from "components/common/creatorStudio/ArtworkIntroductionInput.vue";
import OriginInput from "components/common/creatorStudio/ArtworkOriginInput.vue";
import AllowCommentInput from "components/common/creatorStudio/ArtworkAllowCommentInput.vue";
import PublicLevelInput from "components/common/creatorStudio/ArtworkPublicLevelInput.vue";
import ThumbnailInput from "components/common/creatorStudio/ArtworkThumbnailInput.vue";
import ConfirmPolicyInput from "components/common/creatorStudio/ArtworkConfirmPolicyInput.vue";
import CategoriesInput from "components/common/creatorStudio/ArtworkCategoriesInput.vue";
import { computed } from "vue";

const errorNotification = {
    position: "top",
    color: "negative",
    textColor: "light",
    message: "Bạn chưa điền đầy đủ thông tin",
    icon: "warning",
    showTimeoutProgress: true,
};

export default {
    components: {
        CreatorStudio6PageHeader,
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
    mounted() {
        // Input element references.
        this.titleInput = this.$refs.titleInput;
        this.introductionInput = this.$refs.introductionInput;
        this.originInput = this.$refs.originInput;
        this.categoriesInput = this.$refs.categoriesInput;
        this.thumbnailInput = this.$refs.thumbnailInput;
    },
    data() {
        return {
            /**
             * This flag used to check if creator inputs any
             * data to create a comic, support for navigation guard
             * when creator accidentally exits the page while inputting information
             */
            hasInputData: false,
            isCreating: false,
            artworkDetail: {
                title: "",
                originId: 0,
                introduction: "",
                selectedCategories: [],
                publicLevel: null,
                allowComment: false,
                confirmPolicy: false,
                thumbnailImageFile: null,
            },
            artworkDetailChangeDetect: {
                titleChange: false,
                introductionChange: false,
            },
            titleInputBind: titleInputBind,
            introductionInputBind: introductionInputBind,
            titleInput: null,
            introductionInput: null,
            originInput: null,
            categoriesInput: null,
            thumbnailInput: null,
        };
    },
    provide() {
        return {
            hasInputData: computed(() => this.hasInputData),
        };
    },
    methods: {
        /**
         * @param {String} inputName The name of the input that has changed or input data.
         */
        detectInputChange(inputName, hasChange) {
            // Just need to detect at 2 inputs, no need to detect all.
            // Because if creator inputs into these 2 fields then creator
            // actually wants to create a new comic.
            if (inputName == "title") {
                this.artworkDetailChangeDetect.titleChange = hasChange;
            }

            if (inputName == "introduction") {
                this.artworkDetailChangeDetect.introductionChange = hasChange;
            }

            // Update hasInputData state if changes are detected.
            this.hasInputData =
                this.artworkDetailChangeDetect.titleChange ||
                this.artworkDetailChangeDetect.introductionChange;
        },
        async createNewComic() {
            const isValid = this.verifyAllInputs();

            if (!isValid) {
                this.showErrorNotification();

                return;
            }

            if (!this.artworkDetail.confirmPolicy) {
                this.showErrorNotification(
                    "Bạn chưa xác nhận quy tắc nội dung"
                );

                return;
            }

            // Turn on the isCreating flag to prevent user from clicking
            // the button while the api is processing the data.
            this.isCreating = true;

            // Get the result after creating the artwork.
            const result = await CreatorStudio6ApiHandler.createArtworkAsync(
                this.artworkDetail
            );

            if (result.isSuccess) {
                this.showSuccessNotification("Đã tạo thành công");
            } else {
                this.showErrorNotification(
                    result.message ?? "Có lỗi xảy ra khi tạo"
                );
            }

            // Turn off the isCreating flag after processing the data.
            this.isCreating = false;
        },
        verifyAllInputs() {
            let isValid = true;

            isValid &= this.titleInput.verifyInput();
            isValid &= this.originInput.verifyInput();
            isValid &= this.introductionInput.verifyInput();
            isValid &= this.thumbnailInput.verifyInput();
            isValid &= this.categoriesInput.verifyInput();

            return isValid;
        },
    },
    setup() {
        const quasar = useQuasar();

        const showErrorNotification = (message) => {
            quasar.notify({
                color: errorNotification.color,
                textColor: errorNotification.textColor,
                icon: errorNotification.icon,
                message: message ?? errorNotification.message,
                position: errorNotification.position,
                actions: [
                    {
                        label: "Đóng",
                        color: "yellow",
                    },
                ],
                progress: errorNotification.showTimeoutProgress,
            });
        };

        const showSuccessNotification = (message) => {
            quasar.notify({
                type: "positive",
                textColor: "light",
                icon: "info",
                message: message,
                position: "top",
                actions: [
                    {
                        label: "Đóng",
                        color: "light",
                        handler: () => {
                            /* console.log('wooow') */
                        },
                    },
                ],
                progress: errorNotification.showTimeoutProgress,
            });
        };

        return {
            showErrorNotification,
            showSuccessNotification,
        };
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
