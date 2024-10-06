<template>
    <q-page>
        <PageHeader />
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
                            class="q-mt-xs bg-primary text-dark text-weight-bold"
                            label="Xác nhận tạo"
                            @click="createNewComic"
                        />
                    </div>
                </div>
            </section>
        </form>
    </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { ArtworkApiHandler } from "src/api.handlers/creatorStudio/creatorStudio6Page/ArtworkApiHandler";

import PageHeader from "components/pages/creatorStudio/CreatorStudio6Page/CreatorStudio6PageHeader.vue";
import HeaderHighlight from "components/common/creatorStudio/HeaderHighlight.vue";
import TitleInput from "components/common/creatorStudio/ArtworkTitleInput.vue";
import IntroductionInput from "components/common/creatorStudio/ArtworkIntroductionInput.vue";
import OriginInput from "components/common/creatorStudio/ArtworkOriginInput.vue";
import AllowCommentInput from "components/common/creatorStudio/ArtworkAllowCommentInput.vue";
import PublicLevelInput from "components/common/creatorStudio/ArtworkPublicLevelInput.vue";
import ThumbnailInput from "components/common/creatorStudio/ArtworkThumbnailInput.vue";
import ConfirmPolicyInput from "components/common/creatorStudio/ArtworkConfirmPolicyInput.vue";
import CategoriesInput from "components/common/creatorStudio/ArtworkCategoriesInput.vue";

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
        PageHeader,
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
            titleInputBind: titleInputBind,
            introductionInputBind: introductionInputBind,
            titleInput: null,
            introductionInput: null,
            originInput: null,
            categoriesInput: null,
            thumbnailInput: null,
        };
    },
    methods: {
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

            await ArtworkApiHandler.createArtworkAsync(this.artworkDetail);
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
