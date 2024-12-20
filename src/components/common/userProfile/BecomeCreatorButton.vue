<template>
    <q-btn
        @click="showDialog = true"
        id="become-creator-button"
        dense
        no-caps
        class="q-ml-sm bg-dark text-light border-radius-sm shadow-1 q-px-sm"
    >
        <q-icon name="assignment" />
        <span class="q-ml-xs text-subtitle1"> Đăng ký sáng tác </span>
    </q-btn>

    <!-- Become creator information section -->
    <q-dialog v-model="showDialog">
        <q-card class="border-radius-md become-creator-dialog">
            <q-card-section class="flex items-center justify-between">
                <HeaderHighlight
                    label="Đăng ký sáng tác"
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
                <p class="note-text">
                    Trước khi tiếp tục thực hiện đăng ký sáng tác, bạn có thể
                    xem trước phần thông tin hỗ trợ bên dưới để hiểu rõ hơn về
                    nền tảng khi tham gia đăng ký trở thành nhà sáng tạo.
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
                </section>
            </q-card-section>
        </q-card>
    </q-dialog>
    <!-- Become creator information section -->
</template>

<script>
// Import components section.
import HeaderHighlight from "../creatorStudio/HeaderHighlight.vue";

export default {
    name: "BecomeCreatorButton",
    components: {
        HeaderHighlight,
    },
    data() {
        return {
            showDialog: false,
        };
    },
    mounted() {},
};
</script>

<style scoped>
.become-creator-dialog {
    --max-width: 480px;

    width: 100% !important;
    max-width: var(--max-width) !important;
}
</style>
