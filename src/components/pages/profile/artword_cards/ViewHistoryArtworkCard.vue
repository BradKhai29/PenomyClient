<template>
    <div class="row shadow-1 border-radius-sm">
        <router-link :to="artworkLink" class="relative-position underline-none">
            <!-- Star rates section -->
            <div class="star-rates-section">
                <span
                    class="bg-dark border-radius-top-left-sm border-radius-bottom-right-sm text-light q-px-sm q-py-xs flex items-center"
                >
                    <q-icon name="star" size="xs" />
                    <span class="q-ml-xs">{{ averageStarRates }}</span>
                </span>
            </div>
            <!-- Star rates section -->

            <!-- Origin section -->
            <div class="q-pa-sm artwork-origin-section border-radius-sm">
                <span
                    v-if="isCompleted"
                    class="bg-primary text-dark border-radius-sm flex items-center"
                    style="padding: 2.4px 4px"
                >
                    <span class="q-mr-xs">end</span>
                    <q-icon name="check" size="xs" />
                </span>

                <q-img
                    class="q-ml-sm border-radius-sm shadow-1 metadata-badge"
                    :src="originImageUrl"
                />
            </div>
            <!-- Origin section -->

            <!-- Artwork image section -->
            <q-img
                :src="thumbnailUrl"
                class="recently-updated-artwork-image shadow-1 border-radius-sm"
            />
            <!-- Artwork image section -->
        </router-link>
        <div class="q-pa-sm q-pl-md col-grow column bg-light-100">
            <router-link
                :to="artworkLink"
                class="flex items-center justify-between text-dark underline-none"
            >
                <span
                    class="text-subtitle1 text-weight-bold col-grow artwork-title"
                >
                    {{ title }}
                </span>
                <q-icon name="palette" size="xs" />
            </router-link>

            <router-link
                :to="creatorProfileLink"
                class="underline-none text-light flex items-center q-my-xs"
            >
                <q-avatar size="sm">
                    <img
                        :src="
                            creatorAvatarUrl ??
                            'https://cdn.quasar.dev/img/avatar.png'
                        "
                    />
                </q-avatar>
                <span
                    class="creator-name-text q-ml-sm text-subtitle1 creator-nickname text-dark-500"
                >
                    {{ creatorName ?? "Default" }}
                </span>
            </router-link>

            <div class="recommended-chapters-section q-my-xs">
                <router-link
                    :to="chapterLink(lastViewedChapter.id)"
                    class="underline-none text-light flex items-center text-subtitle2"
                >
                    <span class="text-weight-bold text-dark">
                        Tập {{ lastViewedChapter.uploadOrder }}
                    </span>
                    <span class="text-dark-500 q-ml-auto">
                        {{ lastViewedAt }}
                    </span>
                </router-link>
            </div>

            <div class="q-mt-auto flex items-center justify-between">
                <q-btn
                    :to="artworkLink"
                    no-caps
                    dense
                    flat
                    class="text-subtitle2 bg-dark text-light border-radius-sm q-px-sm"
                >
                    Xem ngay
                </q-btn>

                <q-btn dense flat unelevated @click="showDialog = true">
                    <q-icon name="delete" />
                </q-btn>
            </div>
        </div>

        <!-- Remove history item popup -->
        <q-dialog v-model="showDialog">
            <q-card>
                <q-card-section>
                    <div class="text-subtitle1">{{ title }}</div>
                </q-card-section>
                <q-card-section class="row items-center q-py-none">
                    <q-avatar
                        icon="history"
                        color="primary"
                        text-color="dark"
                        size="lg"
                    />
                    <span class="q-ml-sm text-subtitle1">
                        Xóa khỏi lịch sử xem ?
                    </span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn
                        flat
                        no-caps
                        label="Hủy"
                        color="dark"
                        v-close-popup
                        class="text-subtitle1"
                        :disable="isProcessing"
                    />
                    <q-btn
                        flat
                        no-caps
                        label="Xác nhận xóa"
                        color="primary"
                        class="text-subtitle1 text-weight-bold"
                        @click="removeHistoryItem"
                        :disable="isProcessing"
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <!-- Remove history item dialog -->
    </div>
</template>

