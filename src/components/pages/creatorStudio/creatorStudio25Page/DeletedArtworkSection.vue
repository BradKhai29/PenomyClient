<template>
    <section :id="componentId" v-if="!isLoading">
        <div
            :id="`${componentId}_header`"
            class="flex justify-between items-center q-mb-sm"
        >
            <section
                :id="`${componentId}_header_interactions_buttons`"
                class="flex items-center"
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

                    <!-- Clear the bin button -->
                    <q-btn
                        @click="showClearBinDialog = true"
                        no-caps
                        dense
                        class="bg-secondary-900 text-light border-radius-sm shadow-1 q-px-sm text-subtitle1"
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
                                    Thao tác này không thể hoàn tác, đồng ý
                                    nghĩa các tác phẩm này sẽ bị xóa và
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
                                    label="Xác nhận dọn"
                                    color="negative"
                                    class="text-subtitle1 text-weight-bold"
                                    @click="confirmClearBin"
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
                        class="bg-light-300 text-dark border-radius-sm shadow-1 q-ml-sm q-px-sm text-subtitle1"
                    >
                        <q-icon
                            name="restore_page"
                            class="text-primary"
                            size="sm"
                        />
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
                                    @click="confirmClearBin"
                                    :disable="isProcessing"
                                />
                            </q-card-actions>
                        </q-card>
                    </q-dialog>
                    <!-- Restore all dialog -->
                </div>
            </section>

            <section v-if="hasSelectedItems" id="selected-items-section">
                <q-btn
                    no-caps
                    dense
                    class="q-ml-auto bg-light text-dark border-radius-sm shadow-1 q-ml-sm q-px-sm text-subtitle1"
                >
                    <span class="text-primary text-weight-bold">{{
                        totalSelectedItems
                    }}</span>
                    <span class="q-ml-sm">Đã chọn</span>

                    <q-menu :offset="[0, 6.4]" fit>
                        <q-list class="text-subtitle1" style="min-width: 120px">
                            <q-item clickable v-close-popup>
                                <q-item-section
                                    @click="showRestoreSelectedDialog = true"
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
                                <q-badge class="bg-secondary-900 text-light">
                                    <q-icon name="delete_forever" size="sm" />
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
                                Thao tác này không thể hoàn tác, đồng ý nghĩa
                                các tác phẩm này sẽ bị xóa và
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
    </section>
</template>

<script>
// Import dependencies section.
import { ArtworkTypes } from "src/api.handlers/creatorStudio/creatorStudio5Page/CreatorStudio5ApiHandler";
import { CreatorStudioDeletedManagerApiHandler } from "src/api.handlers/creatorStudio/common/CreatorStudioDeletedManagerApiHandler";
import { DeletedArtworkItemResponseDto } from "src/api.models/creatorStudio/creatorStudio25Page/DeletedArtworkItemResponseDto";
CreatorStudioDeletedManagerApiHandler;

// Import component sections.
import DeletedArtworkDetailCard from "./DeletedArtworkDetailCard.vue";

// Init store for later operation.
import { useCreatorStore } from "src/stores/common/CreatorStore";
import { useAuthStore } from "src/stores/common/AuthStore";
import { NotificationHelper } from "src/helpers/NotificationHelper";

const creatorStore = useCreatorStore();
const authStore = useAuthStore();

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
            // Indicate the artwork type to load for
            // this section based on the props (loadComic).
            const artworkTypeToLoad = this.loadComic
                ? ArtworkTypes.COMIC
                : ArtworkTypes.ANIMATION;

            const result =
                await CreatorStudioDeletedManagerApiHandler.getAllTempRemovedItemsByArtworkTypeAsync(
                    artworkTypeToLoad
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
        handleRestoreOrRemoveItem(artworkId) {
            const foundIndex = this.displayArtworks.findIndex(
                (item) => item.id == artworkId
            );

            const notFoundIndex = -1;
            if (foundIndex == notFoundIndex) {
                return;
            }

            // Remove the items from the display artwork list.
            this.displayArtworks.splice(foundIndex, 1);

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

                if (this.loadComic) {
                    creatorStore.setTotalDeletedComics(
                        this.displayArtworks.length
                    );
                } else {
                    creatorStore.setTotalDeletedAnimes(
                        this.displayArtworks.length
                    );
                }

                NotificationHelper.notifySuccess("Khôi phục thành công");
            } else {
                NotificationHelper.notifyError("Có lỗi xảy ra khi gọi API");
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

                // Clear the selected artworkId list.
                const length = this.selectedArtworkIds.length;
                this.selectedArtworkIds.splice(0, length);

                if (this.loadComic) {
                    creatorStore.setTotalDeletedComics(
                        this.displayArtworks.length
                    );
                } else {
                    creatorStore.setTotalDeletedAnimes(
                        this.displayArtworks.length
                    );
                }

                NotificationHelper.notifySuccess("Xóa vĩnh viễn thành công");
            } else {
                NotificationHelper.notifyError("Có lỗi xảy ra khi gọi API");
            }

            this.isProcessing = false;
        },
    },
};
</script>
