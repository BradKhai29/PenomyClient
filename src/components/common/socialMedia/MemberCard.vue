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
            <q-btn v-if="userProfileStore.currentUserId !== memberInfo.userId" color="primary" class="q-mr-sm"
                unelevated no-caps no-icon-animation label="Thêm bạn bè" />
            <q-btn-dropdown v-if="isGroupManager" color="grey-5" unelevated no-caps no-icon-animation
                dropdown-icon="more_horiz">
                <q-list>
                    <q-item clickable v-close-popup v-if="!memberInfo.isManager" @click="ChangeMemberRole">
                        <q-item-section>
                            <q-item-label>Mời làm quản trị viên</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup v-if="memberInfo.isManager" @click="ChangeMemberRole">
                        <q-item-section>
                            <q-item-label>Gỡ vai trò quản trị viên</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="removeMemberDialog = true">
                        <q-item-section>
                            <q-item-label>Xóa thành viên</q-item-label>
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
import { ref, defineProps, defineEmits, watch } from 'vue';
import GroupMemberApiHandler from 'src/api.handlers/social/social3Page/GroupMemberApiHandler';
import { NotificationHelper } from 'src/helpers/NotificationHelper';
import { useUserProfileStore } from 'src/stores/common/UserProfileStore';

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

// Local props variables
// const toLink = `/social/group/${props.groupId}`

const emit = defineEmits(['removeMember', 'changeRole']);
const userProfileStore = useUserProfileStore();
const isLoading = ref(false);
const isExecuting = ref(false);
const isChangeRole = ref(false);
const removeMemberDialog = ref(false);

const RemoveMemberApi = GroupMemberApiHandler.RemoveGroupMemberAsync;
const ChangeMemberRoleApi = GroupMemberApiHandler.ChangeMemberRoleAsync;

async function removeMember() {
    isExecuting.value = true;
    var result = await RemoveMemberApi(
        props.groupId,
        props.memberInfo.userId
    )
    if (result.isSuccess) {
        if (result.responseBody.statusCode == 4) {
            NotificationHelper.notifyError("Group must have at least one admin!");
            return;
        }
        NotificationHelper.notifySuccess("Xóa thành viên thành công");
        emit('removeMember', props.memberInfo.userId, props.memberInfo.isManager);
    }
    else {
        NotificationHelper.notifyError("Đã có lỗi xảy ra!");
    }
    isExecuting.value = false;
}

async function ChangeMemberRole() {
    isChangeRole.value = true

    var result = await ChangeMemberRoleApi(
        props.groupId,
        props.memberInfo.userId
    )
    if (result.responseBody.isSuccess) {
        NotificationHelper.notifySuccess("Thay đổi thành công");
        emit('changeRole', props.memberInfo.userId, !props.memberInfo.isManager);
    }
    else {
        NotificationHelper.notifyError("Đã có lỗi xảy ra!");
    }
    isChangeRole.value = false
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