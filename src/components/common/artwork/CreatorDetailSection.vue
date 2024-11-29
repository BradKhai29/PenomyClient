<template>
    <section
        id="creator-detail-bar"
        class="q-pa-md bg-light flex items-center justify-between"
    >
        <router-link
            :to="`/creator/${creatorId}`"
            class="text-decoration-none bg-light"
        >
            <q-btn dense flat padding="none" no-caps class="flex items-center">
                <q-avatar class="q-mr-sm" size="48px">
                    <img :src="creatorAvatarUrl" />
                </q-avatar>
                <div class="text-left">
                    <div class="text-subtitle1 text-weight-bold text-dark">
                        {{ creatorName }}
                    </div>
                    <div
                        class="text-subtitle2 text-weight-bold text-dark-500"
                        :aria-placeholder="`${creatorTotalFollowers} người theo dõi`"
                    >
                        {{ totalFollowersShort }} người theo dõi
                    </div>
                </div>
            </q-btn>
        </router-link>
        <div>
            <router-link v-if="isAuthor" :to="studioArtworkLink">
                <q-btn
                    class="bg-dark text-primary text-subtitle1 text-weight-bold"
                    no-caps
                    rounded
                >
                    <q-icon name="edit" size="xs" />
                    <span class="q-ml-xs">Sửa truyện</span>
                </q-btn>
            </router-link>
            <CreatorFollowButton v-else :creatorId="creatorId" />
        </div>
    </section>
</template>

<script>
// Import dependencies section.
import { useUserProfileStore } from "src/stores/common/UserProfileStore";
import CreatorFollowButton from "./buttons/CreatorDetailSection.FollowButton.vue";
import { NumberHelper } from "src/helpers/NumberHelper";

// Init store for later operation.
const userProfileStore = useUserProfileStore();

export default {
    name: "CreatorDetailSection",
    components: {
        CreatorFollowButton,
    },
    props: {
        isComic: {
            type: Boolean,
            default: true,
        },
        creatorId: {
            type: String,
            required: true,
        },
        creatorName: {
            type: String,
            required: true,
        },
        creatorAvatarUrl: {
            type: String,
            required: true,
        },
        creatorTotalFollowers: {
            type: Number,
            required: true,
        },
        artworkId: {
            required: true,
        },
    },
    data() {
        return {
            isCreator: false,
        };
    },
    computed: {
        isAuthor() {
            return this.creatorId == userProfileStore.currentUserId;
        },
        totalFollowersShort() {
            return NumberHelper.formatNumberShort(this.creatorTotalFollowers);
        },
        studioArtworkLink() {
            if (this.isComic) {
                return `/studio/comic/detail/${this.artworkId}`;
            }

            return `/studio/anime/detail/${this.artworkId}`;
        },
    },
};
</script>
