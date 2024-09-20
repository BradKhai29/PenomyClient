<template>
    <q-layout view="hHh Lpr lFf">
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
            show-if-above
            bordered
        >
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

        <q-page-container>
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
</style>
