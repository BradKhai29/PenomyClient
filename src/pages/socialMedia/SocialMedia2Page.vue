<template>
    <q-page class="row">
        <div class="background-white q-pa-md">
            <q-breadcrumbs class="text-brown">
                <template v-slot:separator>
                    <q-icon size="1em" name="chevron_right" color="primary" />
                </template>

                <q-breadcrumbs-el class="text-small" label="Nhóm" />
                <q-breadcrumbs-el class="text-small" label="Tạo nhóm" />
            </q-breadcrumbs>
            <p class="text-h5 text-bold">Tạo nhóm</p>

            <div class="q-mt-md row">
                <q-avatar size="2.3rem">
                    <img :src="userProfileStore.userProfile.avatarUrl">
                </q-avatar>
                <div class="q-ml-md">
                    <span class="text-subtitle2 text-weight-bold">{{ userProfileStore.userProfile.nickname }}</span>
                    <p class="text-caption">Quản trị viên</p>
                </div>
            </div>

            <q-form @submit="onSubmit" style="height:80%;">
                <div class="q-mt-md group-infor">

                    <q-input model-value="" class="q-mb-md" outlined v-model="groupInfo.groupName" label="Tên nhóm *"
                        lazy-rules :rules="[val => val && val.length > 0 || 'Trường này không được trống!',
                        val => val && val.length <= 200 || 'Tối đa 200 ký tự',
                        val => val.match(/^\s*$/) == null || 'Không được nhập ký tự trống!']" />
                    <q-input class="q-mb-lg" outlined v-model="groupInfo.groupDescription"
                        label="Mô tả (Không bắt buộc)" />

                    <q-select class="q-mb-md" ref="myPublicLevelDiv" outlined v-model="groupInfo.isPublic"
                        :options="publicLevelOptions" label="Chọn quyền riêng tư *" lazy-rules
                        :rules="[val => val && val.length != '' || 'Trường này không được trống!']">
                        <template v-slot:option="scope">
                            <!-- Custom option template -->
                            <q-item v-bind="scope.itemProps" style="width: 332px;">
                                <q-item-section avatar>
                                    <q-icon :name="scope.opt.icon" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                                    <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </template>
                        <template v-if="groupInfo.isPublic != ''" v-slot:prepend>
                            <q-icon :name="groupInfo.isPublic.icon" />
                        </template>
                    </q-select>

                    <q-select ref="myPublicLevelDiv" outlined v-model="groupInfo.postMode" :options="postOptions"
                        label="Chế độ đăng bài"/>
                </div>

                <div class="row q-pt-sm q-gutter-sm group-buttons">
                    <q-btn :disable="isLoadingBtn" icon="close" @click="router.back()" color="negative" />
                    <q-item-section>
                        <q-btn type="submit" :disable="groupInfo.groupName == '' || groupInfo.isPublic == ''"
                            label="Tạo nhóm" color="primary" :loading="isLoadingBtn" />
                    </q-item-section>
                </div>
            </q-form>
        </div>

        <!-- Preview -->
        <div class="col background-dark-100">
            <div class="group-preview q-pa-md">
                <div class="text-subtitle2">Xem trước trên máy tính
                    <span v-if="isValidInput == false" class="text-red text-bold">Vui lòng chọn ảnh bìa!</span>
                </div>
                <div class="main-preview q-mt-md">

                    <social-cover-image-input v-model="groupInfo.coverImage" ref="coverImageInput" />

                    <div class="q-pa-md">
                        <p v-if="groupInfo.groupName == ''" class="text-bold text-h4 preview-content">Tên nhóm</p>
                        <p v-if="groupInfo.groupName != ''" class="text-bold text-h4 preview-content">{{
                            groupInfo.groupName }}
                        </p>
                        <span v-if="groupInfo.isPublic == ''" class="preview-content">Quyền riêng tư của nhóm .
                        </span>
                        <span v-if="groupInfo.isPublic.id == 1" class="preview-content">
                            <q-icon name="public" size="1rem" />
                            Nhóm công khai . </span>
                        <span v-if="groupInfo.isPublic.id == 2" class="preview-content">
                            <q-icon name="lock" size="1rem" />
                            Nhóm riêng tư . </span>
                        <span class="preview-content-1 text-weight-bold">1 thành viên</span>
                        <q-separator class="q-mt-lg" />
                        <q-btn v-for="button in tabButtons" :key="button"
                            class="q-mt-md q-mr-md preview-content-1 text-weight-bold" flat disable no-caps
                            :label="button" />
                    </div>
                    <div class="preview-bg">
                        <div class="q-pa-lg row q-gutter-md">
                            <div class="col-7 q-pq-md">
                                <q-item tag="div" class="preview-content preview-post-bg" style="padding-left: 0px;">
                                    <q-avatar icon="account_circle" size="4.5rem" />
                                    <q-item-section><q-input disable dense rounded outlined v-model="emptyProps"
                                            bg-color="grey-4" label="Bạn đang nghĩ gì?" /></q-item-section>
                                </q-item>
                            </div>
                            <div class="col" style="background-color: white; border-radius: 5px;">
                                <p style="margin: 0;" class="text-subtitle1 q-pl-md q-pt-md">Giới thiệu</p>
                                <q-item style="padding-top: 0;" v-if="groupInfo.isPublic != ''" tag="div">
                                    <q-icon class="q-mr-sm" :name="groupInfo.isPublic.icon" size="1.5rem" />
                                    <q-item-section>
                                        <p class="text-bold" style="margin: 0;">{{ groupInfo.isPublic.label }}</p>
                                        {{ groupInfo.isPublic.description }}
                                    </q-item-section>
                                </q-item>
                                <q-item v-if="groupInfo.isPublic != ''" tag="div">
                                    <q-icon class="q-mr-sm" name="visibility" size="1.5rem" />
                                    <q-item-section>
                                        <p class="text-bold" style="margin: 0;">Chế độ xem</p>
                                        Ai cũng có thể tìm thấy nhóm này.
                                    </q-item-section>
                                </q-item>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </q-page>

