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
                        @removeMember="onRemoveMember" @changeRole="onChangeRole" />
                </div>
            </q-card>
        </q-expansion-item>

    </div>

</template>

<script setup>
import { ref, onBeforeMount, defineProps, watch, defineEmits } from 'vue'
import GroupMemberApiHandler from 'src/api.handlers/social/social3Page/GroupMemberApiHandler';
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { useRoute } from 'vue-router';
import MemberCard from './MemberCard.vue';

const getMemberApi = GroupMemberApiHandler.GetGroupMemberAsync;
const members = ref([]);
const route = useRoute();

const emit = defineEmits(['removeMember'])
const props = defineProps({
    isGroupManager: {
        type: Boolean,
        default: false
    },
    groupMemberCount: {
        type: Number,
        default: 0
    }
})

onBeforeMount(() => {
    getMemberAsync();
})

watch(
    () => props.groupMemberCount,
    () => {
        getMemberAsync();
    }
);

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
    emit('removeMember')
}

function onChangeRole(memberId, newRole) {
    members.value.find(member => member.userId == memberId).isManager = newRole
}
</script>