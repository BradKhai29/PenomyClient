<template>
    <router-link
        :to="artworkLink"
        class="col-md-4 col-12 border-sm-bottom-light-500 text-decoration-none"
    >
        <div class="flex">
            <div class="artwork-recommend-image">
                <q-img
                    src="https://res.cloudinary.com/dsjsmbdpw/image/upload/v1729903327/comics/8857013803077632/8857013803077632.png"
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
                        Hành động, Giả tưởng
                    </span>
                    <span
                        class="text-dark text-subtitle1 text-weight-bold artwork-card-text"
                    >
                        Day la mot bo phim nay
                    </span>
                    <span class="text-dark text-subtitle2 artwork-card-text">
                        Tên tác giả
                    </span>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: "RecommendedArtworkItemCard",
    props: {
        artworkId: {
            required: true,
        },
        itemIndex: {
            type: Number,
            default: 1,
        },
    },
    computed: {
        artworkLink() {
            return this.$router.path;
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
