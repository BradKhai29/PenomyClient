<template>
    <section id="guest-history-section" class="q-mt-md">
        <div
            id="header-section"
            class="border-sm-bottom-light-500 q-px-lg flex"
        >
            <div id="tab-navigation-items" class="flex items-center">
                <q-btn
                    id="history-tab"
                    square
                    dense
                    flat
                    no-caps
                    class="text-subtitle1 q-mr-sm penomy-tab"
                    :class="{ selected: selectedTab == historyTab }"
                    @click="selectedTab = historyTab"
                >
                    <q-icon name="history" size="sm" class="text-primary" />
                    <span class="q-ml-xs text-subtitle1">Lịch sử</span>

                    <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[8, 8]"
                    >
                        <strong class="text-subtitle2"
                            >Lịch sử xem của bạn</strong
                        >
                    </q-tooltip>
                </q-btn>

                <q-btn
                    id="favorite-tab"
                    square
                    dense
                    flat
                    no-caps
                    class="text-subtitle1 q-mr-sm penomy-tab"
                    :class="{ selected: selectedTab == favoriteTab }"
                    @click="selectedTab = favoriteTab"
                >
                    <span class="q-ml-xs text-subtitle1">Yêu thích</span>

                    <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[8, 8]"
                    >
                        <strong class="text-subtitle2"
                            >Tác phẩm đã yêu thích</strong
                        >
                    </q-tooltip>
                </q-btn>

                <q-btn
                    id="favorite-tab"
                    square
                    dense
                    flat
                    no-caps
                    class="text-subtitle1 q-mr-sm penomy-tab"
                    :class="{ selected: selectedTab == followedArtworksTab }"
                    @click="selectedTab = followedArtworksTab"
                >
                    <span class="q-ml-xs text-subtitle1">Theo dõi</span>

                    <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[8, 8]"
                    >
                        <strong class="text-subtitle2"
                            >Tác phẩm đang theo dõi</strong
                        >
                    </q-tooltip>
                </q-btn>

                <q-btn
                    id="favorite-tab"
                    square
                    dense
                    flat
                    no-caps
                    class="text-subtitle1 q-mr-sm penomy-tab"
                    :class="{ selected: selectedTab == followedCreatorsTab }"
                    @click="selectedTab = followedCreatorsTab"
                >
                    <q-icon name="face" size="sm" class="text-primary" />
                    <span class="q-ml-xs text-subtitle1">Theo dõi</span>

                    <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[8, 8]"
                    >
                        <strong class="text-subtitle2"
                            >Tác giả bạn theo dõi</strong
                        >
                    </q-tooltip>
                </q-btn>
            </div>
        </div>

        <!-- User Preference Tabs section -->
        <section class="q-mx-lg q-mt-md row">
            <q-tab-panels v-model="selectedTab" animated class="col-grow">
                <q-tab-panel :name="historyTab" class="q-pa-none q-py-xs">
                    <UserViewHistorySection />
                </q-tab-panel>

                <q-tab-panel :name="favoriteTab" class="q-pa-none q-py-xs">
                    <UserFavoriteArtworksSection />
                </q-tab-panel>

                <q-tab-panel
                    :name="followedArtworksTab"
                    class="q-pa-none q-py-xs"
                >
                    <UserFollowedArtworksSection />
                </q-tab-panel>

                <q-tab-panel
                    :name="followedCreatorsTab"
                    class="q-pa-none q-py-xs"
                >
                    <UserFollowedCreatorsSection />
                </q-tab-panel>
            </q-tab-panels>
        </section>
        <!-- User Preference Tabs section -->
    </section>
</template>

<script>
// Import components section.
import UserViewHistorySection from "./UserViewHistorySection.vue";
import UserFavoriteArtworksSection from "./UserFavoriteArtworksSection.vue";
import UserFollowedArtworksSection from "./UserFollowedArtworksSection.vue";
import UserFollowedCreatorsSection from "./UserFollowedCreatorsSection.vue";

export default {
    name: "UserPreferenceSection",
    components: {
        UserViewHistorySection,
        UserFavoriteArtworksSection,
        UserFollowedArtworksSection,
        UserFollowedCreatorsSection,
    },
    props: {
        userId: {
            required: true,
        },
    },
    data() {
        return {
            selectedTab: null,
        };
    },
    computed: {
        historyTab() {
            return "history";
        },
        favoriteTab() {
            return "favorite";
        },
        followedArtworksTab() {
            return "followed-artworks";
        },
        followedCreatorsTab() {
            return "followed-creators";
        },
    },
    beforeMount() {
        this.selectedTab = this.historyTab;
    },
};
</script>
