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
                    <span class="q-pl-md">Creator Studio</span>
                </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="showDrawer"
            show-if-above
            :breakpoint="400"
            bordered
            :width="280"
        >
            <q-list class="app-drawer-list">
                <q-list class="drawer-gutter">
                    <OverviewLink />
                    <DetailStatisticLink />
                    <EarnMoneyLink />
                    <ReportedLink />
                </q-list>

                <ArtworkCreationExpansion />
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
import OverviewLink from "components/layouts/CreatorStudioLayout/drawers/OverviewLink.vue";
import DetailStatisticLink from "components/layouts/CreatorStudioLayout/drawers/DetailStatisticLink.vue";
import EarnMoneyLink from "components/layouts/CreatorStudioLayout/drawers/EarnMoneyLink.vue";
import ReportedLink from "components/layouts/CreatorStudioLayout/drawers/ReportedLink.vue";
import ArtworkCreationExpansion from "components/layouts/CreatorStudioLayout/drawers/ArtworkCreationExpansion.vue";
import OthersExpansion from "components/layouts/OthersExpansion.vue";

defineOptions({
    name: "CreatorStudioLayout",
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
