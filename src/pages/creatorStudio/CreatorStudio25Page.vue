<template>
    <q-page>
        <section id="general-section" class="q-ma-lg">
            <div class="shadow-1 border-radius-sm bg-light-100 q-pa-md">
                <HeaderHighlight
                    label="Nội dung bị tạm xóa"
                    class="q-mb-md text-weight-bold"
                />

                <OverviewStatisticCard ref="overview-statistic-card" />
            </div>
        </section>
        <section id="tab-content" :class="{ 'q-mx-sm': $q.screen.gt.sm }">
            <div id="tab-navigation-items" class="flex items-center q-px-md">
                <q-btn
                    dense
                    flat
                    no-caps
                    square
                    class="text-subtitle2 q-px-sm penomy-tab flex items-center q-mr-sm"
                    :class="{ selected: isSelected(tabItem.name) }"
                    v-for="tabItem in tabItems"
                    :key="tabItem.name"
                    @click="selectTab(tabItem.name)"
                >
                    <q-icon
                        :name="tabItem.icon"
                        size="sm"
                        class="text-primary"
                    />
                    <span class="q-ml-xs">{{ tabItem.label }}</span>
                </q-btn>
            </div>
            <q-tab-panels v-model="selectedTab" animated>
                <q-tab-panel name="comic">
                    <DeletedArtworkSection
                        :loadComic="true"
                        @updateSection="reloadPageState"
                    />
                </q-tab-panel>

                <q-tab-panel name="animation">
                    <div>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Dolorem eveniet asperiores perferendis ad expedita
                        culpa in quia veritatis eius, omnis non iste, doloremque
                        neque ratione? Corrupti quas vitae maiores numquam!
                    </div>
                    <DeletedArtworkSection v-if="false" :loadComic="false" />
                </q-tab-panel>
            </q-tab-panels>
        </section>
    </q-page>
</template>

<script>
// Import components section.
import HeaderHighlight from "src/components/common/creatorStudio/HeaderHighlight.vue";
import DeletedArtworkSection from "src/components/pages/creatorStudio/creatorStudio25Page/DeletedArtworkSection.vue";
import OverviewStatisticCard from "src/components/pages/creatorStudio/creatorStudio25Page/DeletedOverviewStatisticCard.vue";

const tabItemsDefinition = [
    {
        name: "comic",
        label: "Truyện tranh",
        value: "comic",
        icon: "palette",
    },
    {
        name: "animation",
        label: "Hoạt hình",
        value: "animation",
        icon: "videocam",
    },
];

export default {
    components: {
        HeaderHighlight,
        OverviewStatisticCard,
        DeletedArtworkSection,
    },
    data() {
        return {
            tabItems: tabItemsDefinition,
            selectedTab: null,
            overviewStatisticCard: null,
        };
    },
    mounted() {
        this.selectedTab = tabItemsDefinition[0].name;
        this.overviewStatisticCard = this.$refs["overview-statistic-card"];
    },
    methods: {
        selectTab(tabName) {
            this.selectedTab = tabName;
        },
        isSelected(tabName) {
            return this.selectedTab == tabName;
        },
        reloadPageState() {
            this.overviewStatisticCard.reloadState();
        },
    },
};
</script>