</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useUserProfileStore } from 'src/stores/common/UserProfileStore';
import SocialCoverImageInput from 'src/components/common/socialMedia/SocialCoverImageInput.vue';
import CreateGroupApiHandler from 'src/api.handlers/social/social2Page/CreateGroupApiHandler';
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { useAuthStore } from 'src/stores/common/AuthStore';
import { useRouter } from 'vue-router';
import { route } from 'quasar/wrappers';

const userProfileStore = useUserProfileStore();
const authStore = useAuthStore();
const createGroupApi = CreateGroupApiHandler.CreateGroup;
const router = useRouter();
const emptyProps = ref('');
const isLoadingBtn = ref(false)
const groupInfo = ref({
    groupName: '',
    groupDescription: '',
    isPublic: '',
    postMode: {
        label: "Tự do",
        value: false
    },
    coverImage: null
})
const coverImageInput = ref(null)
let isValidInput = ref(null)
const myPublicLevelDiv = ref(null)
const publicLevelOptions = ref([{
    id: 1,
    label: 'Công khai',
    description: 'Bất kỳ ai cũng có thể trông thấy mọi người trong nhóm và những gì họ đăng.',
    icon: 'public',
    value: true
},
{
    id: 2,
    label: 'Riêng tư',
    description: 'Chỉ thành viên trong nhóm mới có thể trông thấy mọi người trong nhóm và những gì họ đăng.',
    icon: 'lock',
    value: false
},
]);
const postOptions = ref([
    {
        label: "Tự do",
        value: false
    },
    {
        label: "Yêu cầu phê duyệt",
        value: true
    }
])
const tabButtons = ref([
    "Giới thiệu", "Bài viết", "Thành viên", "Sự kiện"
])

onMounted(() => {
    setTimeout(() => {
        if (!authStore.isAuth) router.push('/auth/login');
    }, 25);
})

/**
 * Handle the event when the user submits the create group form.
 * @param {object} groupInfo The object contains the group information that the user inputs.
 * @returns {Promise<void>} The promise that resolves when the group is created successfully.
 */
async function onSubmit() {
    // Trim the group name.
    groupInfo.value.groupName = groupInfo.value.groupName.trim();
    groupInfo.value.groupName = groupInfo.value.groupName.replace(/\s+/g, " ");
    groupInfo.value.groupDescription = groupInfo.value.groupDescription.trim();
    verifyInput();
    
    if (isValidInput.value == 1) {
        isLoadingBtn.value = true
        // Get the result after creating group.
        const result = await createGroupApi(
            groupInfo.value
        );

        if (result.isSuccess) {
            NotificationHelper.notifySuccess("Đã tạo thành công");

            // Redirect to the group detail page after creating success.
            router.push(`/social/group/${result.responseBody}`);
        } else {
            NotificationHelper.notifyError(
                result.message ?? "Có lỗi xảy ra khi tạo"
            );
        }
        isLoadingBtn.value = false
    }

}

function verifyInput() {
    isValidInput.value = coverImageInput.value.verifyInput();
}
</script>

<style scoped>
.background-white {
    background-color: white;
    box-shadow: 5px 0px 10px 0px rgba(0, 0, 0, 0.1);
    width: 21vw;
}

.background-dark-100 {
    background-color: rgba(124, 123, 123, 0.1);
    padding: 2rem 12rem;
}

.text-small {
    font-size: 0.75rem;
}

.group-infor {
    height: 94%;
}

.group-buttons {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.group-preview {
    background-color: white;
    box-shadow: 0 0px 10px 5px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    overflow-y: auto;
    max-height: 85vh;
}

.main-preview {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}

.preview-content {
    color: rgb(176, 175, 175);
}

.preview-content-1 {
    color: rgb(121, 118, 118);
}

.preview-post-bg {
    background-color: rgb(249, 249, 249);
    border-radius: 5px;
}

.preview-bg {
    background-color: rgb(242, 244, 247);
}
</style>