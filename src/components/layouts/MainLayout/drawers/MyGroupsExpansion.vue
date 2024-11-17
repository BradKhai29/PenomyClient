<template>
    <q-expansion-item default-opened label="Nhóm do bạn quản lý" class="my-groups-expansion">
        <div>
            <GroupLink v-for="group in createdGroups" :key="group.id" :group="group" />
        </div>
    </q-expansion-item>
</template>

<script>
// Import dependencies section.
import { useAuthStore } from "src/stores/common/AuthStore";
import MyCreatedGroupsApiHandler from "src/api.handlers/social/social1Page/GetCreatedGroupsApiHandler";

// Import components section.
import GroupLink from "./GroupLink.vue";

// Init store for later operation.
const authStore = useAuthStore();
const myCreatedGroupsApiHandler = MyCreatedGroupsApiHandler.MyCreatedGroups;
export default {
    name: "ForYouExpansion",
    data() {
        return {
            createdGroups: [],
        };
    },
    components: {
        GroupLink
    },
    computed: {
        isAuth() {
            return authStore.isAuth;
        },
    },

    beforeMount() {
        this.getCreatedGroups();
    },
    methods: {
        async getCreatedGroups() {
            var res = await myCreatedGroupsApiHandler();
            this.createdGroups = res.responseBody;
        }
    }
};
</script>

<style scoped>
.my-groups-expansion {
    border-radius: 4px;
    background-color: #f9fafc !important;
    font-weight: bold !important;
}

.my-groups-expansion div {
    max-height: 30vh;
    overflow-y: auto;
}
</style>
