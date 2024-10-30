<template>
    <section
        v-if="isNotFound"
        class="flex justify-between items-center page-header shadow-2"
    >
        <div class="text-subtitle1 flex items-center">
            <q-btn
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
            <router-link :to="`/studio/comic/detail/${comicId}`">
                <q-btn
                    dense
                    flat
                    no-caps
                    class="text-weight-bold text-dark text-subtitle1 artwork-title"
                >
                    {{ props.headerTitle }}
                </q-btn>
            </router-link>
            <span class="text-weight-bold">
                <q-icon name="chevron_right" size="sm"
            /></span>
            <span> Thêm tập </span>
        </div>
        <q-btn
            v-if="hasInputData"
            @click="showWarning = true"
            class="font-arial text-weight-bold"
            label="Hủy tạo"
            color="dark"
            align="center"
        ></q-btn>
        <q-btn
            v-else
            @click="confirmToCancelOrRedirect"
            class="font-arial text-weight-bold"
            label="Hủy tạo"
            color="dark"
            align="center"
        ></q-btn>
        <q-dialog v-model="showWarning" persistent>
            <q-card>
                <q-card-section>
                    <HeaderHighlight
                        label="Lưu ý"
                        class="text-h6 text-weight-bold"
                    />
                </q-card-section>

                <q-card-section class="q-pt-none text-subtitle1">
                    Các thông tin của sẽ không được lưu lại nếu bạn hủy.
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

// Support for route.
const route = useRoute();
const router = useRouter();
const defaultRedirectRoute = ref(null);

// Component refs.
const hasInputData = ref(inject("hasInputData"));
const showWarning = ref(false);
const isRedirectedToOtherRoute = ref(false);
const redirectRoute = ref(null);
const confirmToCancelUpdate = ref(false);

const props = defineProps({
    comicId: {
        required: true,
    },
    headerTitle: {
        type: String,
        default: null,
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

    // If redirect route is not specified,
    // then redirect back to default route.
    router.push(defaultRedirectRoute.value);
}

/**
 * Handle the unload event when user accidentally refresh the page.
 * @param {BeforeUnloadEvent} event The before-unload event to handle
 */
function preventRedirect(event) {
    // If creator has input data, then preventing the redirection.
    if (hasInputData.value) {
        event.preventDefault();
        event.returnValue = null;
        return;
    }
}

// Component life-cycle events.
onBeforeMount(() => {
    defaultRedirectRoute.value = `/studio/comic/detail/${props.comicId}`;
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

    if (hasInputData.value) {
        showWarning.value = true;
    }

    // If confirmToCancelUpdate is true or creator does not input any data
    // then allow the creator to redirect to other page.
    return confirmToCancelUpdate.value || !hasInputData.value;
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis !important;
}
</style>
