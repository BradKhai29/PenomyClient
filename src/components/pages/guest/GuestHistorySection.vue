<template>
    <section id="guest-history-section" class="q-mt-md">
        <div
            id="header-section"
            class="border-sm-bottom-light-500 q-px-lg flex"
        >
            <span class="flex items-center penomy-tab selected q-px-xs">
                <q-icon name="history" size="sm" class="text-primary" />
                <span class="q-ml-xs text-subtitle1">Lịch sử xem</span>
            </span>
        </div>

        <!-- View history section -->
        <section class="q-mx-lg q-mt-md">
            <div class="flex items-center q-mb-sm" id="button-group">
                <q-btn
                    id="comic-tab-button"
                    @click="selectedTab = comicTab"
                    dense
                    no-caps
                    unelevated
                    class="flex items-center bg-light-300 text-subtitle1 border-radius-sm q-px-sm q-mr-sm"
                    :class="selectedTab == comicTab ? 'bg-dark text-light' : ''"
                >
                    <span>Truyện tranh</span>
                    <span class="q-ml-xs">({{ 1 }})</span>
                </q-btn>
                <q-btn
                    id="anime-tab-button"
                    @click="selectedTab = animeTab"
                    dense
                    no-caps
                    unelevated
                    class="flex items-center bg-light-300 text-subtitle1 border-radius-sm q-px-sm"
                    :class="selectedTab == animeTab ? 'bg-dark text-light' : ''"
                >
                    <span>Hoạt hình</span>
                    <span class="q-ml-xs">({{ 1 }})</span>
                </q-btn>
            </div>

            <div class="row q-mt-md">
                <q-tab-panels v-model="selectedTab" animated class="col-grow">
                    <q-tab-panel :name="comicTab" class="q-pa-none row">
                        Không có tác phẩm nào
                    </q-tab-panel>

                    <q-tab-panel :name="animeTab" class="q-pa-none row">
                        Hello
                    </q-tab-panel>
                </q-tab-panels>
            </div>
        </section>
        <!-- View history section -->
    </section>
</template>

<script>
const COMIC_TAB = "comic";
const ANIME_TAB = "anime";

export default {
    name: "GuestHistorySection",
    data() {
        return {
            selectedTab: COMIC_TAB,
        };
    },
    computed: {
        comicTab() {
            return COMIC_TAB;
        },
        animeTab() {
            return ANIME_TAB;
        },
    },
};
</script>
