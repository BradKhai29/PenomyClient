<template>
    <div class="q-ml-xl q-mr-xl q-pa-md row justify-between">
        <span class="text-bold text-subtitle1">Tất cả các nhóm bạn đã tham gia ({{
            joinedGroups.length }})</span>
        <q-item tag="a" clickable class="text-bold text-subtitle1" to="/social/group/create"
            style="color: var(--primary);">
            <q-item-section>
                <q-icon name="add_circle" />
            </q-item-section>
            <span>Tạo nhóm của bạn</span>
        </q-item>

    </div>

    <!-- Other groups -->
    <div class="row justify-start items-start content-start q-ml-xl q-mr-xl">
        <GroupCard class="col-3" style="overflow: auto;" v-for="group in joinedGroups" :key="group.id"
            :group-info="group" />
    </div>
    <div class="q-ml-xl q-mr-xl q-mt-md q-pa-md">
        <span class="text-bold text-subtitle1">Nhóm bạn có thể thích</span>

    </div>
    <div class="row justify-start items-start content-start q-ml-xl q-mr-xl">
        <GroupCard class="col-3" style="overflow: auto;" v-for="group in unjoinedGroups" :key="group.id"
            :group-info="group" />
    </div>

    <div class="row justify-start items-start content-start q-ml-xl q-mr-xl" v-if="!isDataFetched">
        <MemberCardSkeleton class="col-3" v-for="i in 8" :key="i" />
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import GroupCard from 'src/components/common/socialMedia/GroupCard.vue'
import MemberCardSkeleton from 'src/components/common/socialMedia/MemberCardSkeleton.vue';
// import router, auth store
import { useAuthStore } from 'src/stores/common/AuthStore';
import { useRouter } from 'vue-router';
// import api handler
import GetGroupsApiHandler from "src/api.handlers/social/social1Page/GetGroupsApiHandler";
import MyCreatedGroupsApiHandler from 'src/api.handlers/social/social1Page/GetCreatedGroupsApiHandler';

// Init store for later operation.
const authStore = useAuthStore();
const router = useRouter();

// Init api handler for later operation.
const getGroupsApiHandler = GetGroupsApiHandler.GetJoinedGroupsAsync;
const myCreatedGroupsApiHandler = MyCreatedGroupsApiHandler.MyCreatedGroups;

// Init objects
const joinedGroups = ref([]);
const unjoinedGroups = ref([]);
const isDataFetched = ref(false);

onMounted(async () => {
    if (authStore.bearerAccessToken().length == 11) {
        router.push('/auth/login');
    }
    else {
        try {
            const getGroupRes = ((await getGroupsApiHandler(100)).responseBody);
            joinedGroups.value = getGroupRes.groups;
            unjoinedGroups.value = getGroupRes.unjoinedGroups;
            joinedGroups.value.push(...((await myCreatedGroupsApiHandler(100)).responseBody));
            isDataFetched.value = true;
        }
        catch (error) {
            console.error('Error fetching groups:', error);
        }

    }
})
</script>