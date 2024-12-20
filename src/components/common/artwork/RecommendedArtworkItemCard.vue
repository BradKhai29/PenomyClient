<template>
    <router-link
        :to="artworkLink"
        class="col-md-4 col-12 border-sm-bottom-light-500 text-decoration-none"
    >
        <div class="flex">
            <div class="artwork-recommend-image">
                <q-img
                    :src="thumbnailUrl"
                    :ratio="1"
                    width="100%"
                    height="100%"
                />
            </div>
            <div class="flex items-center">
                <div class="flex items-center q-px-sm">
                    <q-avatar class="bg-dark" size="20px">
                        <span
                            class="text-light text-subtitle2 text-weight-bold"
                        >
                            {{ itemIndex }}
                        </span>
                    </q-avatar>
                </div>
                <div class="q-py-md column">
                    <span class="text-dark-500 artwork-card-text">
                        {{ categories }}
                    </span>
                    <span
                        class="text-dark text-subtitle1 text-weight-bold artwork-card-text"
                    >
                        {{ title }}
                    </span>
                    <span class="text-dark text-subtitle2 artwork-card-text">
                        {{ authorName }}
                    </span>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
import { Art3RecommendedArtworkResponseItem } from "src/api.models/artwork/artwork3Page/Art3RecommendedArtworkResponseItem";
export default {
    name: "RecommendedArtworkItemCard",
    props: {
        itemIndex: {
            type: Number,
            default: 1,
        },
        artworkDetail: {
            type: Art3RecommendedArtworkResponseItem,
            required: true,
        },
        isComic: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        artworkLink() {
            if (this.isComic) {
                return `/artwork/comic/${this.artworkDetail.id}`;
            }

            return `/artwork/anime/${this.artworkDetail.id}`;
        },
        thumbnailUrl() {
            return this.artworkDetail.thumbnailUrl;
        },
        title() {
            return this.artworkDetail.title;
        },
        categories() {
            return this.artworkDetail.getCategoryListString();
        },
        authorName() {
            return this.artworkDetail.authorName;
        },
    },
};
</script>

<style scoped>
.artwork-recommend-image {
    --width: 100px;
    --height: var(--width);

    width: var(--width);
    height: var(--height);
}

.artwork-card-text {
    white-space: nowrap;
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
}

@media screen and (max-width: 480px) {
    .artwork-recommend-image {
        --width: 80px;
        --height: var(--width);

        width: var(--width);
        height: var(--height);
    }

    .artwork-card-text {
        white-space: nowrap;
        width: 140px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>
