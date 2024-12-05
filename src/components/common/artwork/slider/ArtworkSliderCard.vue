<template>
    <div class="slider-card-wrapper col-grow" :style="sliderCardStyle">
        <div class="q-py-lg q-px-xl row slider-artwork-card">
            <div class="col-9 column">
                <div class="artwork-title flex items-center q-mb-md">
                    <q-btn
                        :to="artworkLink"
                        no-caps
                        flat
                        unelevated
                        padding="none"
                        class="text-h5 text-light q-mr-sm text-weight-bold"
                    >
                        {{ artworkTitle }}
                    </q-btn>
                    <span
                        class="text-primary text-weight-bold q-px-xs border-md-primary border-radius-sm text-subtitle2"
                    >
                        {{ artworkType }}
                    </span>
                    <q-img
                        class="q-ml-sm border-radius-sm shadow-1 metadata-badge"
                        :src="originImageUrl"
                    />
                </div>
                <div class="artwork-chapters flex items-center">
                    <span class="text-subtitle1 text-light">
                        <span class="text-weight-bold">Số tập:</span>
                        <span v-if="isComic" class="q-ml-xs">
                            {{ totalChapters }}
                        </span>
                        <span v-else class="q-ml-xs">
                            {{ lastChapterUploadOrder }}/{{ totalChapters }}
                        </span>
                    </span>
                    <span
                        class="border-sm-light q-mx-sm"
                        style="padding: 6.4px 0px"
                    ></span>
                    <q-btn
                        :to="latestChapterLink"
                        no-caps
                        padding="none"
                        flat
                        class="text-subtitle1 text-light q-mr-sm"
                    >
                        <span class="q-ml-xs">{{ latestChapterTitle }}</span>
                    </q-btn>
                </div>
                <div
                    class="artwork-categories q-mt-xs q-mb-md flex items-center q-gutter-sm"
                >
                    <span
                        class="bg-primary text-dark flex items-center q-py-xs q-px-sm border-radius-sm"
                    >
                        <q-icon name="star" size="xs" />
                        <span class="text-subtitle2 q-ml-xs text-weight-bold">
                            {{ averageStarRates }}
                        </span>
                    </span>
                    <span
                        v-for="(category, index) in categoryList"
                        :key="index"
                        class="bg-light-100 text-dark text-subtitle2 text-weight-bold q-pa-xs border-radius-sm"
                    >
                        {{ category }}
                    </span>
                </div>
                <p class="text-subtitle2 text-light q-mb-none paragraph-line-4">
                    {{ introduction }}
                </p>
                <div class="flex items-center q-mt-auto">
                    <q-btn
                        :to="artworkLink"
                        no-caps
                        class="bg-primary text-dark q-pa-sm border-radius-sm"
                    >
                        <span class="bg-dark card-play-button">
                            <q-icon
                                name="play_arrow"
                                size="xs"
                                class="text-primary"
                            />
                        </span>
                        <span class="text-subtitle1 text-weight-bold q-ml-xs">
                            Xem ngay
                        </span>
                    </q-btn>
                    <q-btn
                        :to="creatorProfileLink"
                        class="q-ml-sm bg-light"
                        round
                    >
                        <q-avatar class="shadow-1">
                            <img :src="creatorAvatarUrl" />
                        </q-avatar>
                        <q-tooltip
                            anchor="center right"
                            self="center left"
                            :offset="[4, 10]"
                        >
                            <strong class="text-subtitle2">
                                Tác giả: {{ creatorName }}
                            </strong>
                        </q-tooltip>
                    </q-btn>
                </div>
            </div>
            <div class="q-ml-auto col-auto">
                <q-btn dense padding="none" :to="artworkLink">
                    <q-img
                        :src="thumbnailUrl"
                        class="border-radius-sm slider-artwork-image"
                    />
                </q-btn>
            </div>
        </div>
    </div>
</template>

<script>
import { TopRecommendedArtworkResponse } from "src/api.models/artwork/artwork1Page/TopRecommendedArtworkResponse";
import { Art5RouteNames } from "src/router/artwork/Artwork5PageRoute";
import { CreatorProfile1RouteNames } from "src/router/creatorProfile/CreatorProfile1PageRoute";

export default {
    name: "ArtworkSliderCard",
    props: {
        isComic: {
            type: Boolean,
            default: true,
        },
        artworkDetail: {
            type: TopRecommendedArtworkResponse,
            required: true,
        },
    },
    computed: {
        artworkLink() {
            if (this.isComic) {
                return `/artwork/comic/${this.artworkDetail.id}`;
            }

            return `/artwork/anime/${this.artworkDetail.id}`;
        },
        artworkType() {
            if (this.isComic) {
                return "Truyện tranh";
            }

            return "Hoạt hình";
        },
        artworkTitle() {
            return this.artworkDetail.title;
        },
        origin() {
            return this.artworkDetail.origin;
        },
        originImageUrl() {
            return this.artworkDetail.originImageUrl;
        },
        thumbnailUrl() {
            return this.artworkDetail.thumbnailUrl;
        },
        sliderCardStyle() {
            return {
                background: `url(${this.thumbnailUrl}) no-repeat center`,
                backgroundSize: "100%",
            };
        },
        introduction() {
            return this.artworkDetail.introduction;
        },
        lastChapterUploadOrder() {
            return this.artworkDetail.lastChapterUploadOrder;
        },
        totalChapters() {
            if (this.isComic) {
                return this.artworkDetail.lastChapterUploadOrder;
            }

            return this.artworkDetail.fixedTotalChapters;
        },
        latestChapterLink() {
            if (this.isComic) {
                return {
                    name: Art5RouteNames.ComicChapterDetail,
                    params: {
                        comicId: this.artworkDetail.id,
                        chapterId: this.artworkDetail.latestChapterId,
                    },
                };
            }

            // If the current area is animation, then get link for animation chapter.
            return {
                name: Art5RouteNames.ComicChapterDetail,
                params: {
                    comicId: this.artworkDetail.id,
                    chapterId: this.artworkDetail.latestChapterId,
                },
            };
        },
        latestChapterTitle() {
            return this.artworkDetail.latestChapterTitle;
        },
        averageStarRates() {
            return this.artworkDetail.averageStarRates;
        },
        categoryList() {
            return this.artworkDetail.categories;
        },
        creatorId() {
            return this.artworkDetail.creatorId;
        },
        creatorName() {
            return this.artworkDetail.creatorName;
        },
        creatorAvatarUrl() {
            return this.artworkDetail.creatorAvatarUrl;
        },
        creatorProfileLink() {
            return {
                name: CreatorProfile1RouteNames.profileDetail,
                params: {
                    creatorId: this.artworkDetail.creatorId,
                },
            };
        },
    },
};
</script>
