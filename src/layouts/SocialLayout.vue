<template>
    <q-layout view="hHR Lpr lFf">
        <q-header class="bg-light" bordered>
            <!-- <linear-progress @is-done="showProgress= false" v-if="showProgress"/> -->
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

        <q-drawer v-model="showDrawer" :breakpoint="400" :width="280" show-if-above bordered
            class="penomy-scrollbar-square">
            <q-toolbar class="text-dark toolbar-sm-show q-py-md">
                <q-btn flat round icon="menu" aria-label="Menu" @click="toggleDrawer" size="md" />

                <TheLogoButton />
            </q-toolbar>
            <q-list class="app-drawer-list">
                <q-list class="drawer-gutter">
                    <HomeLinkSocial />
                    <JoinedGroupPageLink />
                    <FriendLink />
                    <ChatLink />
                    <!-- <DrawerGroupLink v-if="authStore.isAuth" :title="''" link="/social/group/create" :isSelected="false"
                        :createdAt="''" /> -->
                </q-list>

                <MyGroupsExpansion v-if="authStore.isAuth" />
                <div v-if="authStore.isAuth" class="drawer-gutter"></div>

                <JoinGroupsExpansion v-if="authStore.isAuth" />
                <div v-if="authStore.isAuth" class="drawer-gutter"></div>

            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref, onBeforeMount, watch } from "vue";

// Import components from header section.
import TheLogoButton from "src/components/layouts/MainLayout/headers/TheLogoButton.vue";
import TheSearchBar from "src/components/layouts/MainLayout/headers/TheSearchBar.vue";
import TheUserAvatar from "src/components/layouts/MainLayout/headers/TheUserAvatar.vue";

// Import components from drawer section.
import HomeLinkSocial from "src/components/layouts/MainLayout/drawers/HomeLinkSocial.vue";
import MyGroupsExpansion from "src/components/layouts/MainLayout/drawers/MyGroupsExpansion.vue";
import JoinGroupsExpansion from "src/components/layouts/MainLayout/drawers/JoinGroupsExpansion.vue";
import OthersExpansion from "components/layouts/OthersExpansion.vue";
import JoinedGroupPageLink from "src/components/layouts/MainLayout/drawers/JoinedGroupPageLink.vue";
import FriendLink from "src/components/layouts/MainLayout/drawers/FriendLink.vue";
import ChatLink from "src/components/layouts/MainLayout/drawers/ChatLink.vue";

// Import components from progress section.
import LinearProgress from "src/components/common/progressBar/LinearProgress.vue";
// Import auth store
import { useAuthStore } from "src/stores/common/AuthStore";
// Import router
import { useRoute, useRouter } from "vue-router";
import ForYouSocialExpansion from "src/components/layouts/MainLayout/drawers/ForYouSocialExpansion.vue";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
defineOptions({
    name: "MainLayout",
});

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
const showDrawer = ref(false);
const showProgress = ref(true);

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
