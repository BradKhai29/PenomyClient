<template>
    <section v-if="isEditCoverImage" class="action-buttons">
        <q-btn class="q-pa-sm" color="negative" @click="onCanelImage" no-caps>Hủy</q-btn>
        <q-btn class="q-pa-sm" :loading="isLoadingImageBtn" color="primary" @click="onSubmit" no-caps>Lưu thay
            đổi</q-btn>
    </section>
    <div class="group-header">
        <div>
            <q-img v-if="!isEditCoverImage" :src="groupInfo.coverPhotoUrl" width="100%" height="29rem"
                style="border-radius: 0 0 5px 5px">
                <div v-if="groupInfo.isManager" class="absolute-bottom-right text-subtitle2 q-mb-lg q-mr-md"
                    style="padding: 0;">
                    <q-btn-dropdown color="grey" icon="edit" label="Chỉnh sửa">
                        <q-item clickable v-close-popup @click="LoadUpdateCoverImageSection">
                            <q-item-section>
                                <q-item-label>
                                    <q-icon class="q-mr-sm" size="1.5rem" name="upload" />Tải ảnh lên
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-btn-dropdown>
                </div>
            </q-img>
            <!-- <div :class="newCoverPhotoUrl == '' ? 'hidden' : ''"> -->
            <social-cover-image-input v-if="isEditCoverImage" :isEditGroupImage="isEditCoverImage"
                v-model="newCoverPhotoUrl" ref="coverImageInput" />
            <!-- </div> -->
        </div>
        <div class="q-pa-md">
            <p v-if="groupInfo.groupName != ''" class="text-bold text-h4">{{
                groupInfo.name }}
            </p>
            <div class="row justify-between items-center">
                <div>
                    <span v-if="groupInfo.isPublic">
                        <q-icon name="public" size="1rem" />
                        Nhóm công khai . </span>
                    <span v-if="!groupInfo.isPublic">
                        <q-icon name="lock" size="1rem" />
                        Nhóm riêng tư . </span>
                    <span class="preview-content-1 text-weight-bold">{{ groupInfo.totalMembers }} thành viên</span>
                </div>

                <!-- Group Button -->
                <div class="row q-gutter-md">
                    <div v-if="!groupInfo.isManager">
                        <q-btn :loading="isLoadingJoinBtn" @click="JoinGroupAsync"
                            v-if="(!hasJoinGroup && !hasSendJoinRequest)" color="primary">Tham
                            gia</q-btn>

                        <q-btn :loading="isLoadingCancelBtn" v-if="hasSendJoinRequest" color="grey"
                            @click="CancelJoinRequestAsync">Hủy
                            yêu cầu</q-btn>

                        <q-btn-dropdown v-if="hasJoinGroup" icon="how_to_reg" color="primary" label="Đã tham gia" />
                    </div>

                    <q-btn v-if="groupInfo.isManager" :to="editUrl" color="primary" icon="settings"
                        label="Quản lý nhóm" />

                    <q-btn color="grey-4" text-color="black" icon="keyboard_arrow_down" />
                </div>
            </div>

            <q-separator class="q-mt-lg" />

            <q-btn v-for="button in tabButtons" :key="button" class="q-mt-md q-mr-md preview-content-1 text-weight-bold"
                flat no-caps :label="button" />
        </div>
    </div>

    <div class="group-body">
        <div class="q-pa-lg row q-gutter-md justify-center"
            :class="groupInfo.isPublic || groupInfo.hasJoin ? 'group-body-padding' : ''">

            <!-- Post -->
            <div v-if="groupInfo.isPublic || groupInfo.hasJoin" class="col-7 q-pq-md">
                <q-item tag="div" class="post-bg" style="">
                    <div style="height: 6rem;" class="row items-center">
                        <q-avatar size="2.5rem" class="q-mr-md row items-center">
                            <img :src="userProfileStore.userProfile.avatarUrl" />
                        </q-avatar>
                    </div>
                    <q-item-section>
                        <q-input dense rounded outlined v-model="postContent" bg-color="grey-3"
                            label="Bạn đang nghĩ gì?" />
                    </q-item-section>
                </q-item>
            </div>

            <!-- Description -->
            <div class="col-4" style="background-color: white; border-radius: 5px;">
                <p style="margin: 0;" class="text-subtitle1 q-pl-md q-pt-md">Giới thiệu</p>
                <q-item v-if="groupInfo.description != ''" tag="div">
                    {{ groupInfo.description }}
                </q-item>
                <q-item style="padding-top: 0;" tag="div">
                    <q-icon class="q-mr-sm" :name="groupInfo.isPublic ? 'public' : 'lock'" size="1.5rem" />
                    <q-item-section>
                        <p class="text-bold" style="margin: 0;">
                            {{ groupInfo.isPublic ? 'Công khai' : 'Riêng tư' }}</p>

                        <span v-if="!groupInfo.isPublic">Chỉ thành viên
                            mới nhìn thấy mọi người trong nhóm và những gì họ đăng.</span>
                        <span v-if="groupInfo.isPublic">Bất kỳ ai cũng có thể nhìn thấy mọi người trong nhóm
                            và những gì họ đăng.</span>
                    </q-item-section>
                </q-item>
                <q-item tag="div">
                    <q-icon class="q-mr-sm" name="visibility" size="1.5rem" />
                    <q-item-section>
                        <p class="text-bold" style="margin: 0;">Chế độ xem</p>
                        Ai cũng có thể tìm thấy nhóm này.
                    </q-item-section>
                </q-item>

                <q-item v-if="!groupInfo.isPublic && !groupInfo.hasJoin" tag="div">
                    <q-icon class="q-mr-sm" name="groups" size="1.5rem" />
                    <q-item-section>
                        <p class="text-bold" style="margin: 0;">Thành viên</p>
                        {{ groupInfo.totalMembers }} người
                    </q-item-section>
                </q-item>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, defineProps, watch } from 'vue';
