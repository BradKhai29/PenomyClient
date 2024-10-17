<template>
    <div>
        <q-btn color="dark" no-caps dense class="bg-dark area-button">
            <div class="row items-center no-wrap">
                <q-icon left :name="selectedArea.icon" />
                <div class="text-center" style="width: 80px">
                    {{ selectedArea.name }}
                </div>
            </div>
            <q-menu
                v-model="showMenu"
                transition-show="jump-down"
                transition-hide="jump-up"
                :offset="[0, 8]"
                fit
            >
                <q-list>
                    <q-item
                        v-for="watchingArea in watchingAreasRef"
                        :key="watchingArea.name"
                        :active="watchingArea.isSelected"
                        active-class="bg-dark text-light"
                        v-close-popup
                        clickable
                        @click="goToArea(watchingArea.routePath)"
                    >
                        <div class="flex items-center">
                            <q-icon :name="watchingArea.icon" size="sm" />
                            <span class="q-ml-md">{{ watchingArea.name }}</span>
                        </div>
                    </q-item>
                </q-list>
            </q-menu>
        </q-btn>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const comicArea = {
    name: "Truyện tranh",
    icon: "palette",
    isSelected: true,
    routePath: ["/artwork/comic"],
};

const animeArea = {
    name: "Hoạt hình",
    icon: "videocam",
    isSelected: false,
    routePath: ["/artwork/anime"],
};

const showMenu = ref(false);
const watchingAreas = [comicArea, animeArea];
const watchingAreasRef = ref(watchingAreas);
const selectedArea = ref(comicArea);

const route = useRoute();
const router = useRouter();

watch(
    () => route.path,
    () => {
        if (route.path == comicArea.routePath) {
            comicArea.isSelected = true;
            animeArea.isSelected = false;

            selectedArea.value = comicArea;
        } else {
            comicArea.isSelected = false;
            animeArea.isSelected = true;

            selectedArea.value = animeArea;
        }
    }
);

function goToArea(areaRoutePath) {
    router.push(areaRoutePath[0]);
}
</script>

<style scoped>
.area-button {
    border-radius: 6.4px;
    padding: 6.4px !important;
}
</style>
