<template>
    <q-expansion-item default-opened label="Nhóm bạn đã tham gia" class="my-groups-expansion">
        <div>
            <GroupLink v-for="group in getShowedGroups" :key="group.id" :group="group" />
            <GroupLink v-if="groupList.length > 4" />
        </div>
    </q-expansion-item>
</template>

<script>

// Import api handler
import GetGroupsApiHandler from "src/api.handlers/social/social1Page/GetGroupsApiHandler";

// Import dependencies section.
import { useAuthStore } from "src/stores/common/AuthStore";

// Import components section.
import GroupLink from "./GroupLink.vue";

// Init store for later operation.
const authStore = useAuthStore();
// Init api handler for later operation.
const getGroupsApiHandler = GetGroupsApiHandler.GetJoinedGroupsAsync;


export default {
    name: "ForYouExpansion",
    components: {
        GroupLink
    },
    data() {
        return {
            groupList: [],
        };
    },
    computed: {
        isAuth() {
            return authStore.isAuth;
        },
        getShowedGroups() {
            if (this.groupList.length <= 3) return this.groupList;
            else
                return this.groupList.slice(0, 3);
        }
    },
    async mounted() {
        this.groupList = (await getGroupsApiHandler(5)).responseBody;
    },
};
</script>

<style scoped>
.my-groups-expansion {
    border-radius: 4px;
    background-color: #f9fafc !important;
    font-weight: bold !important;
}
</style>
