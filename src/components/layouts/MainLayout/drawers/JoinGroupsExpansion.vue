<template>
    <q-expansion-item
        default-opened
        label="Nhóm bạn đã tham gia"
        class="my-groups-expansion"
    >
    <div>
        <GroupLink/>
        <GroupLink/>
        <GroupLink/>
        <GroupLink/>
        <GroupLink/>
        <GroupLink/>
        <GroupLink/>
        <GroupLink/>
        <GroupLink/>
        <GroupLink/>
        <GroupLink/>
    </div>
    </q-expansion-item>
</template>

<script>
// Import dependencies section.
import { useAuthStore } from "src/stores/common/AuthStore";

// Import components section.
import GroupLink from "./GroupLink.vue";

// Init store for later operation.
const authStore = useAuthStore();

export default {
    name: "ForYouExpansion",
    components: {
        GroupLink
    },
    computed: {
        isAuth() {
            return authStore.isAuth;
        },
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
