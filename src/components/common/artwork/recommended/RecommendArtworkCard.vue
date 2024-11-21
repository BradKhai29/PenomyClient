<template>
    <div :id="`recommended_artwork_card_${artworkId}`">
        <router-link
            :to="artworkLink"
            @mouseenter="hover"
            @mouseleave="unhover"
        >
            <div class="relative-position">
                <!-- Star rates section -->
                <div v-show="!hovered" class="star-rates-section">
                    <span
                        class="bg-dark border-radius-top-left-sm border-radius-bottom-right-sm text-light q-px-sm q-py-xs flex items-center"
                    >
                        <q-icon name="star" size="xs" />
                        <span class="q-ml-xs">{{ averageStarRates }}</span>
                    </span>
                </div>
                <!-- Star rates section -->

                <!-- Origin section -->
                <div class="q-pa-sm artwork-origin-section">
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

                <!-- Hover detail section -->
                <section
                    v-show="hovered"
                    class="hovered-detail-section bg-dark-blur-deep border-radius-sm q-pa-sm"
                >
                    <router-link
                        v-for="chapter in newChapters"
                        :key="chapter.chapterId"
                        :to="getChapterLink(chapter.chapterId)"
                        class="underline-none text-light border-md-light border-radius-sm flex items-center q-pa-sm flex justify-between latest-chapter-item q-mb-sm"
                    >
                        <span>Tập {{ chapter.uploadOrder }} </span>
                        <span>{{ chapter.publishedAt }}</span>
                    </router-link>
                    <router-link
                        :to="creatorProfileLink"
                        class="underline-none text-light flex items-center q-mt-md"
                    >
                        <q-avatar size="md">
                            <img
                                :src="
                                    creatorAvatarUrl ??
                                    'https://cdn.quasar.dev/img/avatar.png'
                                "
                            />
                        </q-avatar>
                        <span class="q-ml-xs text-subtitle1 creator-nickname">
                            {{ creatorName }}
                        </span>
                    </router-link>
                </section>
                <!-- Hover detail section -->

                <!-- Artwork image section -->
                <q-img
                    :src="thumbnailUrl"
                    class="recommended-artwork-image border-radius-sm shadow-1"
                />
                <!-- Artwork image section -->
            </div>
        </router-link>
        <div class="q-mt-sm flex items-center justify-between">
            <router-link
                :to="artworkLink"
                class="text-dark text-subtitle2 text-weight-bold underline-none artwork-title"
            >
                {{ title }}
            </router-link>
            <ArtworkCardOtherActionButton :artworkId="artworkId" />
        </div>
    </div>
</template>

<script>
// Import dependencies section.
import { RecommendedArtworkResponseItem } from "src/api.models/artwork/artwork1Page/RecommendArtworkResponseItem";
import { Art5RouteNames } from "src/router/artwork/Artwork5PageRoute";
import { CreatorProfile1RouteNames } from "src/router/creatorProfile/CreatorProfile1PageRoute";

// Import components section.
import ArtworkCardOtherActionButton from "../buttons/ArtworkCardOtherActionButton.vue";

export default {
    name: "RecommendArtworkCard",
    components: {
        ArtworkCardOtherActionButton,
    },
    props: {
        isComic: {
            type: Boolean,
            default: true,
        },
        artworkDetail: {
            type: RecommendedArtworkResponseItem,
            required: true,
        },
    },
    data() {
        return {
            hovered: false,
        };
    },
    computed: {
        isCompleted() {
            return false;
        },
        artworkId() {
            return this.artworkDetail.artworkId;
        },
        artworkLink() {
            if (this.isComic) {
                return `/artwork/comic/${this.artworkId}`;
            }

            return `/artwork/anime/${this.artworkId}`;
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
        creatorProfileLink() {
            return {
                name: CreatorProfile1RouteNames.profileDetail,
                params: {
                    creatorId: this.artworkDetail.creatorId,
                },
            };
        },
        creatorName() {
            return this.artworkDetail.creatorName;
        },
        creatorAvatarUrl() {
            return this.artworkDetail.creatorAvatarUrl;
        },
        newChapters() {
            return this.artworkDetail.newChapters;
        },
    },
    methods: {
        hover() {
            this.hovered = true;
        },
        unhover() {
            this.hovered = false;
        },
        getChapterLink(chapterId) {
            if (this.isComic) {
                return {
                    name: Art5RouteNames.ComicChapterDetail,
                    params: {
                        comicId: this.artworkDetail.artworkId,
                        chapterId: chapterId,
                    },
                };
            }

            return {
                name: Art5RouteNames.ComicChapterDetail,
                params: {
                    comicId: this.artworkDetail.artworkId,
                    chapterId: chapterId,
                },
            };
        },
    },
};
</script>


<style scoped>
.recommended-artwork-image {
    --max-width: 208px;
    --ratio: 0.778;
    --height: calc(var(--max-width) / var(--ratio));

    width: var(--max-width);
    height: var(--height);
}

.latest-chapter-item:hover {
    --primary: #53bf94;

    border-color: var(--primary) !important;
    color: var(--primary) !important;
    font-weight: bold !important;
}

.creator-nickname:hover {
    --primary: #53bf94;

    color: var(--primary) !important;
    font-weight: bold !important;
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

/* Artwork card hovered-detail section */
.hovered-detail-section {
    position: absolute !important;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 50;
}

.artwork-title {
    max-width: 168px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
