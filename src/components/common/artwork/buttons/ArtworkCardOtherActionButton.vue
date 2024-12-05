<template>
    <q-btn
        :disable="isProcessing"
        :loading="isProcessing"
        class="text-dark"
        dense
        flat
        no-cap
        padding="1px"
        icon="more_vert"
    >
        <!-- If user access this, display actions for user -->
        <q-menu
            v-if="isUser"
            anchor="bottom left"
            self="bottom end"
            :offset="offset"
        >
            <q-item
                @click="addToFavorite"
                clickable
                v-close-popup
                class="flex items-center"
            >
                <q-icon class="text-secondary-900" name="favorite" size="sm" />
                <span class="q-ml-xs">Yêu thích</span>
            </q-item>
            <q-separator />
            <q-item
                @click="followArtwork"
                clickable
                v-close-popup
                class="flex items-center"
            >
                <q-icon class="text-primary" name="add_box" size="sm" />
                <span class="q-ml-xs">Theo dõi</span>
            </q-item>
            <q-separator />
            <q-item
                @click="sendReport"
                clickable
                v-close-popup
                class="flex items-center"
            >
                <q-icon class="text-dark" name="report" size="sm" />
                <span class="q-ml-xs">Báo cáo</span>
            </q-item>
        </q-menu>

        <!-- If author accesses this, display action for author -->
        <q-menu
            v-if="isAuthor"
            anchor="bottom left"
            self="bottom end"
            :offset="offset"
        >
            <q-item clickable v-close-popup class="flex items-center">
                <q-icon class="text-primary" name="edit" size="sm" />
                <span class="q-ml-xs">Chỉnh sửa</span>
            </q-item>
        </q-menu>
    </q-btn>

    <RequireLoginDialog v-model="showDialog" />
</template>

<script>
// Import dependencies section.
import { FollowArtworkApiHandler } from "src/api.handlers/artwork/artwork3Page/FollowArtworkApiHandler";
import { FavoriteArtworkApiHandler } from "src/api.handlers/artwork/artwork3Page/FavoriteArtworkApiHandler";

// Import components section.
import RequireLoginDialog from "../../others/RequireLoginDialog.vue";

// Init authStore for later operation.
import { useAuthStore } from "src/stores/common/AuthStore";
import { NotificationHelper } from "src/helpers/NotificationHelper";
const authStore = useAuthStore();

export default {
    name: "ArtworkCardOtherActionButton",
    components: {
        RequireLoginDialog,
    },
    props: {
        artworkId: {
            required: true,
        },
        isAuthor: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            showDialog: false,
            isProcessing: false,
        };
    },
    computed: {
        offset() {
            return [10, 10];
        },
        isUser() {
            return !this.isAuthor;
        },
    },
    methods: {
        async followArtwork() {
            // Display dialog when the current user does not sign in.
            if (!authStore.isAuth) {
                this.showDialog = true;
                return;
            }

            if (this.isProcessing) {
                return;
            }

            // Turn on isProcessing flag to prevent user re-trigger when api is called.
            this.isProcessing = true;

            const result = await FollowArtworkApiHandler.addToFollowAsync(
                this.artworkId,
                authStore.bearerAccessToken()
            );

            if (result) {
                NotificationHelper.notifySuccess(
                    "Đã thêm vào danh sách theo dõi"
                );
            } else {
                NotificationHelper.notifySuccess(
                    "Bạn đã theo dõi tác phẩm này"
                );
            }

            // Turn off isProcessing flag after calling api success.
            this.isProcessing = false;
        },
        async addToFavorite() {
            // Display dialog when the current user does not sign in.
            if (!authStore.isAuth) {
                this.showDialog = true;
                return;
            }

            if (this.isProcessing) {
                return;
            }

            // Turn on isProcessing flag to prevent user re-trigger when api is called.
            this.isProcessing = true;

            const result = await FavoriteArtworkApiHandler.addToFavoriteAsync(
                this.artworkId,
                authStore.bearerAccessToken()
            );

            if (result) {
                NotificationHelper.notifySuccess(
                    "Đã thêm vào danh sách yêu thích"
                );
            } else {
                NotificationHelper.notifySuccess(
                    "Bạn đã yêu thích tác phẩm này"
                );
            }

            // Turn off isProcessing flag after calling api success.
            this.isProcessing = false;
        },
        async sendReport() {
            // Display dialog when the current user does not sign in.
            if (!authStore.isAuth) {
                this.showDialog = true;
                return;
            }
        },
    },
};
</script>
