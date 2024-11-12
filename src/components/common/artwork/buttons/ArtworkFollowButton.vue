<template>
    <q-btn
        v-if="isAuth"
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
        <span v-else class="q-ml-xs flex items-center">
            <q-icon name="add_box" size="sm" />
            <span class="q-ml-sm"> Theo dõi </span>
        </span>

        <q-tooltip
            v-if="!isFollowed"
            anchor="top middle"
            self="bottom middle"
            :offset="[8, 8]"
        >
            <strong class="text-subtitle2"> Theo dõi tác phẩm </strong>
        </q-tooltip>
    </q-btn>
    <q-btn
        v-else
        class="text-subtitle1 text-weight-bold bg-light-300 text-dark"
        no-caps
        rounded
        @click="showDialog = true"
    >
        <span class="q-ml-xs flex items-center">
            <q-icon name="add_box" size="sm" />
            <span class="q-ml-sm"> Theo dõi </span>
        </span>
        <q-tooltip anchor="top middle" self="bottom middle" :offset="[8, 8]">
            <strong class="text-subtitle2"> Theo dõi tác phẩm </strong>
        </q-tooltip>

        <RequireLoginDialog v-model="showDialog" />
    </q-btn>
</template>

<script>
// Import dependencies section.
import { useAuthStore } from "src/stores/common/AuthStore";

// Import components section.
import RequireLoginDialog from "../../others/RequireLoginDialog.vue";

// Init store for later operation.
const authStore = useAuthStore();

export default {
    name: "ArtworkFollowButton",
    components: {
        RequireLoginDialog,
    },
    props: {
        artworkId: {
            required: true,
        },
    },
    data() {
        return {
            showDialog: false,
            isFollowed: false,
        };
    },
    computed: {
        isAuth() {
            return authStore.isAuth;
        },
    },
    methods: {
        toggleFollowArtwork() {
            this.isFollowed = !this.isFollowed;
        },
    },
};
</script>
