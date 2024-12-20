<template>
    <q-layout view="LHh Lpr lFf">
        <q-header class="bg-light" bordered>
            <q-toolbar class="text-dark">
                <q-btn flat round icon="menu" aria-label="Menu" @click="toggleDrawer" size="md" />

                <TheLogoButton class="toolbar-sm-hide" />

                <q-space />

                <div class="q-gutter-sm row items-center no-wrap">
                    <q-btn round dense color="dark" class="bg-dark" icon="message" to="/chat">
                        <q-tooltip>Notifications</q-tooltip>
                    </q-btn>

                    <TheUserAvatar />
                </div>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="showDrawer" :breakpoint="400" :width="280" overlay bordered>
            <q-toolbar class="text-darkq-py-md">
                <q-btn flat round icon="menu" aria-label="Menu" @click="toggleDrawer" size="md" />

                <TheLogoButton />
            </q-toolbar>

            <q-list class="app-drawer-list">
                <q-list class="drawer-gutter">
                    <HomeLinkSocial />
                    <JoinedGroupPageLink />
                    <FriendLink />
                    <ChatLink />
                </q-list>
                <!-- <ForYouSocialExpansion /> -->
                <!-- <div v-if="authStore.isAuth" class="drawer-gutter"></div> -->

                <MyGroupsExpansion v-if="authStore.isAuth" />
                <div v-if="authStore.isAuth" class="drawer-gutter"></div>

                <JoinGroupsExpansion v-if="authStore.isAuth" />
                <!-- <div v-if="authStore.isAuth" class="drawer-gutter"></div> -->

                <!-- <OthersExpansion /> -->
            </q-list>
        </q-drawer>

        <q-page-container :class="{ overlay: showDrawer }">
            <div @click="toggleDrawer" :class="{ overlay: showDrawer }"></div>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref, onBeforeMount, watch } from "vue";

// Import components from header section.
import TheLogoButton from "src/components/layouts/MainLayout/headers/TheLogoButton.vue";
import TheUserAvatar from "src/components/layouts/MainLayout/headers/TheUserAvatar.vue";

// Import components from drawer section.
import HomeLinkSocial from "src/components/layouts/MainLayout/drawers/HomeLinkSocial.vue";
import MyGroupsExpansion from "src/components/layouts/MainLayout/drawers/MyGroupsExpansion.vue";
import JoinGroupsExpansion from "src/components/layouts/MainLayout/drawers/JoinGroupsExpansion.vue";
import OthersExpansion from "components/layouts/OthersExpansion.vue";
import JoinedGroupPageLink from "src/components/layouts/MainLayout/drawers/JoinedGroupPageLink.vue";
import FriendLink from "src/components/layouts/MainLayout/drawers/FriendLink.vue";
import ChatLink from "src/components/layouts/MainLayout/drawers/ChatLink.vue";

// Import auth store
import { useAuthStore } from "src/stores/common/AuthStore";
// Import router
import { useRoute, useRouter } from "vue-router";
import ForYouSocialExpansion from "src/components/layouts/MainLayout/drawers/ForYouSocialExpansion.vue";

defineOptions({
    name: "OverlayMainLayout",
});

const showDrawer = ref(false);

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

onBeforeMount(() => {
    if (authStore.bearerAccessToken().length == 11) {
        router.push('/auth/login');
    }
});

watch(
    () => route.path,
    () => {
        if (route.path.includes('manage') && authStore.bearerAccessToken().length == 11) {
            router.push('/auth/login');
        }
    }
)

function toggleDrawer() {
    showDrawer.value = !showDrawer.value;
}
</script>

<style scoped>
.app-drawer-list {
    padding: 16px;
}

.drawer-gutter {
    padding-bottom: 24px;
}

.overlay {
    position: fixed;
    /* Sit on top of the page content */
    width: 100%;
    /* Full width (cover the whole page) */
    height: 100%;
    /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    /* Black background with opacity */
    z-index: 2;
    /* Specify a stack order in case you're using a different order for other elements */
    cursor: pointer;
    /* Add a pointer on hover */
}

.toolbar-sm-show {
    display: none !important;
}

@media screen and (max-width: 560px) {
    .toolbar-sm-show {
        display: flex !important;
    }

    .toolbar-sm-hide {
        display: none;
    }
}
</style>
