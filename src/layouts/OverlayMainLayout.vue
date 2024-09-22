<template>
    <q-layout view="LHh Lpr lFf">
        <q-header class="bg-light" bordered>
            <q-toolbar class="text-dark">
                <q-btn
                    flat
                    round
                    icon="menu"
                    aria-label="Menu"
                    @click="toggleLeftDrawer"
                    size="md"
                />

                <q-toolbar-title class="text-weight-bold">
                    <q-avatar>
                        <img src="/src/assets/logo/penomy.png" />
                    </q-avatar>
                    <span class="q-pl-md">Penomy</span>
                </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="showDrawer"
            :breakpoint="400"
            :width="280"
            overlay
            bordered
        >
            <q-toolbar class="text-dark">
                <q-btn
                    flat
                    round
                    icon="menu"
                    aria-label="Menu"
                    @click="toggleLeftDrawer"
                    size="md"
                />

                <q-toolbar-title class="text-weight-bold">
                    <q-avatar>
                        <img src="/src/assets/logo/penomy.png" />
                    </q-avatar>
                    <span class="q-pl-md">Penomy</span>
                </q-toolbar-title>
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
            <div
                @click="toggleLeftDrawer"
                :class="{ overlay: showDrawer }"
            ></div>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref } from "vue";
import HomeLink from "components/layouts/MainLayout/drawers/HomeLink.vue";
import SocialMediaLink from "components/layouts/MainLayout/drawers/SocialMediaLink.vue";
import ForYouExpansion from "components/layouts/MainLayout/drawers/ForYouExpansion.vue";
import OthersExpansion from "components/layouts/OthersExpansion.vue";

defineOptions({
    name: "MainLayout",
});

const showDrawer = ref(false);

function toggleLeftDrawer() {
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
</style>
