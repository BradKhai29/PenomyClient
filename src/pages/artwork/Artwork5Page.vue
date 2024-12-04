<template>
    <q-page v-if="!isLoading" class="position-relative bg-dark-900">
        <TheChapterHeaderBar
            :comicId="comicId"
            :comicTitle="chapterDetail.comicTitle"
            :chapterId="chapterId"
            :chapterDetail="chapterDetail"
            :chapterList="loadedChapterList"
            :isProcessing="isProcessing"
            @changeChapter="handleChangeChapter"
        />

        <section id="chapter-images" class="flex column items-center">
            <img
                v-for="imageItem in chapterDetail.images"
                :id="`anh_${imageItem.uploadOrder + 1}`"
                :key="imageItem"
                :src="imageItem.storageUrl"
                class="preview-image-item"
                :alt="`anh_${imageItem.uploadOrder + 1}`"
            />
        </section>

        <ChapterButtonGroup :totalFavorites="1000" />

        <section
            id="chapter-navigation-wrapper"
            class="q-py-md row justify-center items-center relative-position"
        >
            <div
                class="chapter-navigation flex items-center text-light text-subtitle1"
            >
                <q-btn
                    no-caps
                    dense
                    padding="none"
                    unelevated
                    flat
                    :to="`/artwork/comic/${comicId}`"
                    class="q-ml-sm comic-title text-subtitle1"
                >
                    {{ chapterDetail.comicTitle }}
                </q-btn>
                <span>
                    <q-icon name="chevron_right" size="sm" />
                </span>
                <span>{{ chapterDetail.title }}</span>
            </div>

            <ChapterListMenu
                class="col-12"
                :comicId="comicId"
                :chapterList="loadedChapterList"
                @goToChapter="handleChangeChapter"
            />

            <div id="comment-section" class="text-light" ref="comment-section">
                Comment section
            </div>
        </section>
    </q-page>
</template>

<script>
// Import dependencies section.
import { NumberHelper } from "src/helpers/NumberHelper";
import { Artwork5ApiHandler } from "src/api.handlers/artwork/artwork5Page/Artwork5ApiHandler";
import { ComicChapterDetailResponseDto } from "src/api.models/artwork/artwork5Page/ComicChapterDetailResponseDto";
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { ViewHistoryApiHandler } from "src/api.handlers/artwork/common/ViewHistoryApiHandler";
import { ItemDictionary } from "src/api.models/common/ItemDictionary";
import { ArtworkChapterResponse } from "src/api.models/artwork/artwork3Page/ArtworkChapterResponse";

// Import component section.
import TheChapterHeaderBar from "src/components/pages/artwork/artwork5Page/TheChapterHeaderBar.vue";
import ChapterButtonGroup from "src/components/pages/artwork/artwork5Page/ChapterButtonGroup.vue";
import ChapterListMenu from "src/components/pages/artwork/artwork5Page/ChapterListMenu.vue";

// Init store for later operation.
import { useAuthStore } from "src/stores/common/AuthStore";
import { useGuestStore } from "src/stores/common/GuestStore";

const authStore = useAuthStore();
const guestStore = useGuestStore();
const chapterDictionary = ItemDictionary.New();

export default {
    name: "Artwork5Page",
    components: {
        TheChapterHeaderBar,
        ChapterButtonGroup,
        ChapterListMenu,
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
            // Loading chapter list section
            /**
             * @type {ArtworkChapterResponse[]} Type of this data:property.
             */
            loadedChapterList: [],
            isProcessing: true,
        };
    },
    beforeMount() {
        this.loadComicAndChapterIdFromRoute();

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

        // Asynchronously load the chapter list.
        this.loadChapterListAsync();

        // Asynchronously save the view history.
        this.saveViewHistoryAsync();

        // Load the detail of current chapter.
        await this.loadChapterDetailAsync();

        // Turn off the flag when loading success.
        this.isLoading = false;
    },
    methods: {
        loadComicAndChapterIdFromRoute() {
            // Get the comicId and chapterId from route.
            this.comicId = this.$route.params.comicId;
            this.chapterId = this.$route.params.chapterId;
        },
        async saveViewHistoryAsync() {
            const isAuth = await authStore.isAuthAsync();

            if (isAuth) {
                ViewHistoryApiHandler.addViewHistoryAsync(
                    this.comicId,
                    this.chapterId,
                    guestStore.currentGuestId
                );
            } else {
                await guestStore.waitForSetUp();

                ViewHistoryApiHandler.addViewHistoryAsync(
                    this.comicId,
                    this.chapterId,
                    guestStore.currentGuestId
                );
            }
        },
        async loadChapterDetailAsync() {
            const result = await Artwork5ApiHandler.getChapterDetailByIdAsync(
                this.comicId,
                this.chapterId
            );

            if (!result.isFound) {
                NotificationHelper.notifyError(result.errorMessage);

                // Redirect back to homepage when not found.
                this.$router.push("/");
            } else {
                this.chapterDetail = result;
            }
        },
        async loadChapterListAsync() {
            const chapterList =
                await Artwork5ApiHandler.getChapterListByComicIdAsync(
                    this.comicId
                );

            // If the return chapter list is null, then comicId is invalid.
            if (!chapterList) {
                return;
            }

            // Set the list of loaded chapter list to display.
            this.loadedChapterList.push(...chapterList);

            this.isProcessing = false;
        },
        async handleChangeChapter(chapterLink) {
            await this.$router.push(chapterLink);

            this.loadComicAndChapterIdFromRoute();

            // Asynchronously save the view history.
            this.saveViewHistoryAsync();

            // Turn on the isProcessing flag to prevent
            // user interacting while calling api.
            this.isProcessing = true;

            const chapterItem = chapterDictionary.getEntry(this.chapterId);

            if (chapterItem) {
                this.chapterDetail = chapterItem.value;
            } else {
                await this.loadChapterDetailAsync();
                chapterDictionary.addEntry(
                    this.chapterId,
                    this.chapterDetail.clone()
                );
            }

            this.isProcessing = false;
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
