<template>
    <section id="deleted-statistic-section" class="q-gutter-md row">
        <div
            id="manga-stat"
            class="border-radius-sm bg-light q-pa-md shadow-1 col-grow"
        >
            <div class="flex items-center">
                <q-icon name="palette" size="sm" class="text-primary" />
                <span class="q-ml-sm">Truyện tranh đã xóa</span>
            </div>
            <div class="q-mt-md text-h6 text-weight-bold">
                {{ totalDeletedComics }}
            </div>
        </div>
        <div
            id="anime-stat"
            class="border-radius-sm bg-light q-pa-md shadow-1 col-grow"
        >
            <div class="flex items-center">
                <q-icon name="videocam" size="sm" class="text-primary" />
                <span class="q-ml-sm">Hoạt hình đã xóa</span>
            </div>
            <div class="q-mt-md text-h6 text-weight-bold">
                {{ totalDeletedAnimes }}
            </div>
        </div>
    </section>
</template>

<script>
import { useCreatorStore } from "src/stores/common/CreatorStore";
const creatorStore = useCreatorStore();

export default {
    name: "DeletedOverviewStatisticCard",
    computed: {
        totalDeletedAnimes() {
            return creatorStore.totalDeletedAnimes;
        },
        totalDeletedComics() {
            return creatorStore.totalDeletedComics;
        },
    },
};
</script>
