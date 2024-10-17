<template>
    <section id="search-bar-section">
        <teleport to="#q-app">
            <div
                v-show="showMenu"
                class="search-bar-blur-light"
                @click="hideAdvancedSearch"
            ></div>
        </teleport>
        <div
            class="search-bar-blur"
            v-show="showMenu"
            @click="hideAdvancedSearch"
        ></div>
        <section class="search-bar">
            <div class="row col-grow search-bar-input-section">
                <input
                    v-model="searchKeyword"
                    @focus="onInputFocus"
                    placeholder="Tìm kiếm"
                    class="bg-white col search-bar-input text-subtitle1 q-py-md"
                />
                <q-btn
                    dense
                    round
                    class="bg-dark q-ml-xs"
                    text-color="white"
                    icon="search"
                />
            </div>
            <div
                v-show="showMenu"
                class="search-bar-menu bg-light-100 shadow-1"
            >
                <div class="flex q-mb-md">
                    <q-btn
                        id="btn-login"
                        no-caps
                        class="bg-dark text-light flex col-grow radius-4"
                        @click="displayAdvancedSearch"
                    >
                        <q-icon name="zoom_in" size="sm" />
                        <span class="q-ml-sm text-subtitle1"
                            >Tìm kiếm nâng cao</span
                        >
                    </q-btn>
                </div>
                <ul id="search-bar-menu-item-list">
                    <SearchBarItem
                        v-for="i in 5"
                        :key="i"
                        link="#"
                        :label="`Tìm kiếm [${i}]`"
                    />
                </ul>
            </div>

            <q-dialog v-model="showDialog" position="top">
                <TheAdvancedSearchModal />
            </q-dialog>
        </section>
    </section>
</template>

<script setup>
import { ref } from "vue";
import SearchBarItem from "./TheSearchBarItem.vue";
import TheAdvancedSearchModal from "components/common/artwork/advancedSearch/TheAdvancedSearchModal.vue";

const showMenu = ref(false);
const showDialog = ref(false);
const searchKeyword = ref(null);

function onInputFocus(event) {
    showMenu.value = true;
}

function hideAdvancedSearch(event) {
    showMenu.value = false;
}

function displayAdvancedSearch() {
    showMenu.value = false;
    showDialog.value = true;
}
</script>

<style scoped>
.radius-4 {
    border-radius: 4px;
}

.search-bar {
    --max-width: 540px;
    --min-width: 300px;

    width: clamp(
        var(--min-width),
        calc(100vw - var(--max-width)),
        var(--max-width)
    );

    position: relative;
}

.search-bar-input-section {
    position: absolute;
    top: 0;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    z-index: 9999 !important;
}

.search-bar-blur-light {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.search-bar-blur {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    z-index: 200 !important;
    background-color: black;
    opacity: 0.2;
}

.search-bar-input {
    --light-300: #eeeeee;

    border: none;
    border-radius: 32px;
    outline: none;
    padding: 0px 16px;
    background-color: var(--light-300) !important;
}

.search-bar-menu {
    --search-bar-input-height: 36px;
    --offset: 8px;
    --padding: 12px;
    --border-radius: 6.4px;

    position: absolute;
    z-index: 999;
    top: calc(var(--search-bar-input-height) - var(--offset));
    right: 0;
    left: 0;
    padding: var(--padding);
    border-radius: var(--border-radius);
}

#search-bar-menu-item-list {
    padding: 0 !important;
    margin: 0;
    list-style-type: none !important;
}
</style>
