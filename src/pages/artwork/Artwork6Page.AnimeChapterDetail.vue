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
            />
        </section>

        <section
            id="anime-detail-section"
            class="flex items-center align-stretch q-mt-sm"
        >
            <section class="anime-description-section">
                <div class="anime-description-container">
                    <p class="p-mb-none flex items-center text-dark text-h6">
                        <span class="text-weight-bold">
                            Thanh gươm diệt quỷ: Chuyến tàu vô tận (Trailer)
                        </span>
                        <span class="text-weight-bold">
                            <q-icon name="chevron_right" size="md" />
                        </span>
                        <span> Tập 0 </span>
                    </p>
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
import { AnimeChapterDetailResponseDto } from "src/api.models/artwork/artwork6Page/AnimeChapterDetailResponseDto";

// Import components section.
import ChapterVideoPlayer from "src/components/pages/artwork/artwork6Page.AnimeChapterDetail/ChapterVideoPlayer.vue";
import ChapterListSection from "src/components/pages/artwork/artwork6Page.AnimeChapterDetail/ChapterDetail.ChapterListSection.vue";
import { NumberHelper } from "src/helpers/NumberHelper";

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
        };
    },
    computed: {
        chapterDetail() {
            return new AnimeChapterDetailResponseDto(
                1,
                2,
                3,
                "https://res.cloudinary.com/dsjsmbdpw/video/upload/v1733759019/animations/test/kimetsu_no_yaiba_mugen_train_zpscfr.mp4"
            );
        },
    },
    beforeMount() {
        this.loadArtworkIdAndChapterIdFromRoute();

        this.isValidId =
            NumberHelper.isNumber(this.artworkId) &&
            NumberHelper.isNumber(this.chapterId);

        if (!this.isValidId) {
            // Redirect back to homepage when find invalid id.
            this.$router.push("/");

            return;
        }
    },
    async mounted() {
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
    },
};
</script>

<style scoped>
#anime-detail-section,
#chapter-video-section {
    --margin-width: 112px;
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
