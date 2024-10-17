<template>
    <q-page>
        <CreatorStudio9PageHeader />
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

                        <TitleInput
                            v-model="chapterDetail.title"
                            :maxLength="100"
                            class="q-mb-sm"
                            ref="titleInput"
                        />

                        <IntroductionInput
                            v-model="chapterDetail.introduction"
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

                        <ChapterImageListInput />
                    </section>

                    <div
                        class="flex column q-pa-md shadow-1 input-section q-mt-lg"
                    >
                        <ConfirmPolicyInput
                            class="q-mb-sm"
                            v-model="chapterDetail.confirmPolicy"
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

<script setup>
// Import dependencies section.
import { useQuasar } from "quasar";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { NumberHelper } from "src/helpers/NumberHelper";

// Import components section.
import CreatorStudio9PageHeader from "components/pages/creatorStudio/creatorStudio9Page/CreatorStudio9PageHeader.vue";
import HeaderHighlight from "components/common/creatorStudio/HeaderHighlight.vue";
import TitleInput from "components/common/creatorStudio/ArtworkTitleInput.vue";
import IntroductionInput from "components/common/creatorStudio/ArtworkIntroductionInput.vue";
import ThumbnailInput from "components/common/creatorStudio/ChapterThumbnailInput.vue";
import AllowCommentInput from "components/common/creatorStudio/ArtworkAllowCommentInput.vue";
import PublicLevelInput from "components/common/creatorStudio/ArtworkPublicLevelInput.vue";
import ChapterImageListInput from "components/common/creatorStudio/ChapterImageListInput.vue";
import ConfirmPolicyInput from "components/common/creatorStudio/ArtworkConfirmPolicyInput.vue";

// Routing section.
const router = useRouter();
const route = useRoute();
const artworkManagementRoute = "/studio/artworks";

// Data refs section.
const chapterDetail = ref({
    title: "",
    introduction: "",
    publicLevel: null,
    allowComment: false,
    confirmPolicy: false,
});

// CHeck the query params before mount this page.
// If the query param (id) is not specified then redirect back to manager page.
onBeforeMount(() => {
    const comicId = route.query.id;

    // Prevent user to access this page when no query param specified.
    // Or the input query param is not a number.
    if (!NumberHelper.isNumber(comicId)) {
        router.push(artworkManagementRoute);
    }
});
</script>
