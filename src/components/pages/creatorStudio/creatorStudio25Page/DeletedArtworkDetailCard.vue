<template>
    <div
        :id="componentId"
        class="q-pa-md artwork-detail-card row"
        :class="isSelected ? 'selected' : ''"
        @click="toggleArtworkCard"
    >
        <div class="col-auto q-mr-md relative-position">
            <q-img
                class="artwork-detail-img shadow-1 border-radius-sm"
                :class="isSelected ? 'selected' : ''"
                :src="thumbnailUrl"
            />
            <div
                class="absolute q-pa-sm"
                style="bottom: 0; right: 0; z-index: 100"
            >
                <q-icon
                    class="bg-dark text-light shadow-1 border-radius-sm q-mr-sm metadata-badge"
                    :name="isComic ? 'palette' : 'videocam'"
                    size="xs"
                />
            </div>
        </div>
        <section class="col-grow artwork-detail-section q-my-xs text-dark">
            <section class="flex justify-between">
                <div
                    class="artwork-metadata flex q-gutter-sm text-subtitle1 text-dark"
                >
                    <q-btn
                        dense
                        no-caps
                        unelevated
                        class="artwork-star-rate bg-light-300 shadow-1"
                    >
                        <q-icon name="star" size="sm" />
                        <span class="q-ml-xs text-subtitle1">
                            {{ averageStarRate }} ({{ totalUsersRated }})
                        </span>
                    </q-btn>
                    <q-btn
                        dense
                        no-caps
                        unelevated
                        class="artwork-status bg-light-300 shadow-1"
                    >
                        <q-icon name="timelapse" size="sm" />
                        <span class="q-ml-xs text-subtitle1">Còn cập nhật</span>
                    </q-btn>
                    <q-btn
                        dense
                        no-caps
                        unelevated
                        class="artwork-public-level bg-light-300 shadow-1"
                    >
                        <q-icon :name="publicLevelRef.icon" size="sm" />
                        <span class="q-ml-xs text-subtitle1">
                            {{ publicLevelRef.title }}
                        </span>
                    </q-btn>
                </div>
                <div
                    class="action-button-group flex q-gutter-sm text-subtitle1"
                >
                    <q-btn
                        @click="showRestorePopup"
                        dense
                        no-caps
                        class="other-actions-btn bg-primary text-dark"
                    >
                        <q-icon name="restore_page" size="xs" />
                    </q-btn>
                    <q-btn
                        @click="showRemovePopup"
                        dense
                        no-caps
                        class="other-actions-btn bg-secondary-900 text-light"
                    >
                        <q-icon name="delete_forever" size="xs" />
                    </q-btn>
                </div>
            </section>
            <div class="artwork-title q-mt-md">
                <q-btn dense flat no-caps class="text-h6 text-dark">
                    <q-badge class="q-mr-sm q-py-xs bg-dark text-light">
                        {{ itemOrder }}
                    </q-badge>
                    {{ title }}
                </q-btn>
            </div>
            <div class="artwork-total-chapters text-subtitle1 q-mt-sm">
                <span class="q-mr-xs">Số tập đã xuất bản:</span>
                <span class="text-weight-bold">{{ totalChapters }}</span>
            </div>
            <section class="row text-subtitle2 q-mt-md">
                <div class="col-12 col-md-6">
                    <span class="q-mr-xs">Xóa lúc:</span>
                    <span class="text-weight-bold">{{ formatCreatedAt }}</span>
                </div>
            </section>
            <div></div>
        </section>
    </div>
    <!-- Permanently remove dialog -->
    <q-dialog id="clear-bin-dialog" v-model="showRemoveDialog">
        <q-card>
            <q-card-section>
                <div class="text-subtitle1 flex items-center">
                    <q-badge class="bg-secondary-900 text-light">
                        <q-icon name="delete_forever" size="sm" />
                    </q-badge>
                    <span class="q-ml-sm text-weight-bold text-secondary-900">
                        Xóa vĩnh viễn?
                    </span>
                </div>
            </q-card-section>
            <q-card-section class="q-py-none">
                <div class="text-subtitle1 q-mb-md">
                    <p class="q-ma-none">
                        Bạn có muốn hệ thống xóa vĩnh viễn tác phẩm:
                    </p>
                    <div
                        class="q-pa-sm bg-light-300 border-radius-sm text-weight-bold text-secondary-900"
                    >
                        {{ title }}
                    </div>
                </div>
                <div class="text-subtitle1">
                    <strong>Lưu ý:</strong>
                    Thao tác này không thể hoàn tác, đồng ý nghĩa tác phẩm này
                    sẽ bị xóa và
                    <strong>không thể khôi phục trở lại</strong>
                </div>
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
                    label="Xóa vĩnh viễn"
                    color="negative"
                    class="text-subtitle1 text-weight-bold"
                    @click="removeItemAsync"
                    :disable="isProcessing"
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
    <!-- Permanently remove dialog -->

    <!-- Restore item dialog -->
    <q-dialog id="clear-bin-dialog" v-model="showRestoreDialog">
        <q-card>
            <q-card-section>
                <div class="text-subtitle1 flex items-center">
                    <q-badge class="bg-primary text-light">
                        <q-icon name="restore_page" size="sm" />
                    </q-badge>
                    <span class="q-ml-sm text-weight-bold text-primary">
                        Khôi phục tác phẩm
                    </span>
                </div>
            </q-card-section>
            <q-card-section
                class="row items-center q-py-none"
                style="max-width: 480px"
            >
                <div class="text-subtitle1 q-mb-md">
                    <p class="q-ma-none">
                        Bạn có muốn hệ thống khôi phục lại tác phẩm:
                    </p>
                    <div
                        class="q-pa-sm bg-light-300 border-radius-sm text-weight-bold text-primary"
                    >
                        {{ title }}
                    </div>
                </div>
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
                    label="Khôi phục"
                    class="text-subtitle1 text-weight-bold text-primary"
                    @click="restoreItemAsync"
                    :disable="isProcessing"
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
    <!-- Restore item dialog -->
