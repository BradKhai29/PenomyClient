<template>
    <section
        v-if="isNotFound"
        class="flex justify-between items-center page-header shadow-2"
    >
        <div class="text-subtitle1 flex items-center">
            <q-btn
                :to="artworkManagementRoute"
                dense
                flat
                no-caps
                class="text-weight-bold bg-dark text-light text-subtitle1"
            >
                <q-icon name="arrow_back" size="sm"></q-icon>
                <span class="q-ml-xs"> Trở về trang quản lý </span>
            </q-btn>
        </div>
    </section>
    <section
        v-if="!isNotFound"
        class="flex justify-between items-center page-header shadow-2"
    >
        <div class="text-subtitle1 flex items-center">
            <router-link
                :to="comicDetailRoute"
                dense
                flat
                no-caps
                class="text-weight-bold text-dark text-subtitle1 artwork-title underline-none"
            >
                {{ props.headerTitle }}
            </router-link>
            <span class="text-weight-bold">
                <q-icon name="chevron_right" size="sm"
            /></span>
            <span> Sửa thông tin </span>
        </div>
        <div class="flex items-center q-gutter-sm">
            <q-btn
                v-if="hasChangesInData"
                @click="showWarning = true"
                class="font-arial text-weight-bold"
                label="Hủy thay đổi"
                color="dark"
                align="center"
            />
            <q-btn
                :to="comicDetailRoute"
                v-if="!hasChangesInData"
                class="font-arial text-weight-bold"
                label="Trở về"
                color="dark"
                align="center"
            />
            <q-btn
                class="font-arial text-weight-bold flex items-center"
                color="negative"
                @click="showDeleteModal = true"
            >
                <span class="q-mr-xs">Xóa</span>
                <q-icon name="delete" size="xs" />
            </q-btn>
        </div>
        <q-dialog v-model="showDeleteModal" persistent>
            <q-card>
                <q-card-section>
                    <div class="text-h6">Tác phẩm: {{ headerTitle }}</div>
                </q-card-section>
                <q-card-section class="row items-center">
                    <q-avatar
                        icon="delete"
                        color="primary"
                        text-color="white"
                    />
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
                        :disable="isProcessing"
                    />
                    <q-btn
                        flat
                        no-caps
                        label="Xác nhận xóa"
                        color="primary"
                        class="text-subtitle1"
                        @click="temporarilyRemoveComicAsync"
                        :disable="isProcessing"
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="showWarning" persistent>
            <q-card>
                <q-card-section>
                    <HeaderHighlight
                        label="Lưu ý"
                        class="text-h6 text-weight-bold"
                    />
                </q-card-section>

                <q-card-section class="q-pt-none text-subtitle1">
                    Các thông tin của tác phẩm sẽ không được lưu lại nếu bạn
                    hủy.
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn
                        flat
                        label="Đóng"
                        class="text-bold"
                        color="primary"
                        v-close-popup
                    />
                    <q-btn
                        @click="confirmToCancelOrRedirect"
                        class="text-bold"
                        flat
                        :label="
                            isRedirectedToOtherRoute
                                ? 'Tiếp tục chuyển trang'
                                : 'Xác nhận hủy'
                        "
                        color="primary"
                        v-close-popup
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </section>
</template>

<script setup>
import { inject, onBeforeMount, onBeforeUnmount, ref } from "vue";
import HeaderHighlight from "components/common/creatorStudio/HeaderHighlight.vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import { CreatorStudio8ApiHandler } from "src/api.handlers/creatorStudio/creatorStudio8Page/CreatorStudio8ApiHandler";
import { NotificationHelper } from "src/helpers/NotificationHelper";

// Support for route.
const route = useRoute();
const router = useRouter();
const defaultRedirectRoute = ref(null);
const artworkManagementRoute = "/studio/artworks";

// Component refs.
const comicDetailRoute = ref(null);
const showWarning = ref(false);
const showDeleteModal = ref(false);
const isRedirectedToOtherRoute = ref(false);
const redirectRoute = ref(null);
const confirmToCancelUpdate = ref(false);
const hasChangesInData = ref(inject("hasChangesInData"));
const isProcessing = ref(false);

const props = defineProps({
    headerTitle: {
        type: String,
        default: null,
    },
    comicId: {
        type: String,
        required: true,
    },
    isNotFound: {
        type: Boolean,
        default: false,
    },
});

// Component functions.
function confirmToCancelOrRedirect() {
    confirmToCancelUpdate.value = true;

    // Continue to redirect to the route path.
    if (redirectRoute.value) {
        router.push(redirectRoute.value);

        return;
    }

    // If redirect route is not specified, then redirect back to default route.
    router.push(defaultRedirectRoute.value);
}

/**
 * Handle the unload event when user accidentally refresh the page.
 * @param {BeforeUnloadEvent} event The before-unload event to handle
 */
function preventRedirect(event) {
    // If creator has input data, then preventing the redirection.
    if (hasChangesInData.value) {
        event.preventDefault();
        event.returnValue = null;

        return;
    }
}

async function temporarilyRemoveComicAsync() {
    // Prevent user to re-click the button
    // when the api is handling the request.
    if (isProcessing.value) {
        return;
    }

    // Turn on the is processing flag.
    isProcessing.value = true;

    const result =
        await CreatorStudio8ApiHandler.temporarilyRemoveComicByIdAsync(
            props.comicId
        );

    if (result.isSuccess) {
        hasChangesInData.value = false;
        NotificationHelper.notifySuccess("Tác phẩm đã bị tạm xóa");

        // Redirect to artwork manager page after removing success.
        router.push(artworkManagementRoute);
        return;
    }

    // Notifiy the error if has.
    NotificationHelper.notifyError(result.message);
}

// Component life-cycle events.
onBeforeMount(() => {
    defaultRedirectRoute.value = `/studio/comic/detail/${props.comicId}`;
    comicDetailRoute.value = `/studio/comic/detail/${props.comicId}`;

    window.addEventListener("beforeunload", preventRedirect);
});

onBeforeUnmount(() => {
    window.removeEventListener("beforeunload", preventRedirect);
});

onBeforeRouteLeave((to, _) => {
    // Set the flag to indicate redirect to other route.
    isRedirectedToOtherRoute.value = true;

    // Set the redirect route path for later
    // redirection if creator confirms to redirect.
    redirectRoute.value = to.path;

    if (hasChangesInData.value) {
        showWarning.value = true;
    }

    // If confirmToCancelUpdate is true or creator does not input any data
    // then allow the creator to redirect to other page.
    return confirmToCancelUpdate.value || !hasChangesInData.value;
});
</script>

<style scoped>
.page-header {
    --light-100: #f9fafc;
    padding: 16px;
    background-color: var(--light-100t);
}

.artwork-title {
    max-width: 200px !important;
    text-align: left;
    direction: ltr;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
