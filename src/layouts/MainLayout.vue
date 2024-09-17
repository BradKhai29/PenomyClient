<template>
    <q-layout view="hHh Lpr lFf">
        <q-header reveal bordered>
            <q-toolbar>
                <q-btn flat @click="toggleLeftDrawer" round dense icon="menu" />
                <q-icon name="home" size="2rem"></q-icon>Penomy
                <q-space />

                <q-input class="searchField" standout rounded dense label="Tìm kiếm" v-model="searchString"
                    width="300px" bg-color="grey-4">
                    <template v-slot:append>
                        <q-avatar color="black">
                            <q-icon name="search" color="white" />
                        </q-avatar>
                    </template>
                </q-input>

                <q-space />
                <div class="right-side">
                    <q-btn color="primary" size=".6em" padding="4px" dense filled label="Thể loại"
                        icon-right="expand_more" />
                    <q-btn size=".6em" color="primary" padding="4px" dense filled label="Thể loại"
                        icon-right="expand_more" />
                    <q-btn icon="sms" round dense size=".7rem">
                    </q-btn>
                    <q-btn round color="primary" size=".6rem">
                        <q-avatar size="1.3rem" icon="account_circle" />
                    </q-btn>
                </div>
                <!-- </q-toolbar-title> -->
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
            <q-list>
                <q-item-label header> Essential Links </q-item-label>

                <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "src/components/layouts/MainLayout/EssentialLink.vue";

defineOptions({
    name: "MainLayout",
});

const linksList = [
    {
        title: "Docs",
        caption: "quasar.dev",
        icon: "school",
        link: "https://quasar.dev",
    },
    {
        title: "Github",
        caption: "github.com/quasarframework",
        icon: "code",
        link: "https://github.com/quasarframework",
    },
    {
        title: "Discord Chat Channel",
        caption: "chat.quasar.dev",
        icon: "chat",
        link: "https://chat.quasar.dev",
    },
    {
        title: "Forum",
        caption: "forum.quasar.dev",
        icon: "record_voice_over",
        link: "https://forum.quasar.dev",
    },
    {
        title: "Twitter",
        caption: "@quasarframework",
        icon: "rss_feed",
        link: "https://twitter.quasar.dev",
    },
    {
        title: "Facebook",
        caption: "@QuasarFramework",
        icon: "public",
        link: "https://facebook.quasar.dev",
    },
    {
        title: "Quasar Awesome",
        caption: "Community Quasar projects",
        icon: "favorite",
        link: "https://awesome.quasar.dev",
    },
];

var leftDrawerOpen = ref(false);
var searchString = ref("");
function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}

.searchField {
    width: 27rem;
}

.right-side {
    display: flex;
    gap: 0.5rem;
}
</style>