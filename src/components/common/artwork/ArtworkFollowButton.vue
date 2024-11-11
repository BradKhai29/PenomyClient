<template>
    <q-btn
        @click="toggleFollowArtwork"
        class="text-subtitle1 text-weight-bold"
        :class="isFollowed ? 'bg-dark text-light' : 'bg-light-300 text-dark'"
        no-caps
        rounded
    >
        <span v-if="isFollowed" class="q-ml-xs flex items-center">
            <q-icon name="add_box" size="sm" class="text-primary" />
            <span class="q-ml-sm"> Đã theo dõi </span>
        </span>
        <span v-else class="q-ml-xs"> Theo dõi </span>

        <q-tooltip
            v-if="!isFollowed"
            anchor="top middle"
            self="bottom middle"
            :offset="[8, 8]"
        >
            <strong class="text-subtitle2"> Theo dõi tác phẩm </strong>
        </q-tooltip>
    </q-btn>
</template>

<script>
// Import dependencies section.
import { useUserProfileStore } from "src/stores/common/UserProfileStore";

export default {
    name: "ArtworkFollowButton",
    props: {
        artworkId: {
            required: true,
        },
    },
    data() {
        return {
            isFollowed: false,
        };
    },
    methods: {
        toggleFollowArtwork() {
            this.isFollowed = !this.isFollowed;
        },
    },
};
</script>
