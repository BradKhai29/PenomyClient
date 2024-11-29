<template>
    <q-btn
        v-if="isAuth"
        @click="toggleFollowCreator"
        class="border-radius-sm shadow-1 q-px-sm text-subtitle1 text-weight-bold"
        :class="isFollowed ? 'bg-dark text-light' : 'bg-light-300 text-dark'"
        dense
        no-caps
        unelevated
        :loading="isLoading"
        :disable="isLoading"
    >
        <span v-if="isFollowed" class="q-ml-xs flex items-center">
            <q-avatar size="sm" class="bg-primary text-dark">
                <q-icon name="check" size="xs" />
            </q-avatar>
            <span class="q-ml-xs"> Theo dõi </span>
        </span>
        <span v-else> Theo dõi </span>
        <q-tooltip anchor="top middle" self="bottom middle" :offset="[8, 8]">
            <strong v-if="isFollowed" class="text-subtitle2">
                Đã theo dõi tác giả
            </strong>
            <strong v-else class="text-subtitle2"> Theo dõi tác giả </strong>
        </q-tooltip>
    </q-btn>
    <q-btn
        v-else
        class="border-radius-sm shadow-1 q-px-sm text-subtitle1 text-weight-bold bg-light-300 text-dark"
        @click="showDialog = true"
        no-caps
        rounded
    >
        Theo dõi
        <q-tooltip anchor="top middle" self="bottom middle" :offset="[8, 8]">
            <strong class="text-subtitle2"> Theo dõi tác giả </strong>
        </q-tooltip>
    </q-btn>
    <RequireLoginDialog v-if="!isAuth" v-model="showDialog" />
</template>

<script>
// Import dependencies section.
import { FollowCreatorApiHandler } from "src/api.handlers/artwork/artwork3Page/FollowCreatorApiHandler";
import { useAuthStore } from "src/stores/common/AuthStore";
import { NotificationHelper } from "src/helpers/NotificationHelper";

// Import components section.
import RequireLoginDialog from "../others/RequireLoginDialog.vue";

// Init store for later operation.
const authStore = useAuthStore();

export default {
    name: "CreatorFollowButton",
    components: {
        RequireLoginDialog,
    },
    props: {
        creatorId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            isFollowed: false,
            showDialog: false,
            isLoading: true,
        };
    },
    computed: {
        isAuth() {
            return authStore.isAuth;
        },
    },
    async mounted() {
        this.isFollowed =
            await FollowCreatorApiHandler.checkHasFollowCreatorAsync(
                this.creatorId,
                authStore.bearerAccessToken()
            );

        this.isLoading = false;
    },
    methods: {
        toggleFollowCreator() {
            this.isProcessing = true;

            // Call api that corresponding to isFollowed's value when toggle.
            if (this.isFollowed) {
                this.removeFromFollowList();
            } else {
                this.addToFollowList();
            }
        },
        async addToFollowList() {
            const isSuccess = await FollowCreatorApiHandler.addToFollowAsync(
                this.creatorId,
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
            const isSuccess = await FollowCreatorApiHandler.removeFollowAsync(
                this.creatorId,
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
