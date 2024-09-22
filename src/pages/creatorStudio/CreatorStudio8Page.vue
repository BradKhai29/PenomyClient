<template>
    <q-page v-if="isLoading"></q-page>
    <q-page v-else>
        <PageHeader headerTitle="Tác phẩm đầu tiên" />
        <form @submit.prevent class="q-pa-lg">
            <section id="general-info" class="row justify-center q-gutter-lg">
                <section class="col-auto">
                    <ThumbnailInput
                        v-model="artworkDetail.thumbnailImageFile"
                        :defaultImageSrc="artworkDetail.thumbnailUrl"
                        @verifyInput="addVerifyInputCallback"
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
                            @verifyInput="addVerifyInputCallback"
                            class="q-mb-sm"
                        />

                        <OriginInput
                            v-model="artworkDetail.originId"
                            :artworkOriginId="artworkDetail.originId"
                            @verifyInput="addVerifyInputCallback"
                            class="q-mb-sm"
                        />

                        <IntroductionInput
                            v-model="artworkDetail.introduction"
                            v-bind="introductionInputBind"
                            @verifyInput="addVerifyInputCallback"
                            class="q-mb-sm"
                        />

                        <CategoriesInput
                            v-model="artworkDetail.selectedCategories"
                            @verifyInput="addVerifyInputCallback"
                            class="q-mb-sm"
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
                            @click="updateComicDetail"
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

import PageHeader from "components/pages/creatorStudio/CreatorStudio8Page/CreatorStudio8PageHeader.vue";
import HeaderHighlight from "components/common/creatorStudio/HeaderHighlight.vue";
import TitleInput from "components/common/creatorStudio/ArtworkTitleInput.vue";
import IntroductionInput from "components/common/creatorStudio/ArtworkIntroductionInput.vue";
import OriginInput from "components/common/creatorStudio/ArtworkOriginInput.vue";
import AllowCommentInput from "components/common/creatorStudio/ArtworkAllowCommentInput.vue";
import PublicLevelInput from "components/common/creatorStudio/ArtworkPublicLevelInput.vue";
import ThumbnailInput from "components/common/creatorStudio/ArtworkThumbnailInput.vue";
import ConfirmPolicyInput from "components/common/creatorStudio/ArtworkConfirmPolicyInput.vue";
import CategoriesInput from "components/common/creatorStudio/ArtworkCategoriesInput.vue";
import { CategoryItem } from "src/api.models/creatorStudio/creatorStudio6Page/CategoryItem";

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
    async mounted() {
        const _artworkDetail =
            await ArtworkApiHandler.getArtworkDetailByIdAsync(1);

        // If call WebAPI success, then populate the information
        // data:artworkDetail in this page.
        if (_artworkDetail) {
            this.artworkDetail.id = _artworkDetail.id;
            this.artworkDetail.title = _artworkDetail.title;
            this.artworkDetail.originId = _artworkDetail.origin.id;
            this.artworkDetail.introduction = _artworkDetail.introduction;
            this.artworkDetail.publicLevel = _artworkDetail.publicLevel;
            this.artworkDetail.allowComment = _artworkDetail.allowComment;
            this.artworkDetail.thumbnailUrl = _artworkDetail.thumbnailUrl;
            _artworkDetail.selectedCategories.forEach((item) =>
                this.artworkDetail.selectedCategories.push(item)
            );
        }

        // Turn off the loading flag to load the page.
        this.isLoading = false;
    },
    data() {
        return {
            isLoading: true,
            artworkDetail: {
                id: 0,
                title: "",
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
            },
            titleInputBind: titleInputBind,
            introductionInputBind: introductionInputBind,
            verifyInputCallbacks: [],
        };
    },
    methods: {
        async updateComicDetail() {
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

            await ArtworkApiHandler.updateArtworkDetailAsync(
                this.artworkDetail
            );
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
