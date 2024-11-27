<template>
    <q-item tag="a" class="flex flex-row items-center">
        <q-avatar>
            <q-img :src="memberInfo.avatarUrl" width="3rem" height="3rem" style="border-radius: 5px;" />
        </q-avatar>
        <div class="q-pl-md">
            <div class="text-bold group-name">
                {{ memberInfo.nickName }}
            </div>
            <span v-if="memberInfo.isManager" class="admin-tag">Quản trị viên</span>
            <div>Ngày tham gia: {{ memberInfo.joinedAt }}
                - Hoạt động lần cuối: {{ memberInfo.lastActiveAt }}
            </div>
        </div>

        <!-- actions -->
        <div class="q-ml-auto">
            <q-btn v-if="!memberInfo.isManager" color="grey-5" class="q-mr-sm" unelevated no-caps no-icon-animation
                label="Thêm bạn bè" />
            <q-btn-dropdown v-if="isGroupManager" color="grey-5" unelevated no-caps no-icon-animation
                dropdown-icon="more_horiz">
                <q-list>
                    <q-item clickable v-close-popup>
                        <q-item-section>
                            <q-item-label>Chinh sua</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="removeMemberDialog = true">
                        <q-item-section>
                            <q-item-label>Xoa thanh vien</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-btn-dropdown>
        </div>
    </q-item>
    
    <q-dialog v-model="removeMemberDialog" persistent>
        <q-card>
            <q-card-section class="row items-center">
                <q-avatar icon="person_remove" text-color="red" />
                <span class="q-ml-sm">Bạn chắc chắn muốn xóa thành viên này khỏi nhóm ?</span>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Hủy bỏ" color="primary" v-close-popup />
                <q-btn flat label="Xóa thành viên" color="red" v-close-popup @click="removeMember" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import GroupMemberApiHandler from 'src/api.handlers/social/social3Page/GroupMemberApiHandler';
import { NotificationHelper } from 'src/helpers/NotificationHelper';

const props = defineProps({
    groupId: {
        type: String,
        default: ""
    },
    isGroupManager: {
        type: Boolean,
        default: false
    },
    memberInfo: {
        type: Object,
        default: null
    }
})

// const toLink = `/social/group/${props.groupId}`

const emit = defineEmits(['removeMember']);
const isLoading = ref(false);
const isExecuting = ref(false);
const removeMemberDialog = ref(false);

const RemoveMemberApi = GroupMemberApiHandler.RemoveGroupMemberAsync;

async function removeMember() {
    isExecuting.value = true;
    var result = await RemoveMemberApi(
        props.groupId,
        props.memberInfo.userId
    )
    if (result.isSuccess) {
        NotificationHelper.notifySuccess("Xóa thành viên thành công");
        emit('removeMember', props.memberInfo.memberId);
    }
    else {
        NotificationHelper.notifyError("Đã có lỗi xảy ra!");
    }
    isExecuting.value = false;
}
</script>

<style scoped>
.admin-tag {
    padding: .2rem;
    background-color: #53bf9432;
    border-radius: 3px;
    color: var(--primary);
}
</style>