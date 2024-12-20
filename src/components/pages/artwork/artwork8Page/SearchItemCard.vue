<template>
    <div>
        <router-link :to="artworkLink" class="underline-none text-dark">
            <div
                class="flex items-center q-pa-sm bg-light-300 q-mb-sm border-radius-sm align-stretch"
            >
                <div class="artwork-recommend-image border-radius-sm shadow-1">
                    <q-img
                        :src="avatar"
                        :ratio="1"
                        width="100%"
                        height="100%"
                    />
                </div>

                <div class="q-ml-sm text-dark flex-grow">
                    <p
                        class="artwork-item-name text-subtitle1 text-weight-bold q-mb-none"
                    >
                        {{ title }}
                    </p>

                    <div class="flex items-center q-mb-xs">
                        <span class="star-rate flex items-center">
                            <q-icon
                                name="star"
                                size="20px"
                                class="text-primary"
                            />
                            <span
                                style="margin-left: 2px"
                                class="text-subtitle2 text-weight-bold"
                            >
                                {{ averageStarRates }}
                            </span>
                        </span>

                        <span class="q-ml-md total-followers flex items-center">
                            <q-icon
                                name="person_add"
                                size="20px"
                                class="text-primary"
                            />
                            <span
                                style="margin-left: 2px"
                                class="text-subtitle2 text-weight-bold"
                            >
                                {{ numberOfFollowers }}
                            </span>
                        </span>
                    </div>

                    <div class="flex items-center">
                        <span
                            style="padding: 2px 4px"
                            class="bg-dark flex items-center border-radius-sm"
                        >
                            <q-icon name="circle" class="text-primary" />
                            <span class="q-ml-xs text-light">Còn cập nhật</span>
                        </span>

                        <span
                            style="padding: 2px 4px"
                            class="bg-dark flex items-center border-radius-sm q-ml-sm"
                        >
                            <q-icon
                                :name="isComic ? 'palette' : 'videocam'"
                                class="text-primary"
                            />
                            <span class="q-ml-xs text-light">
                                {{ artworkType }}</span
                            >
                        </span>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
import { SearchResponseItem } from "src/api.models/artwork/search/SearchResponseItem";
import { ArtworkTypes } from "src/api.handlers/artwork/artwork1Page/TopRecommendedArtworkApiHandler";
export default {
    name: "SearchItemCard",
    props: {
        artworkDetail: {
            type: SearchResponseItem,
            required: true,
        },
    },
    computed: {
        isComic() {
            return this.artworkDetail.artworkType == ArtworkTypes.COMIC;
        },
        artworkId() {
            return this.artworkDetail.id;
        },
        artworkLink() {
            if (this.isComic) {
                return `/artwork/comic/${this.artworkId}`;
            }

            return `/artwork/anime/${this.artworkId}`;
        },
        artworkType() {
            if (this.isComic) {
                return "Truyện tranh";
            }

            return "Hoạt hình";
        },
        title() {
            return this.artworkDetail.name;
        },
        avatar() {
            return this.artworkDetail.avatar;
        },
        averageStarRates() {
            return this.artworkDetail.averageStarRates;
        },
        numberOfFollowers() {
            return this.artworkDetail.numberOfFollowers;
        },
    },
};
</script>

<style scoped>
.artwork-recommend-image {
    --width: 80px;
    --height: var(--width);

    width: var(--width);
    height: var(--height);
}
</style>