import { useUserProfileStore } from 'src/stores/common/UserProfileStore';
import { useRoute } from "vue-router";
import { useAuthStore } from 'src/stores/common/AuthStore';
import SocialCoverImageInput from 'src/components/common/socialMedia/SocialCoverImageInput.vue';
import UpdateGroupApiHandler from 'src/api.handlers/social/social2Page/UpdateGroupApiHandler';
import { NotificationHelper } from "src/helpers/NotificationHelper";
import JoinRequestApiHandler from 'src/api.handlers/social/social3Page/JoinRequestApiHandler';
import { defineEmits } from 'vue';

const isLoadingImageBtn = ref(false);
const isLoadingJoinBtn = ref(false);
const isLoadingCancelBtn = ref(false);
const hasSendJoinRequest = ref(false);

const route = useRoute();
const profileStore = useUserProfileStore();
const userProfileStore = useUserProfileStore();
const authStore = useAuthStore();

// Define apis
const updateImageApi = UpdateGroupApiHandler.UpdateGroupCoverImageAsync;
const requestJoinGroupApi = JoinRequestApiHandler.JoinGroupAsync;
const cancelRequestJoinGroupApi = JoinRequestApiHandler.CancelJoinRequestAsync;
const JoinGroupApi = JoinRequestApiHandler.AcceptJoinRequestAsync;
const emit = defineEmits(['updateCoverImage']);

const props = defineProps({
    groupInfo: {
        type: Object,
        required: true,
        default: () => ({
            id: "",
            name: "",
            description: "",
            isPublic: false,
            hasJoin: false,
            totalMembers: 0,
            coverPhotoUrl: "",
            hasRequestJoin: false
        })
    }
});


const newCoverPhotoUrl = ref('');
const editUrl = ref('');
const postContent = ref('');
const coverImageInput = ref(null)

