<template>
    <section
        id="creator-detail-bar"
        class="q-pa-md bg-light border-radius-md flex items-center justify-between"
    >
        <router-link
            :to="`/profile/creator/d/${creatorId}`"
            class="text-decoration-none bg-light"
        >
            <q-btn dense flat padding="none" no-caps class="flex items-center">
                <q-avatar class="q-mr-sm" size="48px">
                    <img src="https://cdn.quasar.dev/img/avatar.png" />
                </q-avatar>
                <div class="text-left">
                    <div class="text-subtitle1 text-weight-bold text-dark">
                        Penomy Official
                    </div>
                    <div class="text-subtitle2 text-weight-bold text-dark-500">
                        1N người theo dõi
                    </div>
                </div>
            </q-btn>
        </router-link>
        <div>
            <router-link
                v-if="isAuthor"
                :to="`/studio/comic/detail/${artworkId}`"
            >
                <q-btn
                    class="bg-dark text-primary text-subtitle1 text-weight-bold"
                    no-caps
                    rounded
                >
                    <q-icon name="edit" size="xs" />
                    <span class="q-ml-xs">Sửa thông tin truyện</span>
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

// Init store for later operation.
const userProfileStore = useUserProfileStore();

export default {
    name: "CreatorDetailSection",
    components: {
        CreatorFollowButton,
    },
    props: {
        creatorId: {
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
    },
};
</script>
