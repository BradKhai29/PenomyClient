<template>
    <q-btn
        @click="toggleFavorite"
        class="text-subtitle1 text-weight-bold"
        :class="
            isFavorite
                ? 'bg-dark text-secondary-500 '
                : 'bg-light-300 text-dark'
        "
        no-caps
        rounded
        :loading="isProcessing"
        :disable="isProcessing"
    >
        <q-icon name="favorite" size="sm" />
        <q-tooltip
            anchor="top middle"
            self="bottom middle"
            :offset="[4, 4]"
            class="bg-dark text-light"
        >
            <strong class="text-subtitle2">{{
                isFavorite ? "Đã yêu thích" : "Yêu thích"
            }}</strong>
        </q-tooltip>
    </q-btn>
</template>

<script>
import { FavoriteArtworkApiHandler } from "src/api.handlers/artwork/artwork3Page/FavoriteArtworkApiHandler";
import { useAuthStore } from "src/stores/common/AuthStore";
import { NotificationHelper } from "src/helpers/NotificationHelper";

// Init auth store for later operation.
const authStore = useAuthStore();

export default {
    name: "AddFavoriteButton",
    props: {
        userId: {
            required: true,
        },
        artworkId: {
            required: true,
        },
        isUserFavorite: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            isProcessing: false,
            isFavorite: false,
        };
    },
    mounted() {
        this.isFavorite = this.isUserFavorite;
    },
    methods: {
        toggleFavorite() {
            this.isProcessing = true;
            // Call api that corresponding to isFavorite's value when toggle.
            if (this.isFavorite) {
                this.removeFromFavoriteList();
            } else {
                this.addToFavoriteList();
            }
        },
        async removeFromFavoriteList() {
            const favoriteCount =
                await FavoriteArtworkApiHandler.removeFavoriteAsync(
                    this.artworkId,
                    authStore.bearerAccessToken()
                );

            if (favoriteCount == -1) {
                NotificationHelper.notifyError("Có lỗi xảy ra khi gọi API");

                return;
            }

            // Update the state.
            this.isFavorite = false;
            this.isProcessing = false;
        },
        async addToFavoriteList() {
            const favoriteCount =
                await FavoriteArtworkApiHandler.addToFavoriteAsync(
                    this.artworkId,
                    authStore.bearerAccessToken()
                );

            if (favoriteCount == -1) {
                NotificationHelper.notifyError("Có lỗi xảy ra khi gọi API");

                return;
            }

            // Update the state.
            this.isFavorite = true;
            this.isProcessing = false;
        },
    },
};
</script>
