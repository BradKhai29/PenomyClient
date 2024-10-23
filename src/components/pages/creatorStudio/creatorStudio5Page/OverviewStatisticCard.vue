<template>
    <section
        v-if="!isLoading"
        id="overview-statistic-section"
        class="q-gutter-md row"
    >
        <div
            id="manga-stat"
            class="border-radius-sm bg-light q-pa-md shadow-1 col-grow"
        >
            <div class="flex items-center">
                <q-icon name="palette" size="sm" class="text-primary" />
                <span class="q-ml-sm">Truyện tranh đã đăng</span>
            </div>
            <div class="q-mt-md text-h6 text-weight-bold">
                {{ overviewStatistic.totalComics }}
            </div>
        </div>
        <div
            id="anime-stat"
            class="border-radius-sm bg-light q-pa-md shadow-1 col-grow"
        >
            <div class="flex items-center">
                <q-icon name="videocam" size="sm" class="text-primary" />
                <span class="q-ml-sm">Hoạt hình đã đăng</span>
            </div>
            <div class="q-mt-md text-h6 text-weight-bold">
                {{ overviewStatistic.totalAnimations }}
            </div>
        </div>
        <div
            id="series-stat"
            class="border-radius-sm bg-light q-pa-md shadow-1 col-grow"
        >
            <div class="flex items-center">
                <q-icon name="view_list" size="sm" class="text-primary" />
                <span class="q-ml-sm">Series đã đăng</span>
            </div>
            <div class="q-mt-md text-h6 text-weight-bold">
                {{ overviewStatistic.totalSeries }}
            </div>
        </div>
    </section>
</template>

<script>
import { CreatorStudio5ApiHandler } from "src/api.handlers/creatorStudio/creatorStudio5Page/CreatorStudio5ApiHandler";
import { OverviewStatisticResponseItem } from "src/api.models/creatorStudio/creatorStudio5Page/OverviewStatisticResponseItem";

export default {
    data() {
        return {
            isLoading: true,
            /**
             * The overview statistic that fetched from the webapi.
             *
             * @type {OverviewStatisticResponseItem} The type of this property.
             */
            overviewStatistic: {
                totalAnimations: 0,
                totalComics: 0,
                totalSeries: 0,
            },
        };
    },
    async mounted() {
        const result =
            await CreatorStudio5ApiHandler.getOverviewStatisticAsync();

        if (result) {
            this.overviewStatistic = result;
        }

        this.isLoading = false;
    },
};
</script>
