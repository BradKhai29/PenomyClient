<template>
    <q-menu
        class="avatar-menu"
        v-model="showMenu"
        transition-show="jump-down"
        transition-hide="jump-up"
        :offset="[0, 16]"
        max-height="640"
        max-width="300"
        fit
    >
        <q-list class="avatar-menu-list">
            <router-link
                :to="profileButtonLink"
                class="text-decoration-none text-weight-bold bg-light-100 text-dark"
            >
                <q-item
                    id="profile-button"
                    clickable
                    class="avatar-menu-item q-py-md"
                >
                    <div
                        class="flex column col-grow justify-center q-gutter-sm"
                    >
                        <div class="text-center">
                            <q-btn round v-if="isAuth" size="sm">
                                <q-avatar>
                                    <img :src="userProfile.avatarUrl" />
                                </q-avatar>
                            </q-btn>
                            <q-btn round v-else>
                                <q-icon
                                    name="account_circle"
                                    class="text-dark"
                                    size="xl"
                                />
                            </q-btn>
                        </div>
                        <div
                            class="text-subtitle1 text-weight-bold text-center avatar-username"
                        >
                            <span v-if="isAuth">
                                {{ userProfile.nickname }}
                            </span>
                            <span v-else> Chưa đăng nhập </span>
                        </div>
                        <div class="text-center">
                            <q-badge
                                v-if="!userProfile.isCreator"
                                class="text-subtitle2 inline bg-light-300 text-dark"
                            >
                                <span>{{ isAuth ? "User" : "Guest" }}</span>
                            </q-badge>
                            <q-badge
                                v-else-if="userProfile.isCreator"
                                class="text-subtitle2 inline bg-primary-700 text-primary"
                            >
                                <span>Creator</span>
                            </q-badge>
                        </div>
                    </div>
                </q-item>
            </router-link>
            <div class="menu-item-separator"></div>

            <div id="user-profile-actions" class="bg-light-100 text-subtitle1">
                <q-item
                    v-if="atCreatorStudio"
                    id="btn-back-home"
                    clickable
                    v-close-popup
                    class="avatar-menu-item flex items-center q-py-sm q-mb-sm"
                    dense
                    @click="goToHome"
                >
                    <q-icon name="home" size="sm" />
                    <span class="q-ml-sm">Về lại trang chủ</span>
                </q-item>
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
                    v-if="!atCreatorStudio"
                    id="btn-support"
                    clickable
                    v-close-popup
                    class="avatar-menu-item flex items-center q-py-sm q-mb-sm"
                    dense
                >
                    <q-icon name="help" size="sm" />
                    <span class="q-ml-sm">Hỗ trợ</span>
                </q-item>
                <q-item
                    v-if="!atCreatorStudio"
                    id="btn-feedback"
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

<script>
// Import dependencies section.
import { useAuthStore } from "src/stores/common/AuthStore";
import { useUserProfileStore } from "src/stores/common/UserProfileStore";

// Init store for later operation.
const authStore = useAuthStore();
const userProfileStore = useUserProfileStore();

export default {
    name: "TheUserAvatarMenu",
    props: {
        atCreatorStudio: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            showMenu: false,
        };
    },
    computed: {
        isAuth() {
            return authStore.isAuth;
        },
        userProfile() {
            return userProfileStore.userProfile;
        },
        profileButtonLink() {
            // If user is already authenticated, then
            // redirect to their personal profile page
            if (authStore.isAuth) {
                return `/user/${authStore.userId}`;
            }

            // If not auth, redirect guest to login page when clicking on.
            return "/auth/login";
        },
    },
    methods: {
        goToHome() {
            // Redirect to homepage.
            this.$router.push("/");
        },
        async signOut() {
            this.showMenu = false;
            await authStore.signOut();
            userProfileStore.router // Redirect to login page when logout success.
                .push("/auth/login");
        },
    },
};
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
    --menu-min-width: 280px;
    --menu-max-height: 640px !important;
}

.avatar-menu {
    min-width: var(--menu-min-width) !important;
    height: var(--menu-max-height) !important;
}

.avatar-menu-list {
    min-width: var(--menu-min-width) !important;
    padding: 20px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scroll.avatar-menu::-webkit-scrollbar,
.scroll.avatar-menu-list::-webkit-scrollbar {
    display: none !important;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scroll.avatar-menu,
.scroll.avatar-menu-list {
    -ms-overflow-style: none !important; /* IE and Edge */
    scrollbar-width: none !important; /* Firefox */
}

.avatar-menu-item {
    border-radius: 4px;
}

.avatar-username {
    max-width: 200px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
