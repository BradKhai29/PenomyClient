<template>
    <q-page v-if="!isLoading" class="position-relative bg-dark-900">
        <TheChapterHeaderBar
            :comicId="comicId"
            :comicTitle="chapterDetail.comicTitle"
            :chapterId="chapterId"
            :chapterTitle="chapterDetail.title"
            :chapterOrder="chapterDetail.uploadOrder"
        />

        <section id="chapter-images" class="flex column items-center">
            <img
                :id="`anh_${imageItem.uploadOrder + 1}`"
                v-for="imageItem in chapterDetail.images"
                :key="imageItem"
                :src="imageItem.storageUrl"
                class="preview-image-item"
                :alt="`anh_${imageItem.uploadOrder + 1}`"
            />
        </section>

        <ChapterButtonGroup :totalFavorites="1000" />

        <ComicChapterNavigation
            :comicId="comicId"
            :comicTitle="chapterDetail.comicTitle"
            :chapterId="chapterId"
            :chapterTitle="chapterDetail.title"
        />
    </q-page>
</template>

<script>
// Import dependencies section.
import { NumberHelper } from "src/helpers/NumberHelper";
import { Artwork5ApiHandler } from "src/api.handlers/artwork/artwork5Page/Artwork5ApiHandler";
import { ComicChapterDetailResponseDto } from "src/api.models/artwork/artwork5Page/ComicChapterDetailResponseDto";
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { ViewHistoryApiHandler } from "src/api.handlers/artwork/common/ViewHistoryApiHandler";
import { useGuestStore } from "src/stores/common/GuestStore";
import { useAuthStore } from "src/stores/common/AuthStore";

// Import component section.
import TheChapterHeaderBar from "src/components/pages/artwork/artwork5Page/TheChapterHeaderBar.vue";
import ChapterButtonGroup from "src/components/pages/artwork/artwork5Page/ChapterButtonGroup.vue";
import ComicChapterNavigation from "src/components/pages/artwork/artwork5Page/ComicChapterNavigation.vue";

// Init store for later operation.
const guestStore = useGuestStore();
const authStore = useAuthStore();

export default {
    name: "Artwork5Page",
    components: {
        TheChapterHeaderBar,
        ChapterButtonGroup,
        ComicChapterNavigation,
    },
    data() {
        return {
            /**
             * Id of the comic contains this chapter.
             * @type {String}
             */
            comicId: null,
            /**
             * Id of the current chapter.
             * @type {String}
             */
            chapterId: null,
            /**
             * This flag is used to pre-validate
             * if the input id is valid or not
             */
            isValidId: false,
            isLoading: true,
            /**
             * @type {ComicChapterDetailResponseDto} The type of this property.
             */
            chapterDetail: null,
        };
    },
    beforeMount() {
        // Get the comicId and chapterId from route.
        this.comicId = this.$route.params.comicId;
        this.chapterId = this.$route.params.chapterId;

        this.isValidId =
            NumberHelper.isNumber(this.comicId) &&
            NumberHelper.isNumber(this.chapterId);

        if (!this.isValidId) {
            // Redirect back to homepage when find invalid id.
            this.$router.push("/");

            return;
        }
    },
    async mounted() {
        if (!this.isValidId) {
            return;
        }

        // Asynchronously save the view history.
        this.saveViewHistory();

        const result = await Artwork5ApiHandler.getChapterDetailByIdAsync(
            this.comicId,
            this.chapterId
        );

        this.isLoading = false;

        if (!result.isFound) {
            NotificationHelper.notifyError(result.errorMessage);

            // Redirect back to homepage when not found.
            this.$router.push("/");
        } else {
            this.chapterDetail = result;
        }
    },
    methods: {
        async saveViewHistory() {
            const isAuth = await authStore.isAuthAsync();

            if (isAuth) {
                ViewHistoryApiHandler.addViewHistoryAsync(
                    this.comicId,
                    this.chapterId,
                    guestStore.currentGuestId
                );
            } else {
                guestStore.waitForSetUp().then(() => {
                    ViewHistoryApiHandler.addViewHistoryAsync(
                        this.comicId,
                        this.chapterId,
                        guestStore.currentGuestId
                    );
                });
            }
        },
    },
};
</script>

<style scoped>
.preview-image-item {
    --ratio: 0.778;
    --max-width: 800px;

    width: 100% !important;
    max-width: var(--max-width) !important;
    height: 100% !important;
}
</style>
