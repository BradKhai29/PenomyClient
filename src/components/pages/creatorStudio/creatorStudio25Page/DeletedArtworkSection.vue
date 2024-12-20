<template>
    <section :id="componentId" v-if="!isLoading">
        <div :id="`${componentId}_header`" class="q-mb-sm">
            <section
                v-if="hasDeletedItems"
                class="flex justify-between items-center q-pa-md bg-light-300 border-radius-sm q-mb-md"
            >
                <span class="text-subtitle1">
                    Các mục trong thùng rác sẽ tự động xóa vĩnh viễn sau
                    <strong>30</strong> ngày
                </span>

                <div class="flex items-center">
                    <!-- Clear the bin button -->
                    <q-btn
                        @click="showClearBinDialog = true"
                        no-caps
                        dense
                        unelevated
                        class="bg-secondary-900 text-light border-radius-sm q-px-sm text-subtitle1"
                    >
                        <q-icon name="delete_forever" size="sm" />
                        <span class="q-ml-xs">Dọn thùng rác</span>
                    </q-btn>
                    <!-- Clear the bin button -->

                    <!-- Clear the bin dialog -->
                    <q-dialog
                        id="clear-bin-dialog"
                        v-model="showClearBinDialog"
                    >
                        <q-card>
                            <q-card-section>
                                <div class="text-subtitle1 flex items-center">
                                    <q-badge
                                        class="bg-secondary-900 text-light"
                                    >
                                        <q-icon
                                            name="delete_forever"
                                            size="sm"
                                        />
                                    </q-badge>
                                    <span
                                        class="q-ml-sm text-weight-bold text-secondary-900"
                                    >
                                        Dọn sách thùng rác phần
                                        {{ artworkSection }}?
                                    </span>
                                </div>
                            </q-card-section>
                            <q-card-section
                                class="row items-center q-py-none"
                                style="max-width: 480px"
                            >
                                <div class="text-subtitle1 q-mb-md">
                                    Bạn có muốn hệ thống dọn sạch thùng rác ?
                                </div>
                                <div class="text-subtitle1">
                                    <strong>Lưu ý:</strong>
                                    Thao tác này không thể hoàn tác, các tác
                                    phẩm này sẽ bị xóa vĩnh viễn và
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
                                    label="Xác nhận xóa"
                                    color="negative"
                                    class="text-subtitle1 text-weight-bold"
                                    @click="clearTheBin"
                                    :disable="isProcessing"
                                />
                            </q-card-actions>
                        </q-card>
                    </q-dialog>
                    <!-- Clear the bin dialog -->

                    <!-- Restore all deleted items button -->
                    <q-btn
                        @click="showRestoreAllDialog = true"
                        no-caps
                        dense
                        unelevated
                        class="bg-primary text-dark border-radius-sm q-ml-sm q-px-sm text-subtitle1"
                    >
                        <q-icon name="restore_page" size="sm" />
                        <span class="q-ml-xs">Khôi phục tất cả</span>
                    </q-btn>
                    <!-- Restore all deleted items button -->

                    <!-- Restore all dialog -->
                    <q-dialog
                        id="clear-bin-dialog"
                        v-model="showRestoreAllDialog"
                    >
                        <q-card>
                            <q-card-section>
                                <div class="text-subtitle1 flex items-center">
                                    <q-badge class="bg-primary text-light">
                                        <q-icon name="restore_page" size="sm" />
                                    </q-badge>
                                    <span
                                        class="q-ml-sm text-weight-bold text-primary"
                                    >
                                        Khôi phục phần {{ artworkSection }}?
                                    </span>
                                </div>
                            </q-card-section>
                            <q-card-section
                                class="row items-center q-py-none"
                                style="max-width: 480px"
                            >
                                <div class="text-subtitle1">
                                    Bạn có muốn hệ thống khôi phục lại tất cả
                                    các tác phẩm bị tạm xóa ở mục truyện tranh ?
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
                                    @click="restoreAllItems"
                                    :disable="isProcessing"
                                />
                            </q-card-actions>
                        </q-card>
                    </q-dialog>
                    <!-- Restore all dialog -->
                </div>
            </section>

            <section
                :id="`${componentId}_header_interactions_buttons`"
                class="flex items-center justify-between"
            >
                <div
                    v-if="hasDeletedItems"
                    id="action-button-group"
                    class="flex items-center"
                >
                    <q-btn
                        @click="debug"
                        no-caps
                        dense
                        unelevated
                        class="q-mr-sm bg-dark text-light border-radius-sm q-px-sm text-subtitle1"
                    >
                        Tạm xóa: {{ totalDeletedItems }}
                    </q-btn>
                </div>

                <div v-if="hasSelectedItems" id="selected-items-section">
                    <q-btn
                        no-caps
                        dense
                        class="q-ml-auto bg-light-300 text-dark border-radius-sm q-ml-sm q-px-sm text-subtitle1"
                    >
                        <span class="text-primary text-weight-bold">{{
                            totalSelectedItems
                        }}</span>
                        <span class="q-ml-sm">Đã chọn</span>

                        <q-menu :offset="[0, 6.4]" fit>
                            <q-list
                                class="text-subtitle1"
                                style="min-width: 120px"
                            >
                                <q-item clickable v-close-popup>
                                    <q-item-section
                                        @click="
                                            showRestoreSelectedDialog = true
                                        "
                                    >
                                        Khôi phục
                                    </q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup>
                                    <q-item-section
                                        @click="showRemoveSelectedDialog = true"
                                    >
                                        Xóa vĩnh viễn
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-btn>

                    <!-- Restore selected items dialog -->
                    <q-dialog
                        id="clear-bin-dialog"
                        v-model="showRestoreSelectedDialog"
                    >
                        <q-card>
                            <q-card-section>
                                <div class="text-subtitle1 flex items-center">
                                    <q-badge class="bg-primary text-light">
                                        <q-icon name="restore_page" size="sm" />
                                    </q-badge>
                                    <span
                                        class="q-ml-sm text-weight-bold text-primary"
                                    >
                                        Khôi phục lại mục đã chọn
                                    </span>
                                </div>
                            </q-card-section>
                            <q-card-section
                                class="row items-center q-py-none"
                                style="max-width: 480px"
                            >
                                <div class="text-subtitle1">
                                    Bạn có muốn hệ thống khôi phục lại
                                    <strong class="text-primary">
                                        {{ totalSelectedItems }}
                                    </strong>
                                    mục bạn đã chọn?
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
                                    @click="restoreSelectedItems"
                                    :disable="isProcessing"
                                    :loading="isProcessing"
                                />
                            </q-card-actions>
                        </q-card>
                    </q-dialog>
                    <!-- Restore selected items dialog -->

                    <!-- Remove selected items dialog -->
                    <q-dialog
                        id="clear-bin-dialog"
                        v-model="showRemoveSelectedDialog"
                    >
                        <q-card>
                            <q-card-section>
                                <div class="text-subtitle1 flex items-center">
                                    <q-badge
                                        class="bg-secondary-900 text-light"
                                    >
                                        <q-icon
                                            name="delete_forever"
                                            size="sm"
                                        />
                                    </q-badge>
                                    <span
                                        class="q-ml-sm text-weight-bold text-secondary-900"
                                    >
                                        Xóa vĩnh viễn mục đã chọn
                                    </span>
                                </div>
                            </q-card-section>
                            <q-card-section
                                class="row items-center q-py-none"
                                style="max-width: 480px"
                            >
                                <div class="text-subtitle1 q-mb-md">
                                    Bạn có muốn hệ thống xóa vĩnh viễn
                                    <strong class="text-secondary-900">
                                        {{ totalSelectedItems }}
                                    </strong>
                                    mục bạn đã chọn??
                                </div>
                                <div class="text-subtitle1">
                                    <strong>Lưu ý:</strong>
                                    Thao tác này không thể hoàn tác, các tác
                                    phẩm này sẽ bị xóa vĩnh viễn và
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
                                    :loading="isProcessing"
                                    :disable="isProcessing"
                                />
                                <q-btn
                                    flat
                                    no-caps
                                    label="Xác nhận xóa"
                                    color="negative"
                                    class="text-subtitle1 text-weight-bold"
                                    @click="removeSelectedItems"
                                    :disable="isProcessing"
                                />
                            </q-card-actions>
                        </q-card>
                    </q-dialog>
                    <!-- Remove selected items dialog -->
                </div>
            </section>
        </div>
        <section
            v-if="hasDeletedItems"
            id="display-artwork-section"
            class="q-mt-md"
        >
            <div
                v-for="(artwork, index) in displayArtworks"
                :key="artwork.id"
                class="artwork-card-wrapper q-mb-md"
            >
                <DeletedArtworkDetailCard
                    :artworkDetail="artwork"
                    :isComic="loadComic"
                    :itemOrder="index + 1"
                    @removeItem="handleRestoreOrRemoveItem"
                    @restoreItem="handleRestoreOrRemoveItem"
                    @toggleItem="handleToggleItem"
                />
            </div>
        </section>

        <section
            v-else
            id="empty-artwork-section"
            class="q-mt-xl text-center text-dark-500"
        >
            <q-icon name="hide_source" size="128px" />
            <p class="text-h6">Không có gì trong thùng rác</p>
        </section>
    </section>