const editBtnClickedCount = ref(0);
let isValidInput = ref(null)
const isEditCoverImage = ref(false)
const hasJoinGroup = ref(false);

const tabButtons = ref([
    "Giới thiệu", "Bài viết", "Thành viên", "Sự kiện"
])

watch(
    () => props.groupInfo,
    () => {
        hasJoinGroup.value = props.groupInfo.hasJoin;
        hasSendJoinRequest.value = props.groupInfo.hasRequestJoin
        isEditCoverImage.value = false
        editUrl.value = `${route.path}/manage`.replace('//', '/')
    })

function LoadUpdateCoverImageSection() {
    isEditCoverImage.value = true
    editBtnClickedCount.value += 1;
}

async function onSubmit() {
    verifyInput();
    if (isValidInput.value == 1) {
        isLoadingImageBtn.value = true
        // Get the result after creating group.
        const result = await updateImageApi(
            props.groupInfo.id,
            newCoverPhotoUrl.value
        );

        if (result.isSuccess) {
            NotificationHelper.notifySuccess("Thay đổi thành công");

            // Change cover image after updating successfully.
            // emit('updateCoverImage', { ...props.groupInfo, coverPhotoUrl: result.responseBody });
            window.location.reload();
            // newCoverPhotoUrl.value = '';
        } else {
            NotificationHelper.notifyError(
                result.message ?? "Có lỗi xảy ra"
            );
        }
        isLoadingImageBtn.value = false
    }
}

function verifyInput() {
    isValidInput.value = coverImageInput.value.verifyInput();
}

function onCanelImage() {
    newCoverPhotoUrl.value = '';
    editBtnClickedCount.value = 0
    isEditCoverImage.value = false
}

async function JoinGroupAsync() {
    console.log(await authStore.isAuthAsync());
    if (!await authStore.isAuthAsync()) {
        route.push("auth/login");
    }
    if (!props.groupInfo.isPublic) {

        isLoadingJoinBtn.value = true;
        const result = await requestJoinGroupApi(props.groupInfo.id);

        if (result.isSuccess) {
            NotificationHelper.notifySuccess("Đã gửi yêu cầu");
            hasSendJoinRequest.value = true
        } else {
            NotificationHelper.notifyError(
                result.message ?? "Có lỗi xảy ra"
            );
        }
        isLoadingJoinBtn.value = false
    } else {
        isLoadingJoinBtn.value = true;

        const result = await JoinGroupApi(props.groupInfo.id, profileStore.currentUserId);

        if (result.isSuccess) {
            // NotificationHelper.notifySuccess("");
            hasJoinGroup.value = true
        } else {
            NotificationHelper.notifyError(
                result.message ?? "Có lỗi xảy ra"
            );
        }
        isLoadingJoinBtn.value = false
    }
}


async function CancelJoinRequestAsync() {

    isLoadingCancelBtn.value = true;
    const result = await cancelRequestJoinGroupApi(props.groupInfo.id);
    if (result.responseBody.isSuccess) {
        NotificationHelper.notifySuccess("Đã hủy yêu cầu");
        hasSendJoinRequest.value = false
    } else {
        NotificationHelper.notifyError(
            result.message ?? "Có lỗi xảy ra"
        );
    }
    isLoadingCancelBtn.value = false
}
</script>

<style scoped>
.text-small {
    font-size: 0.75rem;
}

.group-header {
    background-color: white;
    padding: 0 12rem;
}

.preview-content-1 {
    color: rgb(121, 118, 118);
}

.post-bg {
    background-color: rgb(249, 249, 249);
    border-radius: 5px;
    height: 7rem;
}

.group-body {
    background-color: rgb(242, 244, 247);
    width: 100%;
}

.group-body-padding {
    padding: 0 12rem;
}

.hidden {
    visibility: hidden;
}

.action-buttons {
    display: flex;
    justify-content: flex-end;
    padding: 10px 20px;
    position: absolute;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.593);
    width: 100%;
    gap: 1rem;
}
</style>