<template>
    <q-btn
        v-if="isAuth"
        @click="toggleFollowCreator"
        class="text-subtitle1 text-weight-bold"
        :class="isFollowed ? 'bg-dark text-light' : 'bg-light-300 text-dark'"
        no-caps
        rounded
    >
        <span v-if="isFollowed" class="q-ml-xs flex items-center">
            <q-avatar size="sm" class="bg-primary text-dark">
                <q-icon name="check" size="xs" />
            </q-avatar>
            <span class="q-ml-xs"> Theo dõi </span>
        </span>
        <span v-else class="q-ml-xs"> Theo dõi </span>
        <q-tooltip anchor="top middle" self="bottom middle" :offset="[8, 8]">
            <strong v-if="isFollowed" class="text-subtitle2">
                Đã theo dõi
            </strong>
            <strong v-else class="text-subtitle2"> Theo dõi tác giả </strong>
        </q-tooltip>
    </q-btn>
    <q-btn
        v-else
        class="text-subtitle1 text-weight-bold bg-light-300 text-dark"
        @click="showDialog = true"
        no-caps
        rounded
    >
        Theo dõi
        <q-tooltip anchor="top middle" self="bottom middle" :offset="[8, 8]">
            <strong class="text-subtitle2"> Theo dõi tác giả </strong>
        </q-tooltip>
    </q-btn>
    <RequireLoginDialog v-if="!isAuth" v-model="showDialog" />
</template>

<script>
// Import dependencies section.
import { useAuthStore } from "src/stores/common/AuthStore";

// Import components section.
import RequireLoginDialog from "../../others/RequireLoginDialog.vue";

// Init store for later operation.
const authStore = useAuthStore();

export default {
    name: "CreatorFollowButton",
    components: {
        RequireLoginDialog,
    },
    props: {
        creatorId: {
            required: true,
        },
    },
    data() {
        return {
            isFollowed: false,
            showDialog: false,
        };
    },
    computed: {
        isAuth() {
            return authStore.isAuth;
        },
    },
    methods: {
        toggleFollowCreator() {
            this.isFollowed = !this.isFollowed;
        },
    },
};
</script>
