<template>
    <div class="row shadow-1 border-radius-sm">
        <router-link :to="artworkLink" class="relative-position underline-none">
            <!-- Star rates section -->
            <div class="star-rates-section">
                <span
                    class="bg-dark border-radius-top-left-sm border-radius-bottom-right-sm text-light q-px-sm q-py-xs flex items-center"
                >
                    <q-icon name="star" size="xs" />
                    <span class="q-ml-xs">{{ averageStarRates }}</span>
                </span>
            </div>
            <!-- Star rates section -->

            <!-- Origin section -->
            <div class="q-pa-sm artwork-origin-section border-radius-sm">
                <span
                    v-if="isCompleted"
                    class="bg-primary text-dark border-radius-sm flex items-center"
                    style="padding: 2.4px 4px"
                >
                    <span class="q-mr-xs">end</span>
                    <q-icon name="check" size="xs" />
                </span>

                <q-img
                    class="q-ml-sm border-radius-sm shadow-1 metadata-badge"
                    :src="originImageUrl"
                />
            </div>
            <!-- Origin section -->

            <!-- Artwork image section -->
            <q-img
                :src="thumbnailUrl"
                class="artwork-card-image shadow-1 border-radius-sm"
            />
            <!-- Artwork image section -->
        </router-link>
        <div class="q-pa-sm q-pl-md col-grow column bg-light-100">
            <router-link
                :to="artworkLink"
                class="flex items-center justify-between text-dark underline-none"
            >
                <span
                    class="text-subtitle1 text-weight-bold col-grow artwork-title"
                >
                    {{ title }}
                </span>
                <q-icon name="palette" size="xs" />
            </router-link>

            <div class="recommended-chapters-section q-mt-md q-mb-xs">
                <router-link
                    :to="chapterLink(lastViewedChapter.id)"
                    class="underline-none text-light flex items-center text-subtitle2"
                >
                    <span class="text-weight-bold text-dark">
                        Tập {{ lastViewedChapter.uploadOrder }}
                    </span>
                    <span class="text-dark-500 q-ml-auto">
                        {{ lastViewedAt }}
                    </span>
                </router-link>
            </div>

            <div class="q-mt-auto flex items-center justify-between">
                <q-btn
                    :to="artworkLink"
                    no-caps
                    dense
                    flat
                    class="text-subtitle2 bg-dark text-light border-radius-sm q-px-sm"
                >
                    Xem ngay
                </q-btn>

                <ArtworkCardOtherActionButton
                    :artworkId="artworkId"
                    :isAuthor="isAuthor"
                />
            </div>
        </div>
    </div>
</template>

<script>
// Import dependencies section.
import { Art5RouteNames } from "src/router/artwork/Artwork5PageRoute";

// Import components section.
import ArtworkCardOtherActionButton from "src/components/common/artwork/buttons/ArtworkCardOtherActionButton.vue";
import { ArtworkDetailResponseItem } from "src/api.models/creatorProfile/ArtworkDetailResponseItem";

export default {
    name: "ViewHistoryArtworkCard",
    components: {
        ArtworkCardOtherActionButton,
    },
    props: {
        isAuthor: {
            type: Boolean,
            default: false,
        },
        isComic: {
            type: Boolean,
            default: true,
        },
        artworkDetail: {
            type: ArtworkDetailResponseItem,
            required: true,
        },
    },
    computed: {
        artworkId() {
            return this.artworkDetail.id;
        },
        artworkLink() {
            if (this.isComic) {
                return `/artwork/comic/${this.artworkId}`;
            }

            return `/artwork/anime/${this.artworkId}`;
        },
        isCompleted() {
            return false;
        },
        title() {
            return this.artworkDetail.title;
        },
        thumbnailUrl() {
            return this.artworkDetail.thumbnailUrl;
        },
        averageStarRates() {
            return this.artworkDetail.averageStarRates;
        },
        originImageUrl() {
            return this.artworkDetail.originImageUrl;
        },
        lastViewedChapter() {
            return this.artworkDetail.chapter;
        },
        lastViewedAt() {
            return this.artworkDetail.chapter.getShortPublishedAt();
        },
    },
    methods: {
        /**
         * Return a corresponding chapter link with input chapter id.
         */
        chapterLink(chapterId) {
            if (this.isComic) {
                return {
                    name: Art5RouteNames.ComicChapterDetail,
                    params: {
                        comicId: this.artworkDetail.id,
                        chapterId: chapterId,
                    },
                };
            }

            return {
                name: Art5RouteNames.ComicChapterDetail,
                params: {
                    comicId: this.artworkDetail.id,
                    chapterId: chapterId,
                },
            };
        },
    },
};
</script>

<style scoped>
.artwork-card-image {
    --min-width: 140px;
    --ratio: 0.788;
    --height: calc(var(--min-width) / var(--ratio));

    min-width: var(--min-width);
    height: var(--height);
}

/* Artwork card metadata section */
.star-rates-section {
    position: absolute !important;
    display: flex;
    z-index: 100 !important;
    top: 0;
    left: 0;
    width: 100%;
}

.artwork-origin-section {
    position: absolute !important;
    display: flex;
    justify-content: end;
    align-items: center;
    z-index: 102;
    bottom: 0 !important;
    left: 0 !important;
    width: 100%;
}

.artwork-title {
    max-width: 136px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
