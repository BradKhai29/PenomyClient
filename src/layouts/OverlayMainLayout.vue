<template>
    <q-layout view="LHh Lpr lFf">
        <q-header class="bg-light" bordered>
            <q-toolbar class="text-dark">
                <q-btn
                    flat
                    round
                    icon="menu"
                    aria-label="Menu"
                    @click="toggleDrawer"
                    size="md"
                />

                <TheLogoButton class="toolbar-sm-hide" />

                <q-space />

                <TheSearchBar />

                <q-space />

                <div class="q-gutter-sm row items-center no-wrap">
                    <TheCategoriesDropdown />
                    <TheWatchingAreaDropdown />

                    <q-btn
                        round
                        dense
                        color="dark"
                        class="bg-dark"
                        icon="message"
                    >
                        <q-badge color="red" text-color="white" floating>
                            <span class="text-weight-bold">1</span>
                        </q-badge>
                        <q-tooltip>Notifications</q-tooltip>
                    </q-btn>

                    <TheUserAvatar />
                </div>
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="showDrawer"
            :breakpoint="400"
            :width="280"
            overlay
            bordered
        >
            <q-toolbar class="text-darkq-py-md">
                <q-btn
                    flat
                    round
                    icon="menu"
                    aria-label="Menu"
                    @click="toggleDrawer"
                    size="md"
                />

                <TheLogoButton />
            </q-toolbar>

            <q-list class="app-drawer-list">
                <q-list class="drawer-gutter">
                    <HomeLink />
                    <SocialMediaLink />
                </q-list>
                <ForYouExpansion />
                <div class="drawer-gutter"></div>

                <OthersExpansion />
            </q-list>
        </q-drawer>

        <q-page-container :class="{ overlay: showDrawer }">
            <div @click="toggleDrawer" :class="{ overlay: showDrawer }"></div>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref } from "vue";

// Import components from header section.
import TheLogoButton from "src/components/layouts/MainLayout/headers/TheLogoButton.vue";
import TheSearchBar from "src/components/layouts/MainLayout/headers/TheSearchBar.vue";
import TheWatchingAreaDropdown from "src/components/layouts/MainLayout/headers/TheWatchingAreaDropdown.vue";
import TheCategoriesDropdown from "src/components/layouts/MainLayout/headers/TheCategoriesDropdown.vue";
import TheUserAvatar from "src/components/layouts/MainLayout/headers/TheUserAvatar.vue";

// Import components from drawer section.
import HomeLink from "components/layouts/MainLayout/drawers/HomeLink.vue";
import SocialMediaLink from "components/layouts/MainLayout/drawers/SocialMediaLink.vue";
import ForYouExpansion from "components/layouts/MainLayout/drawers/ForYouExpansion.vue";
import OthersExpansion from "components/layouts/OthersExpansion.vue";

defineOptions({
    name: "OverlayMainLayout",
});

const showDrawer = ref(false);

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
    position: fixed; /* Sit on top of the page content */
    width: 100%; /* Full width (cover the whole page) */
    height: 100%; /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2); /* Black background with opacity */
    z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
    cursor: pointer; /* Add a pointer on hover */
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
