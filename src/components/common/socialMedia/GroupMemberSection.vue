<template>

    <div class="edit-section q-pa-sm">
        <q-expansion-item>
            <template v-slot:header>
                <q-item-section style="margin-left: -13px !important;">
                    <p class="text-h6 text-bold q-ml-sm">Thành viên nhóm</p>
                </q-item-section>
            </template>

            <q-card>
                <div v-for="(member, index) in members" :key="index">
                    <MemberCard :memberInfo="member" :groupId="route.params.id" :isGroupManager="isGroupManager"
                        @removeMember="onRemoveMember" />
                </div>
            </q-card>
        </q-expansion-item>

    </div>

</template>

<script setup>
import { ref, onBeforeMount, defineProps } from 'vue'
import GroupMemberApiHandler from 'src/api.handlers/social/social3Page/GroupMemberApiHandler';
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { useRoute } from 'vue-router';
import MemberCard from './MemberCard.vue';

const getMemberApi = GroupMemberApiHandler.GetGroupMemberAsync;
const members = ref([]);
const route = useRoute();

onBeforeMount(() => {
    getMemberAsync();
})

const props = defineProps({
    isGroupManager: {
        type: Boolean,
        default: false
    }
})

async function getMemberAsync() {
    const result = await getMemberApi(
        route.params.id
    );
    if (result.isSuccess) {
        members.value = result.responseBody.members;
    } else {
        NotificationHelper.notifyError(
            result.message ?? "Có lỗi xảy ra khi tạo"
        );
    }
}

function onRemoveMember(memberId) {
    members.value = members.value.filter(member => member.userId != memberId)
}
</script>