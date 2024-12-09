<template>
    <section id="user-followed-creators-section">
        <!-- Followed Creators section -->
        <div class="flex items-center q-mb-sm" id="button-group">
            <q-btn
                dense
                no-caps
                unelevated
                class="flex items-center bg-dark text-light text-subtitle1 border-radius-sm q-px-sm q-mr-sm"
            >
                <span>Đã theo dõi</span>
                <span class="q-ml-xs">({{ totalCreators }})</span>
            </q-btn>
        </div>

        <div class="row q-mt-md" v-if="!isLoading">
            <q-tab-panels v-model="selectedTab" animated class="col-grow">
                <q-tab-panel
                    :name="followedCreatorsTab"
                    class="q-pa-none q-py-xs row"
                >
                    <div v-if="totalCreators != 0" class="row col-grow q-px-xs">
                        <div
                            class="view-history-card-wrapper"
                            v-for="(creator, index) in followedCreators"
                            :key="creator.id"
                        >
                            <FollowedCreatorCard
                                :creatorDetail="creator"
                                :bearerAccessToken="bearerAccessToken()"
                                class="q-mb-md"
                                :class="
                                    index != followedCreators.length - 1
                                        ? 'q-mr-md'
                                        : ''
                                "
                            />
                        </div>
                    </div>
                    <div
                        v-else-if="totalCreators == 0"
                        class="col-grow q-mx-xs q-pa-md bg-light-100 shadow-1 border-radius-sm flex justify-center text-dark-500"
                    >
                        <div class="column items-center">
                            <q-icon name="face" size="120px"></q-icon>
                            <span class="text-subtitle1">
                                Bạn chưa theo dõi ai cả
                            </span>
                        </div>
                    </div>
                </q-tab-panel>
            </q-tab-panels>
        </div>
        <!-- Followed Creators section -->
    </section>
</template>

<script>
// Import dependencies section.
import { FollowCreatorApiHandler } from "src/api.handlers/artwork/artwork3Page/FollowCreatorApiHandler";

// Import components section.
import FollowedCreatorCard from "../../profile/FollowedCreatorCard.vue";
import { FollowedCreatorProfileResponseItem } from "src/api.models/userProfile/userProfile1Page/FollowedCreatorProfileResponseItem";

// Init store for later operation.
import { useAuthStore } from "src/stores/common/AuthStore";
import { NotificationHelper } from "src/helpers/NotificationHelper";
const authStore = useAuthStore();

// Components support constants.
const FOLLOWED_CREATORS_TAB = "followed_creators";

export default {
    name: "UserFollowedCreatorsSection",
    components: {
        FollowedCreatorCard,
    },
    data() {
        return {
            isLoading: true,
            selectedTab: FOLLOWED_CREATORS_TAB,
            /**
             * @type {FollowedCreatorProfileResponseItem[]} The type of this list.
             */
            followedCreators: [],
        };
    },
    computed: {
        followedCreatorsTab() {
            return FOLLOWED_CREATORS_TAB;
        },
        totalCreators() {
            return this.followedCreators.length;
        },
    },
    mounted() {
        this.loadFollowedCreatorsAsync();
    },
    methods: {
        bearerAccessToken() {
            return authStore.bearerAccessToken();
        },
        async loadFollowedCreatorsAsync() {
            const pageNumber = 1;

            const followedCreatorList =
                await FollowCreatorApiHandler.getAllFollowedCreatorsAsync(
                    authStore.bearerAccessToken(),
                    pageNumber
                );

            if (followedCreatorList) {
                this.followedCreators.push(...followedCreatorList);
            } else {
                NotificationHelper.notifyError("Có lỗi xảy ra khi gọi API");
            }

            this.isLoading = false;
        },
    },
};
</script>
