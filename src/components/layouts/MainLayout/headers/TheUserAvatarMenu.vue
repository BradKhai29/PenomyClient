<template>
    <q-menu
        class="avatar-menu"
        v-model="showMenu"
        transition-show="jump-down"
        transition-hide="jump-up"
        :offset="[0, 16]"
        fit
    >
        <q-list class="avatar-menu-list">
            <q-item
                clickable
                v-close-popup
                class="text-weight-bold avatar-menu-item bg-light-100 q-py-md"
            >
                <div class="flex column col-grow justify-center q-gutter-sm">
                    <div class="text-center">
                        <q-btn round v-if="isAuth" size="sm">
                            <q-avatar>
                                <img :src="avatarUrl" />
                            </q-avatar>
                        </q-btn>
                        <q-icon
                            v-else
                            name="account_circle"
                            class="text-dark"
                            size="xl"
                        />
                    </div>
                    <div
                        class="text-subtitle1 text-weight-bold text-center avatar-username"
                    >
                        {{ userName ?? "Chưa đăng nhập" }}
                    </div>
                    <div class="text-center">
                        <q-badge
                            v-if="!isCreator"
                            class="text-subtitle2 inline bg-light-300 text-dark"
                        >
                            <span v-if="!isAuth">Guest</span>
                            <span v-else>User</span>
                        </q-badge>
                        <q-badge
                            v-else
                            class="text-subtitle2 inline bg-primary-700 text-primary"
                        >
                            <span>Creator</span>
                        </q-badge>
                    </div>
                </div>
            </q-item>

            <div class="menu-item-separator"></div>

            <div class="bg-light-100 text-subtitle1">
                <q-item
                    v-if="isAuth"
                    id="btn-login"
                    clickable
                    v-close-popup
                    class="avatar-menu-item flex items-center q-py-sm q-mb-sm"
                    dense
                >
                    <q-icon name="edit" size="sm" />
                    <span class="q-ml-sm">Sửa thông tin</span>
                </q-item>
                <q-item
                    id="btn-login"
                    clickable
                    v-close-popup
                    class="avatar-menu-item flex items-center q-py-sm q-mb-sm"
                    dense
                >
                    <q-icon name="settings" size="sm" />
                    <span class="q-ml-sm">Cài đặt</span>
                </q-item>
                <q-item
                    id="btn-login"
                    clickable
                    v-close-popup
                    class="avatar-menu-item flex items-center q-py-sm q-mb-sm"
                    dense
                >
                    <q-icon name="help" size="sm" />
                    <span class="q-ml-sm">Hỗ trợ</span>
                </q-item>
                <q-item
                    id="btn-login"
                    clickable
                    v-close-popup
                    class="avatar-menu-item flex items-center q-py-sm q-mb-sm"
                    dense
                >
                    <q-icon name="feedback" size="sm" />
                    <span class="q-ml-sm">Gửi phản hồi</span>
                </q-item>
            </div>

            <div class="menu-item-separator"></div>

            <div class="text-subtitle1" v-if="!isAuth">
                <q-item
                    id="btn-login"
                    clickable
                    v-close-popup
                    class="avatar-menu-item bg-dark text-light flex items-center q-py-sm q-mb-sm"
                    dense
                    to="/auth/login"
                >
                    <q-icon name="navigate_next" size="sm" />
                    <span class="q-ml-sm">Đăng nhập</span>
                </q-item>

                <q-item
                    id="btn-register"
                    clickable
                    v-close-popup
                    class="avatar-menu-item bg-dark text-light flex items-center q-py-sm"
                    dense
                    to="/auth/register"
                >
                    <q-icon name="navigate_next" size="sm" />
                    <span class="q-ml-sm">Đăng ký</span>
                </q-item>
            </div>
            <div class="text-subtitle1" v-if="isAuth">
                <q-item
                    id="btn-login"
                    clickable
                    v-close-popup
                    class="avatar-menu-item bg-dark text-light flex items-center q-py-sm q-mb-sm"
                    @click="signOut"
                    dense
                >
                    <q-icon name="logout" size="sm" />
                    <span class="q-ml-sm">Đăng xuất</span>
                </q-item>
            </div>
        </q-list>
    </q-menu>
</template>

<script setup>
import { useAuthStore } from "src/stores/common/AuthStore";
import { ref, watch } from "vue";

const authStore = useAuthStore();

const showMenu = ref(false);
const isAuth = ref(authStore.isAuth);
const isCreator = ref(authStore.isCreator);
const userName = ref(null);
const avatarUrl = ref(authStore.avatarUrl);

function signInAsUser() {
    userName.value = "DuongKhai2904";
    authStore.signInAsUser(null, null);
}

function signInAsCreator() {
    userName.value = "DuongKhai2904";
    authStore.signInAsCreator(null, null);
}

function signOut(event) {
    showMenu.value = false;

    userName.value = null;
    authStore.signOut();
}

// Watch if any change in the state of authStore.
watch(
    () => authStore.isAuth,
    () => {
        isAuth.value = authStore.checkAuth;
    }
);

watch(
    () => authStore.isCreator,
    () => {
        isCreator.value = authStore.checkCreator;
    }
);
</script>

<style scoped>
.menu-item-separator {
    --light-500: #dddddd;

    border-bottom: 0.4px solid var(--light-500);
    margin: 16px 0;
    width: 100%;
}

.avatar-username,
.avatar-menu,
.avatar-menu-list,
.avatar-menu-item {
    --menu-width: 280px;
}

.avatar-menu {
    --menu-max-height: 480px !important;

    min-width: var(--menu-width);
    max-height: var(--menu-max-height);
}

.avatar-menu-list {
    min-width: var(--menu-width) !important;
    padding: 20px;
}

.avatar-menu-item {
    max-width: var(--menu-width);
    border-radius: 4px;
}

.avatar-username {
    max-width: 200px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
