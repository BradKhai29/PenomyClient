<template>
    <div class="q-pa-md bg-light-100 shadow-1 border-radius-sm">
        <div class="followed-creator-card column items-center">
            <router-link :to="creatorProfileLink" class="underline-none">
                <section class="avatar-and-creator-name-section text-center">
                    <q-avatar size="80px" class="shadow-1">
                        <img :src="avatarUrl" />
                    </q-avatar>
                    <p
                        class="paragraph-line-1 text-subtitle1 text-dark q-my-sm text-weight-bold"
                    >
                        {{ creatorName }}
                    </p>

                    <div
                        class="column items-center text-dark-500 text-subtitle1"
                    >
                        <span>{{ totalArtworksShort }} tác phẩm</span>
                        <span>{{ totalFollowersShort }} người theo dõi</span>
                    </div>
                </section>
            </router-link>

            <div class="text-center q-mt-md">
                <q-btn
                    @click="toggleFollow"
                    :disable="isProcessing"
                    :loading="isProcessing"
                    class="text-dark text-subtitle2 text-weight-bold q-px-md"
                    :class="isFollowed ? 'bg-primary' : 'bg-light-500'"
                    no-caps
                    dense
                    rounded
                >
                    {{ isFollowed ? "Đã theo dõi" : "Theo dõi" }}
                </q-btn>
            </div>
        </div>

        <q-tooltip anchor="top middle" self="bottom middle" :offset="[8, 8]">
            <strong class="text-subtitle2">Tác giả: {{ creatorName }}</strong>
        </q-tooltip>
    </div>
</template>

<script>
// Import dependencies section.
import { FollowedCreatorProfileResponseItem } from "src/api.models/userProfile/userProfile1Page/FollowedCreatorProfileResponseItem";
import { FollowCreatorApiHandler } from "src/api.handlers/artwork/artwork3Page/FollowCreatorApiHandler";
import { NotificationHelper } from "src/helpers/NotificationHelper";

export default {
    name: "FollowedCreatorCard",
    props: {
        creatorDetail: {
            type: FollowedCreatorProfileResponseItem,
            required: true,
        },
        bearerAccessToken: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            isFollowed: true,
            isProcessing: false,
        };
    },
    computed: {
        creatorProfileLink() {
            return `/creator/${this.creatorId}`;
        },
        creatorId() {
            return this.creatorDetail.id;
        },
        avatarUrl() {
            return this.creatorDetail.avatarUrl;
        },
        creatorName() {
            return this.creatorDetail.nickName;
        },
        totalFollowersShort() {
            return this.creatorDetail.totalFollowersShort();
        },
        totalArtworksShort() {
            return this.creatorDetail.totalArtworksShort();
        },
    },
    methods: {
        toggleFollow() {
            // Based on the isFollowed flag to trigger different method.
            if (this.isFollowed) {
                this.removeFromFollowList();
            } else {
                this.addToFollowList();
            }
        },
        async addToFollowList() {
            this.isProcessing = true;

            const result = await FollowCreatorApiHandler.addToFollowAsync(
                this.creatorId,
                this.bearerAccessToken
            );

            if (result) {
                this.isFollowed = true;

                NotificationHelper.notifySuccess("Theo dõi thành công");
            } else {
                NotificationHelper.notifySuccess("Có gì đó không ổn...");
            }

            this.isProcessing = false;
        },
        async removeFromFollowList() {
            this.isProcessing = true;

            const result = await FollowCreatorApiHandler.removeFollowAsync(
                this.creatorId,
                this.bearerAccessToken
            );

            if (result) {
                this.isFollowed = false;

                NotificationHelper.notifySuccess("Hủy theo dõi thành công");
            } else {
                NotificationHelper.notifySuccess("Có gì đó không ổn...");
            }

            this.isProcessing = false;
        },
    },
};
</script>

<style scoped>
.followed-creator-card {
    --width: 176px;

    width: var(--width);
}
</style>
