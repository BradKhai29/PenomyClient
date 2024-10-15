<template>
    <div class="q-pa-md artwork-detail-card row">
        <div class="col-auto q-mr-md">
            <q-img
                class="artwork-detail-img shadow-1 border-radius-sm"
                :src="thumbnailUrl"
            />
        </div>
        <section class="col-grow artwork-detail-section q-my-xs">
            <section class="flex justify-between">
                <div class="artwork-metadata flex q-gutter-sm text-subtitle1">
                    <q-btn
                        dense
                        no-caps
                        unelevated
                        class="artwork-star-rate bg-light-300"
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
                        class="artwork-status bg-light-300"
                    >
                        <q-icon name="timelapse" size="sm" />
                        <span class="q-ml-xs text-subtitle1">Còn cập nhật</span>
                    </q-btn>
                    <q-btn
                        dense
                        no-caps
                        unelevated
                        class="artwork-public-level bg-light-300"
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
                        dense
                        no-caps
                        class="add-chapter-btn bg-dark text-light"
                        @click="goToAddChapter"
                    >
                        <q-icon name="add" size="xs" />
                        <span class="q-ml-xs">Thêm tập</span>
                    </q-btn>
                    <q-btn
                        dense
                        no-caps
                        class="other-actions-btn bg-dark text-light"
                    >
                        <q-icon name="more_vert" size="xs" />

                        <q-menu :offset="[0, 6.4]" fit>
                            <q-list
                                dense
                                class="text-subtitle1"
                                style="min-width: 120px"
                            >
                                <q-item
                                    @click="goToEdit"
                                    clickable
                                    v-close-popup
                                >
                                    <q-item-section>Chỉnh sửa</q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup>
                                    <q-item-section @click="showDialog = true">
                                        Xóa
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-btn>
                </div>
            </section>
            <div class="artwork-title text-h6 q-mt-md">{{ title }}</div>
            <div class="artwork-total-chapters text-subtitle1 q-mt-sm">
                <span class="q-mr-xs">Số tập đã đăng:</span>
                <span class="text-weight-bold">{{ totalChapters }}</span>
            </div>
            <section class="row text-subtitle2 q-mt-md">
                <div class="col-12 col-md-6">
                    <span class="q-mr-xs">Ngày tạo:</span>
                    <span class="text-weight-bold">{{ formatCreatedAt }}</span>
                </div>
                <div class="col-12 col-md-6">
                    <span class="q-mr-xs">Cập nhật gần nhất:</span>
                    <span class="text-weight-bold">{{ formatUpdatedAt }}</span>
                </div>
            </section>
            <div></div>
        </section>
    </div>
    <q-dialog v-model="showDialog" persistent>
        <q-card>
            <q-card-section>
                <div class="text-h6">Tác phẩm: {{ title }}</div>
            </q-card-section>
            <q-card-section class="row items-center">
                <q-avatar icon="delete" color="primary" text-color="white" />
                <span class="q-ml-sm text-subtitle1">
                    Bạn xác nhận xóa tác phẩm này
                </span>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn
                    flat
                    no-caps
                    label="Hủy"
                    color="primary"
                    v-close-popup
                    class="text-subtitle1"
                />
                <q-btn
                    flat
                    no-caps
                    label="Xác nhận xóa"
                    color="primary"
                    class="text-subtitle1"
                    v-close-popup
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import { DateTimeHelper } from "src/helpers/DateTimeHelper";
import { ArtworkPublicLevelHelper } from "src/helpers/ArtworkPublicLevelHelper";

export default {
    props: {
        artworkId: {
            required: true,
        },
        title: {
            type: String,
            required: true,
            default: "Hello",
        },
        thumbnailUrl: {
            type: String,
            required: true,
            default:
                "https://fastly.picsum.photos/id/274/500/300.jpg?hmac=JQai5ZulqodPNmhQpK3-PAyGb2jFHjvmtFgIgBKOhBI",
        },
        artworkStatus: {
            type: Number,
            required: true,
        },
        publicLevel: {
            type: Number,
            required: true,
        },
        totalUsersRated: {
            type: Number,
            required: true,
        },
        averageStarRate: {
            type: Number,
            required: true,
        },
        totalChapters: {
            type: Number,
            required: true,
            default: 0,
        },
        updatedAt: {
            type: String,
            required: true,
        },
        createdAt: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            formatUpdatedAt: null,
            formatCreatedAt: null,
            publicLevelRef: {
                icon: null,
                title: null,
            },
            artworkStatusRef: {
                icon: null,
                title: null,
            },
            showDialog: false,
        };
    },
    mounted() {
        // Format the ISO datetime string received from API and display.
        this.formatCreatedAt = DateTimeHelper.formatISODate(this.createdAt);
        this.formatUpdatedAt = DateTimeHelper.formatISODate(this.updatedAt);

        const publicLevelItem = ArtworkPublicLevelHelper.getPublicLevelItem(
            this.publicLevel
        );
        this.publicLevelRef.icon = publicLevelItem.icon;
        this.publicLevelRef.title = publicLevelItem.title;
    },
    methods: {
        goToEdit() {
            this.$router.push(`/studio/comic/edit/${this.artworkId}`);
        },
        goToAddChapter() {
            this.$router.push({
                name: "create-chapter",
                query: { id: this.artworkId },
            });
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
