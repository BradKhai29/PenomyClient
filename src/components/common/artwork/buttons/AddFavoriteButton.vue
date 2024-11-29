<template>
    <q-btn
        v-if="isAuth"
        @click="toggleFavorite"
        class="text-subtitle1 text-weight-bold"
        :class="buttonBackgroundClass"
        no-caps
        :rounded="isComicType"
        :loading="isProcessing"
        :disable="isProcessing"
    >
        <q-icon name="favorite" size="sm" />
        <q-tooltip
            anchor="top middle"
            self="bottom middle"
            :offset="[8, 8]"
            :class="isComicType ? 'bg-dark text-light' : ''"
        >
            <strong class="text-subtitle2">{{
                isFavorite ? "Đã yêu thích" : "Yêu thích tác phẩm"
            }}</strong>
        </q-tooltip>
    </q-btn>
    <q-btn
        v-else
        no-caps
        class="text-subtitle1 text-weight-bold"
        :class="buttonBackgroundClass"
        :rounded="isComicType"
        :loading="isProcessing"
        :disable="isProcessing"
        @click="showDialog = true"
    >
        <q-icon name="favorite" size="sm" />
        <q-tooltip anchor="top middle" self="bottom middle" :offset="[8, 8]">
            <strong class="text-subtitle2"> Yêu thích tác phẩm </strong>
        </q-tooltip>
    </q-btn>
    <RequireLoginDialog v-if="!isAuth" v-model="showDialog" />
</template>

<script>
// Import dependencies section.
import {
    ADD_FAVORITE_FAILED_RESULT,
    FavoriteArtworkApiHandler,
    REMOVE_FAVORITE_FAILED_RESULT,
} from "src/api.handlers/artwork/artwork3Page/FavoriteArtworkApiHandler";
import { useAuthStore } from "src/stores/common/AuthStore";
import { NotificationHelper } from "src/helpers/NotificationHelper";

// Import components section.
import RequireLoginDialog from "../../others/RequireLoginDialog.vue";

// Init auth store for later operation.
const authStore = useAuthStore();

export default {
    name: "AddFavoriteButton",
    components: {
        RequireLoginDialog,
    },
    props: {
        artworkId: {
            required: true,
        },
        isUserFavorite: {
            type: Boolean,
            default: false,
        },
        isComicType: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            isProcessing: false,
            isFavorite: false,
            showDialog: false,
        };
    },
    computed: {
        buttonBackgroundClass() {
            if (this.isComicType) {
                return this.isFavorite
                    ? "bg-dark text-secondary-500"
                    : "bg-light-300 text-dark";
            }
            // If this button is displayed for animation type.
            else {
                return this.isFavorite
                    ? "bg-light-300 text-secondary-500"
                    : "bg-light-300 text-dark-500";
            }
        },
        isAuth() {
            return authStore.isAuth;
        },
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

            if (favoriteCount == REMOVE_FAVORITE_FAILED_RESULT) {
                NotificationHelper.notifyError("Có lỗi xảy ra khi gọi API");

                this.isProcessing = false;
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

            if (favoriteCount == ADD_FAVORITE_FAILED_RESULT) {
                NotificationHelper.notifyError("Có lỗi xảy ra khi gọi API");

                this.isProcessing = false;
                return;
            }

            // Update the state.
            this.isFavorite = true;
            this.isProcessing = false;
        },
    },
};
</script>
