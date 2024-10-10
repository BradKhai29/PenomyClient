<template>
    <section class="flex justify-between items-center page-header shadow-2">
        <span class="text-subtitle1 text-weight-bold"
            >Tạo mới truyện tranh</span
        >
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
                    <span>Thông tin của tác phẩm sẽ không được lưu lại.</span>
                    <br />
                    <span>Bạn có muốn hủy lưu?</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn
                        @click="isRedirectedToOtherRoute = false"
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
import { inject, onBeforeMount, onBeforeUnmount, ref, watch } from "vue";
import HeaderHighlight from "components/common/creatorStudio/HeaderHighlight.vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";

// Support for route.
const route = useRoute();
const router = useRouter();
const defaultRedirectRoute = "/studio/artworks";

// Component refs.
const showWarning = ref(false);
const isRedirectedToOtherRoute = ref(false);
const redirectRoute = ref(null);
const confirmToCancelCreate = ref(false);
const hasInputData = ref(inject("hasInputData"));

// Component functions.
function confirmToCancelOrRedirect() {
    confirmToCancelCreate.value = true;

    // Continue to redirect to the route path.
    if (redirectRoute.value) {
        router.push(redirectRoute.value);

        return;
    }

    // If redirect route is not specified, then redirect back to default route.
    router.push(defaultRedirectRoute);
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

    // If confirmToCancelCreate is true or creator does not input any data
    // then allow the creator to redirect to other page.
    return confirmToCancelCreate.value || !hasInputData.value;
});
</script>

<style scoped>
.page-header {
    --light-100: #f9fafc;
    padding: 16px;
    background-color: var(--light-100t);
}
</style>