<script>
// Import dependencies section.
import { Art5RouteNames } from "src/router/artwork/Artwork5PageRoute";
import { CreatorProfile1RouteNames } from "src/router/creatorProfile/CreatorProfile1PageRoute";
import { ViewHistoryArtworkResponseItem } from "src/api.models/artwork/common/ViewHistoryArtworkResponseItem";
import { ViewHistoryApiHandler } from "src/api.handlers/artwork/common/ViewHistoryApiHandler";
import { useAuthStore } from "src/stores/common/AuthStore";
import { useGuestStore } from "src/stores/common/GuestStore";
import { NotificationHelper } from "src/helpers/NotificationHelper";

// Init store for later operation.
const authStore = useAuthStore();
const guestStore = useGuestStore();

export default {
    name: "ViewHistoryArtworkCard",
    emits: ["removeItem"],
    props: {
        isComic: {
            type: Boolean,
            default: true,
        },
        artworkDetail: {
            type: ViewHistoryArtworkResponseItem,
            required: true,
        },
    },
    data() {
        return {
            isProcessing: false,
            showDialog: false,
        };
    },
    computed: {
        artworkId() {
            return this.artworkDetail.id;
        },
        artworkLink() {
            if (this.isComic) {
                return `/artwork/comic/${this.artworkId}`;
            }

            return `/artwork/anime/${this.artworkId}`;
        },
        isCompleted() {
            return false;
        },
        title() {
            return this.artworkDetail.title;
        },
        thumbnailUrl() {
            return this.artworkDetail.thumbnailUrl;
        },
        averageStarRates() {
            return this.artworkDetail.averageStarRates;
        },
        originImageUrl() {
            return this.artworkDetail.originImageUrl;
        },
        creatorProfileLink() {
            return {
                name: CreatorProfile1RouteNames.profileDetail,
                params: {
                    creatorId: this.artworkDetail.creatorId,
                },
            };
        },
        creatorName() {
            return this.artworkDetail.creatorName;
        },
        creatorAvatarUrl() {
            return this.artworkDetail.creatorAvatarUrl;
        },
        lastViewedChapter() {
            return this.artworkDetail.chapter;
        },
        lastViewedAt() {
            return this.artworkDetail.chapter.getShortViewedAt();
        },
    },
    methods: {
        /**
         * Return a corresponding chapter link with input chapter id.
         */
        chapterLink(chapterId) {
            if (this.isComic) {
                return {
                    name: Art5RouteNames.ComicChapterDetail,
                    params: {
                        comicId: this.artworkDetail.id,
                        chapterId: chapterId,
                    },
                };
            }

            return {
                name: Art5RouteNames.ComicChapterDetail,
                params: {
                    comicId: this.artworkDetail.id,
                    chapterId: chapterId,
                },
            };
        },
        async removeHistoryItem() {
            this.isProcessing = true;
            let removeResult = true;

            if (authStore.isAuth) {
                removeResult =
                    await ViewHistoryApiHandler.removeUserHistoryItemAsync(
                        this.artworkId
                    );
            }
            // If current user is not authenticated, then resolve as a guest user.
            else {
                removeResult =
                    await ViewHistoryApiHandler.removeGuestHistoryItemAsync(
                        guestStore.guestId,
                        this.artworkId
                    );
            }

            // Notify the message for the user.
            if (removeResult) {
                NotificationHelper.notifySuccess("Đã xóa thành công");

                // Emit removeItem event.
                this.$emit("removeItem", this.artworkId);
            } else {
                NotificationHelper.notifyError("Đã có lỗi xảy ra");
            }

            // Turn off the related flags.
            this.showDialog = false;
            this.isProcessing = false;
        },
    },
};
</script>

<style scoped>
.recently-updated-artwork-image {
    --min-width: 140px;
    --ratio: 0.788;
    --height: calc(var(--min-width) / var(--ratio));

    min-width: var(--min-width);
    height: var(--height);
}

/* Artwork card metadata section */
.star-rates-section {
    position: absolute !important;
    display: flex;
    z-index: 100 !important;
    top: 0;
    left: 0;
    width: 100%;
}

.artwork-origin-section {
    position: absolute !important;
    display: flex;
    justify-content: end;
    align-items: center;
    z-index: 102;
    bottom: 0 !important;
    left: 0 !important;
    width: 100%;
}

.artwork-title {
    max-width: 136px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.creator-name-text {
    max-width: 120px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
