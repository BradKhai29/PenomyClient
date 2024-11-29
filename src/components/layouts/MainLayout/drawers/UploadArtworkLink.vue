<template>
    <DrawerLink
        v-if="isCreator"
        title="Đăng tải tác phẩm"
        icon="upload"
        :link="uploadArtworkLink"
        :isSelected="false"
    />
    <DrawerLink
        v-else
        title="Đăng tải tác phẩm"
        icon="upload"
        :isSelected="false"
        @click="showDialog = true"
    />

    <!-- Become creator information section -->
    <q-dialog v-if="!isCreator" v-model="showDialog">
        <q-card class="border-radius-md alert-dialog">
            <q-card-section class="flex items-center justify-between">
                <HeaderHighlight
                    label="Thông báo"
                    class="text-h6 text-weight-bold"
                />
                <q-btn
                    dense
                    round
                    unelevated
                    flat
                    class="bg-primary-700"
                    @click="showDialog = false"
                >
                    <q-icon name="close" class="text-dark" />
                </q-btn>
            </q-card-section>

            <q-card-section
                style="max-height: 64vh"
                class="q-pt-none text-subtitle1 scroll penomy-scrollbar"
            >
                <p v-if="isAuth" class="note-text">
                    Bạn chưa đăng ký trở thành <strong>nhà sáng tạo</strong> ,
                    vui lòng hoàn tất quá trình đăng ký để truy cập vào mục này.
                </p>
                <p v-else class="note-text">
                    Vui lòng đăng nhập vào hệ thống và hoàn tất phần đăng ký trở
                    thành <strong>nhà sáng tạo</strong> để truy cập vào mục này.
                </p>

                <div class="text-h6 text-weight-bold q-mb-sm">
                    Thông tin hỗ trợ
                </div>

                <section class="other-info-detail q-mb-md">
                    <!-- Community Policy section -->
                    <a
                        href="/terms/community-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-decoration-none"
                    >
                        <div
                            class="flex items-center q-mt-sm text-dark-900 text-subtitle1"
                            style="width: fit-content"
                        >
                            <q-icon name="groups" size="sm" />
                            <div class="q-ml-sm">
                                <span> Quy tắc cộng đồng của </span>
                                <strong class="text-primary">Penomy</strong>
                            </div>
                        </div>
                    </a>
                    <!-- Community Policy section -->

                    <!-- Content Policy section -->
                    <a
                        href="/terms/content-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-decoration-none"
                    >
                        <div
                            class="flex items-center q-mt-sm text-dark-900 text-subtitle1"
                            style="width: fit-content"
                        >
                            <q-icon name="policy" size="sm" />
                            <div class="q-ml-sm">
                                <span> Quy tắc nội dung của </span>
                                <strong class="text-primary">Penomy</strong>
                            </div>
                        </div>
                    </a>
                    <!-- Content Policy section -->

                    <!-- Creator Benefits section -->
                    <a
                        href="/terms/creator-benefits"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-decoration-none"
                    >
                        <div
                            class="flex items-center q-mt-sm text-dark-900 text-subtitle1"
                            style="width: fit-content"
                        >
                            <q-icon name="redeem" size="sm" />
                            <div class="q-ml-sm">
                                <span> Quyền lợi dành cho </span>
                                <strong class="text-primary"
                                    >Nhà sáng tạo</strong
                                >
                            </div>
                        </div>
                    </a>
                    <!-- Creator Benefits section -->
                </section>

                <div class="border-md-bottom-light-500"></div>

                <section
                    id="action-button-groups"
                    class="q-mt-md flex items-center justify-end"
                >
                    <q-btn
                        v-if="isAuth"
                        to="/become-creator"
                        class="bg-dark text-primary border-radius-sm q-pa-sm"
                        no-caps
                        dense
                    >
                        <q-icon name="assignment" class="q-mr-sm" />
                        <span class="text-weight-bold text-subtitle2"
                            >Đến trang đăng ký sáng tác</span
                        >
                    </q-btn>
                    <q-btn
                        v-else
                        to="/auth/login"
                        class="bg-dark text-primary border-radius-sm q-pa-sm"
                        no-caps
                        dense
                    >
                        <q-icon name="login" class="q-mr-sm" />
                        <span class="text-weight-bold text-subtitle2"
                            >Đến trang đăng nhập</span
                        >
                    </q-btn>
                </section>
            </q-card-section>
        </q-card>
    </q-dialog>
    <!-- Become creator information section -->
</template>

<script>
// Import dependencies section.
import { useAuthStore } from "src/stores/common/AuthStore";
import { useUserProfileStore } from "src/stores/common/UserProfileStore";

// Import components section.
import HeaderHighlight from "src/components/common/creatorStudio/HeaderHighlight.vue";
import DrawerLink from "components/layouts/DrawerLink.vue";

// Init store for later operation.
const authStore = useAuthStore();
const userProfileStore = useUserProfileStore();

export default {
    name: "UploadArtworkLink",
    data() {
        return {
            showDialog: false,
        };
    },
    components: {
        HeaderHighlight,
        DrawerLink,
    },
    computed: {
        isAuth() {
            return authStore.isAuth;
        },
        isCreator() {
            return authStore.isAuth && userProfileStore.isCreator;
        },
        uploadArtworkLink() {
            return "/studio/artworks";
        },
    },
};
</script>

<style scoped>
.alert-dialog {
    --max-width: 400px;

    max-width: var(--max-width) !important;
}
</style>
