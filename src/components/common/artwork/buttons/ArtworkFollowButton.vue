<template>
    <q-btn
        v-if="isAuth"
        @click="toggleFollowArtwork"
        class="text-subtitle1 text-weight-bold"
        :class="isFollowed ? 'bg-dark text-light' : 'bg-light-300 text-dark'"
        no-caps
        rounded
        dense
    >
        <span v-if="isFollowed" class="q-ml-xs flex items-center">
            <q-icon name="add_box" size="sm" class="text-primary" />
            <span class="q-ml-sm"> Đã theo dõi </span>
        </span>
        <span v-else class="q-ml-xs flex items-center">
            <q-icon name="add_box" size="sm" />
            <span class="q-ml-sm"> Theo dõi </span>
        </span>

        <q-tooltip anchor="top middle" self="bottom middle" :offset="[8, 8]">
            <strong v-if="isFollowed" class="text-subtitle2">
                Đã theo dõi tác phẩm
            </strong>
            <strong v-else class="text-subtitle2"> Theo dõi tác phẩm </strong>
        </q-tooltip>
    </q-btn>
    <q-btn
        v-else
        class="text-subtitle1 text-weight-bold bg-light-300 text-dark"
        no-caps
        rounded
        dense
        @click="showDialog = true"
    >
        <span class="q-ml-xs flex items-center">
            <q-icon name="add_box" size="sm" />
            <span class="q-ml-sm"> Theo dõi </span>
        </span>
        <q-tooltip anchor="top middle" self="bottom middle" :offset="[8, 8]">
            <strong class="text-subtitle2"> Theo dõi tác phẩm </strong>
        </q-tooltip>

        <RequireLoginDialog v-model="showDialog" />
    </q-btn>
</template>

<script>
// Import dependencies section.
import { FollowArtworkApiHandler } from "src/api.handlers/artwork/artwork3Page/FollowArtworkApiHandler";
// Import dependencies section.
import { useAuthStore } from "src/stores/common/AuthStore";
import { NotificationHelper } from "src/helpers/NotificationHelper";

// Import components section.
import RequireLoginDialog from "../../others/RequireLoginDialog.vue";

// Init store for later operation.
const authStore = useAuthStore();

export default {
    name: "ArtworkFollowButton",
    components: {
        RequireLoginDialog,
    },
    props: {
        artworkId: {
            required: true,
        },
        hasUserFollowed: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            showDialog: false,
            isFollowed: false,
        };
    },
    computed: {
        isAuth() {
            return authStore.isAuth;
        },
    },
    beforeMount() {
        this.isFollowed = this.hasUserFollowed;
    },
    methods: {
        toggleFollowArtwork() {
            this.isProcessing = true;

            // Call api that corresponding to isFollowed's value when toggle.
            if (this.isFollowed) {
                this.removeFromFollowList();
            } else {
                this.addToFollowList();
            }
        },
        async addToFollowList() {
            const isSuccess = await FollowArtworkApiHandler.addToFollowAsync(
                this.artworkId,
                authStore.bearerAccessToken()
            );

            if (!isSuccess) {
                NotificationHelper.notifyError("Có lỗi xảy ra khi gọi API");

                return;
            }

            // Update the state.
            this.isFollowed = true;
            this.isProcessing = false;
        },
        async removeFromFollowList() {
            const isSuccess = await FollowArtworkApiHandler.removeFollowAsync(
                this.artworkId,
                authStore.bearerAccessToken()
            );

            if (!isSuccess) {
                NotificationHelper.notifyError("Có lỗi xảy ra khi gọi API");

                return;
            }

            // Update the state.
            this.isFollowed = false;
            this.isProcessing = false;
        },
    },
};
</script>