</template>

<script>
import { DateTimeHelper } from "src/helpers/DateTimeHelper";
import { ArtworkPublicLevelHelper } from "src/helpers/ArtworkPublicLevelHelper";
import { CreatorStudio8ApiHandler } from "src/api.handlers/creatorStudio/creatorStudio8Page/CreatorStudio8ApiHandler";
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { DeletedArtworkItemResponseDto } from "src/api.models/creatorStudio/creatorStudio25Page/DeletedArtworkItemResponseDto";
import { CreatorStudioDeletedManagerApiHandler } from "src/api.handlers/creatorStudio/common/CreatorStudioDeletedManagerApiHandler";

export default {
    emits: ["removeItem", "restoreItem", "toggleItem"],
    name: "DeletedArtworkDetailCard",
    props: {
        artworkDetail: {
            type: DeletedArtworkItemResponseDto,
            required: true,
        },
        itemOrder: {
            type: Number,
            default: 1,
        },
        isComic: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            isSelected: false,
            ignoreToggle: false,
            showRestoreDialog: false,
            showRemoveDialog: false,
            formatCreatedAt: null,
            publicLevelRef: {
                icon: null,
                title: null,
            },
            artworkStatusRef: {
                icon: null,
                title: null,
            },
            isProcessing: false,
        };
    },
    computed: {
        id() {
            return this.artworkDetail.id;
        },
        componentId() {
            return `artwork_${this.id}`;
        },
        title() {
            return this.artworkDetail.title;
        },
        thumbnailUrl() {
            return this.artworkDetail.thumbnailUrl;
        },
        artworkStatus() {
            return this.artworkDetail.artworkStatus;
        },
        publicLevel() {
            return this.artworkDetail.publicLevel;
        },
        totalUsersRated() {
            return this.artworkDetail.totalUsersRated;
        },
        averageStarRate() {
            return this.artworkDetail.averageStarRate;
        },
        totalChapters() {
            return this.artworkDetail.totalChapters;
        },
        removedAt() {
            return this.artworkDetail.removedAt;
        },
    },
    mounted() {
        // Format the ISO datetime string received from API and display.
        this.formatCreatedAt = DateTimeHelper.formatISODate(this.removedAt);

        const publicLevelItem = ArtworkPublicLevelHelper.getPublicLevelItem(
            this.publicLevel
        );
        this.publicLevelRef.icon = publicLevelItem.icon;
        this.publicLevelRef.title = publicLevelItem.title;
    },
    methods: {
        showRemovePopup() {
            this.preventToggleArtworkCard();

            this.showRemoveDialog = true;
        },
        showRestorePopup() {
            this.preventToggleArtworkCard();

            this.showRestoreDialog = true;
        },
        preventToggleArtworkCard() {
            this.ignoreToggle = true;

            // Turn off ignore toggle to toggle the artwork card normally.
            const STOP_PREVENT_TOGGLE_TIMEOUT = 50;

            setTimeout(() => {
                this.ignoreToggle = false;
            }, STOP_PREVENT_TOGGLE_TIMEOUT);
        },
        /**
         * Toggle the artwork card to select item for operation.
         */
        toggleArtworkCard() {
            if (this.ignoreToggle) {
                return;
            }

            this.isSelected = !this.isSelected;

            // Emit the event when toggle the item.
            this.$emit("toggleItem", this.id, this.isSelected);
        },
        async restoreItemAsync() {
            const restoreResult =
                await CreatorStudioDeletedManagerApiHandler.restoreSelectedArtworksAsync(
                    [this.id]
                );

            if (restoreResult) {
                this.$emit("restoreItem", this.id);

                NotificationHelper.notifySuccess(
                    "Khôi phục tác phẩm thành công"
                );

                return;
            }

            NotificationHelper.notifyError("Có lỗi xảy ra khi gọi API");
        },
        async removeItemAsync() {
            const removeResult =
                await CreatorStudioDeletedManagerApiHandler.removeSelectedArtworksAsync(
                    [this.id]
                );

            if (removeResult) {
                this.$emit("removeItem", this.id);

                NotificationHelper.notifySuccess(
                    "Xóa vĩnh viễn tác phẩm thành công"
                );

                return;
            }

            NotificationHelper.notifyError("Có lỗi xảy ra khi gọi API");
        },
    },
};
</script>

<style scoped>
.artwork-detail-card {
    --light-500: #dddddd;

    border: 1px solid var(--light-500);
    border-radius: 4px;
}

.selected {
    --primary: #53bf94;
    --primary-700-opacity-12: #e5f3ef;

    background-color: var(--primary-700-opacity-12) !important;
    border: 1px solid var(--primary);
}

.artwork-detail-card:hover {
    cursor: pointer;
    background-color: #ecedef;
}

.artwork-detail-img {
    --height: 240px;
    --width: 186px;

    height: var(--height);
    width: var(--width);
}

.artwork-metadata > *,
.action-button-group > * {
    display: flex !important;
    align-items: center !important;
    padding: 4px 8px !important;
    border-radius: 4px !important;
}
</style>