</template>

<script>
// Import dependencies section.
import { ArtworkTypes } from "src/api.handlers/creatorStudio/creatorStudio5Page/CreatorStudio5ApiHandler";
import { CreatorStudioDeletedManagerApiHandler } from "src/api.handlers/creatorStudio/common/CreatorStudioDeletedManagerApiHandler";
import { DeletedArtworkItemResponseDto } from "src/api.models/creatorStudio/creatorStudio25Page/DeletedArtworkItemResponseDto";
CreatorStudioDeletedManagerApiHandler;
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { ArrayHelper } from "src/helpers/ArrayHelper";

// Import component sections.
import DeletedArtworkDetailCard from "./DeletedArtworkDetailCard.vue";

// Init store for later operation.
import { useCreatorStore } from "src/stores/common/CreatorStore";

const creatorStore = useCreatorStore();

export default {
    name: "DeletedArtworkSection",
    components: {
        DeletedArtworkDetailCard,
    },
    props: {
        /**
         * Indicate this artwork section to load artwork of type comic or animation.
         *
         * @note The default value (loadComic = true) to load the comic.
         */
        loadComic: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            isLoading: true,
            componentId: null,
            showClearBinDialog: false,
            showRestoreAllDialog: false,
            showRestoreSelectedDialog: false,
            showRemoveSelectedDialog: false,
            /**
             * Indicate that the current component is
             * waiting for the webapi to process the request.
             * @note The default value is (false).
             */
            isProcessing: false,
            /**
             * The list of artworks that will be displayed when pagination.
             *
             * @type {DeletedArtworkItemResponseDto[]} The type of artwork list.
             */
            displayArtworks: [],
            /**
             * @type {Number[]} Contains the list of artwork ids that selected by user
             * for the remove/restore operation.
             */
            selectedArtworkIds: [],
        };
    },
    computed: {
        hasDeletedItems() {
            return this.displayArtworks.length > 0;
        },
        hasSelectedItems() {
            return this.selectedArtworkIds.length > 0;
        },
        totalSelectedItems() {
            return this.selectedArtworkIds.length;
        },
        totalDeletedItems() {
            return this.displayArtworks.length;
        },
        artworkSection() {
            return this.loadComic ? "truyện tranh" : "hoạt hình";
        },
        /**
         * Indicate the artwork type to load for
         * this section based on the props (loadComic).
         */
        currentArtworkType() {
            if (this.loadComic) {
                return ArtworkTypes.COMIC;
            }

            return ArtworkTypes.ANIMATION;
        },
    },
    async mounted() {
        // Set the component id based on the props (loadComic).
        if (this.loadComic) {
            this.componentId = "comic_section";
        } else {
            this.componentId = "animation_section";
        }

        // Turn on the flags to load the needed states for this components.
        this.isLoading = true;

        // Load the temporarily removed artworks.
        await this.getTempRemovedItemsAsync();

        // Turn off the flags after loading success.
        this.isLoading = false;
    },
    methods: {
        async getTempRemovedItemsAsync() {
            const result =
                await CreatorStudioDeletedManagerApiHandler.getAllTempRemovedItemsByArtworkTypeAsync(
                    this.currentArtworkType
                );

            if (result) {
                this.displayArtworks.push(...result);
            }
        },
        debug() {
            console.log("Selected ArtworkIds:", this.selectedArtworkIds);
        },
        handleToggleItem(artworkId, isSelected) {
            if (isSelected) {
                this.selectedArtworkIds.push(artworkId);
            }
            // Remove the item when user does not select.
            else {
                const itemIndex = this.selectedArtworkIds.findIndex(
                    (id) => id == artworkId
                );

                this.selectedArtworkIds.splice(itemIndex, 1);
            }
        },
        /**
         * @param {Number} artworkId Id of the artwork item to restore/remove.
         * @param {Boolean} fromEmitEvent Indicate to call this method when the component emit event.
         */
        handleRestoreOrRemoveItem(artworkId, fromEmitEvent = false) {
            const foundIndex = this.displayArtworks.findIndex(
                (item) => item.id == artworkId
            );

            const notFoundIndex = -1;

            // Handle for display list first.
            if (foundIndex != notFoundIndex) {
                // Remove the items from the display artwork list.
                this.displayArtworks.splice(foundIndex, 1);
                this.updateStoreState();
            }

            // Call this section only when this method is invoked by listen to emit event.
            if (fromEmitEvent) {
                const selectedIdIndex = this.selectedArtworkIds.findIndex(
                    (id) => id == artworkId
                );

                if (selectedIdIndex != notFoundIndex) {
                    this.selectedArtworkIds.splice(selectedIdIndex, 1);
                }
            }
        },
        updateStoreState() {
            if (this.loadComic) {
                creatorStore.setTotalDeletedComics(this.displayArtworks.length);
            } else {
                creatorStore.setTotalDeletedAnimes(this.displayArtworks.length);
            }
        },
        async restoreSelectedItems() {
            this.isProcessing = true;

            const restoreResult =
                await CreatorStudioDeletedManagerApiHandler.restoreSelectedArtworksAsync(
                    this.selectedArtworkIds
                );

            this.showRestoreSelectedDialog = false;

            if (restoreResult) {
                this.selectedArtworkIds.forEach((artworkId) =>
                    this.handleRestoreOrRemoveItem(artworkId)
                );

                ArrayHelper.clear(this.selectedArtworkIds);

                NotificationHelper.notifySuccess("Khôi phục thành công");
            } else {
                NotificationHelper.notifyError("Có gì đó không ổn...");
            }

            this.isProcessing = false;
        },
        async removeSelectedItems() {
            this.isProcessing = true;

            const removeResult =
                await CreatorStudioDeletedManagerApiHandler.removeSelectedArtworksAsync(
                    this.selectedArtworkIds
                );

            this.showRemoveSelectedDialog = false;

            if (removeResult) {
                this.selectedArtworkIds.forEach((artworkId) =>
                    this.handleRestoreOrRemoveItem(artworkId)
                );

                ArrayHelper.clear(this.selectedArtworkIds);

                NotificationHelper.notifySuccess("Xóa vĩnh viễn thành công");
            } else {
                NotificationHelper.notifyError("Có gì đó không ổn...");
            }

            this.isProcessing = false;
        },
        async clearTheBin() {
            this.isProcessing = true;
            this.showClearBinDialog = false;

            const result =
                await CreatorStudioDeletedManagerApiHandler.removeAllTempRemovedItemsAsync(
                    this.currentArtworkType
                );

            if (result) {
                // Reset the display list and the store state when operation is success
                ArrayHelper.clear(this.displayArtworks);
                ArrayHelper.clear(this.selectedArtworkIds);

                this.updateStoreState();

                NotificationHelper.notifySuccess(
                    "Dọn sạch thùng rác thành công"
                );
            } else {
                NotificationHelper.notifySuccess("Có gì đó không ổn...");
            }

            this.isProcessing = false;
        },
        async restoreAllItems() {
            this.isProcessing = true;
            this.showRestoreAllDialog = false;

            const result =
                await CreatorStudioDeletedManagerApiHandler.restoreAllTempRemovedItemsAsync(
                    this.currentArtworkType
                );

            if (result) {
                // Reset the display list and the store state when operation is success
                ArrayHelper.clear(this.displayArtworks);
                ArrayHelper.clear(this.selectedArtworkIds);

                this.updateStoreState();

                NotificationHelper.notifySuccess("Khôi phục tất cả thành công");
            } else {
                NotificationHelper.notifySuccess("Có gì đó không ổn...");
            }

            this.isProcessing = false;
        },
    },
};
</script>
