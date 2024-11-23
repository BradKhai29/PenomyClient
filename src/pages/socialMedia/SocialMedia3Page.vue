<template>
    <q-page style="background-color: rgb(249, 249, 249);">

        <!-- Description section -->
        <div v-if="route.path.indexOf('edit') == -1">
            <SocialGroupDescription :groupInfo="groupInfo" @updateCoverImage="updateGroupCoverImage" />
        </div>

        <!-- Edit section -->
        <div v-if="route.path.indexOf('edit') != -1" class="q-pt-md">
            <div class="edit-section q-pa-sm">
                <q-item clickable tag="a" :to="groupLink" class="flex flex-row items-center">
                    <q-img :src="groupInfo.coverPhotoUrl" width="3rem" height="3rem" style="border-radius: 5px;" />
                    <div class="q-pl-md">
                        <div class="text-bold group-name">
                            {{ groupInfo.name }}
                        </div>
                        <span v-if="groupInfo.isPublic">
                            <q-icon name="public" size="1rem" />
                            Nhóm công khai . </span>
                        <span v-if="!groupInfo.isPublic">
                            <q-icon name="lock" size="1rem" />
                            Nhóm riêng tư . </span>
                        <span>{{ groupInfo.totalMembers }} thành viên</span>
                    </div>
                </q-item>
            </div>

            <div class="edit-section q-mt-xl q-pa-md">
                <p class="text-h6 text-bold">Thiết lập nhóm</p>

                <div class="q-mt-md row justify-between">
                    <p class="text-bold text-subtitle1">Tên và mô tả</p>
                    <q-icon v-if="!isEditGroupSettings" name="edit" size="1.5rem" class="cursor-pointer"
                        @click="isEditGroupSettings = !isEditGroupSettings" />

                </div>
                <div v-if="isEditGroupSettings" class="q-mb-md">
                    <q-input v-model="newGroupInfo.name" class="q-mt-md" outlined label="Tên nhóm" :rules="[
                        val => val && val.length > 0 || 'Trường này không được trống!',
                        val => val && val.length <= 200 || 'Tối đa 200 ký tự',
                        val => val.match(/^\s*$/) == null || 'Không được nhập ký tự trống!']" />

                    <q-input v-model="newGroupInfo.description" class="q-mt-xs" outlined label="Mô tả" autogrow />

                    <q-select class="q-mt-md" ref="myPublicLevelDiv" outlined v-model="newGroupInfo.postMode"
                        :options="postOptions" label="Chế độ đăng bài" />

                    <div class="row justify-end q-mt-md">
                        <q-btn label="Hủy" color="grey-2" text-color="black" class="q-mr-md" @click="resetValue" />
                        <q-btn label="Lưu" color="primary" :loading="isLoadingBtn" @click="onSubmit"/>
                    </div>
                </div>
                <q-separator />

                <div>
                    <q-expansion-item>
                        <template v-slot:header>
                            <q-item-section style="margin-left: -13px !important;">
                                <div class="text-bold text-subtitle1">Quyền riêng tư</div>
                                {{ groupInfo.isPublic ? 'Công khai' : 'Riêng tư' }}
                            </q-item-section>
                        </template>

                        <q-card>
                            <q-card-section class="row">
                                <q-avatar icon="lock" size="3rem" color="grey-4" class="q-mr-md" />
                                <div>
                                    <div class="text-bold">Riêng tư</div>
                                    Chỉ thành viên mới nhìn thấy mọi người trong nhóm và những gì họ đăng.
                                </div>
                            </q-card-section>
                            <q-card-section>
                                Để bảo vệ quyền riêng tư của thành viên nhóm, bạn không thể chuyển nhóm riêng tư thành
                                công khai. Bạn sẽ quản lý
                                được ai có thể tìm và tham gia nhóm này thông qua các tùy chọn cài đặt Ẩn nhóm và Ai có
                                thể tham gia nhóm.
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>
                </div>
                <q-separator />

            </div>
        </div>

    </q-page>

</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import SocialGroupDescription from 'src/components/common/socialMedia/SocialGroupDescription.vue';
import GetGroupDescriptionApiHandler from 'src/api.handlers/social/social3Page/GetGroupDescriptionApiHandler';
import { NotificationHelper } from "src/helpers/NotificationHelper";
import UpdateGroupApiHandler from 'src/api.handlers/social/social2Page/UpdateGroupApiHandler';
import { useRoute } from "vue-router";

const getGroupApi = GetGroupDescriptionApiHandler.GetGroupDescription;
const updateGroupApi = UpdateGroupApiHandler.UpdateGroupDescriptionAsync;
const route = useRoute();
const groupLink = ref(`/social/group/${route.params.id}`);

// object variables
const groupInfo = ref({
    Object
});
const newGroupInfo = ref({
    id: route.params.id,
    name: "",
    description: "",
    postMode: {
        label: "Tự do",
        value: false
    },
})
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

// boolean variables
const isEditGroupSettings = ref(false);
const isLoadingBtn = ref(false);

onMounted(() => {
    getGroupDescription();
})

watch(
    () => route.path,
    () => {
        getGroupDescription();
    }
);

function updateGroupCoverImage() {
    groupInfo.value = newGroupInfo;
}

async function getGroupDescription() {
    // Get group description.
    const result = await getGroupApi(
        route.params.id
    );

    if (result.isSuccess) {
        groupInfo.value = result.responseBody;
        groupInfo.value.id = route.params.id
    } else {
        NotificationHelper.notifyError(
            result.message ?? "Có lỗi xảy ra khi tạo"
        );
    }
    resetValue();
}

async function onSubmit() {
    // Trim the group name.
    newGroupInfo.value.name = newGroupInfo.value.name.trim();
    newGroupInfo.value.name = newGroupInfo.value.name.replace(/\s+/g, " ");
    newGroupInfo.value.description = newGroupInfo.value.description.trim();
    
    isLoadingBtn.value = true
    // Get the result after creating group.
    const result = await updateGroupApi(
        newGroupInfo.value
    );

    if (result.isSuccess) {
        NotificationHelper.notifySuccess("Cập nhật thành công");

        // Close section after updating successfully.
        console.log(result.responseBody);
        isLoadingBtn.value = false
        isEditGroupSettings.value = false

        window.location.reload();
    } else {
        NotificationHelper.notifyError(
            result.message ?? "Có lỗi xảy ra khi tạo"
        );
    }
    isLoadingBtn.value = false
}

function resetValue() {
    isEditGroupSettings.value = false
    newGroupInfo.value = {
        id: route.params.id,
        name: groupInfo.value.name,
        description: groupInfo.value.description,
        postMode: {
            label: groupInfo.value.requireApprovedWhenPost ? "Yêu cầu phê duyệt" : "Tự do",
            value: groupInfo.value.requireApprovedWhenPost
        }
    }
}
</script>

<style scoped>
.text-small {
    font-size: 0.75rem;
}

.edit-section {
    margin: 1rem 18rem 0 18rem;
    background-color: white;
    border: 1px solid rgba(180, 180, 180, 0.599);
    border-radius: 8px;
}

.group-link {
    --primary: #53bf94;
    --primary-700: #e5f3ef;
    --light: #f9fafc;
    --light-500: #dddddd;
    --dark: #120e36;

    color: var(--dark);
    border-radius: 4px;
    background-color: white;
    margin-top: 2rem;
}

.group-name {
    font-size: 1rem;
}
</style>