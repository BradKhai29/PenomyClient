<template>
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
                <q-btn label="Lưu" color="primary" :loading="isLoadingBtn" @click="onSubmit" />
            </div>
        </div>
        <q-separator />

        <div>
            <q-expansion-item>
                <template v-slot:header>
                    <q-item-section style="margin-left: -13px !important;">
                        <div class="text-bold text-subtitle1">Quyền riêng tư</div>
                        {{ newGroupInfo.isPublic ? 'Công khai' : 'Riêng tư' }}
                    </q-item-section>
                </template>

                <q-card>
                    <q-card-section class="row">
                        <q-avatar v-if="!groupInfo.isPublic" icon="lock" size="3rem" color="grey-4" class="q-mr-md" />
                        <q-avatar v-if="groupInfo.isPublic" icon="public" size="3rem" color="grey-4" class="q-mr-md" />
                        <div>
                            <div class="text-bold">{{ groupInfo.isPublic ? 'Công khai' : 'Riêng tư' }}</div>
                            {{ groupInfo.isPublic ? 'Ai cũng có thể ' : 'Chỉ thành viên mới ' }}nhìn thấy mọi người
                            trong nhóm và những
                            gì họ đăng.
                        </div>
                    </q-card-section>
                    <q-card-section v-if="!groupInfo.isPublic">
                        Để bảo vệ quyền riêng tư của thành viên nhóm, bạn không thể chuyển nhóm riêng tư thành
                        công khai.
                    </q-card-section>
                    <q-card-section v-if="groupInfo.isPublic">
                        Để bảo vệ quyền riêng tư của thành viên nhóm, bạn có thể chuyển nhóm công khai thành riêng tư.
                    </q-card-section>
                </q-card>
            </q-expansion-item>
        </div>
        <q-separator />

    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { useRoute } from "vue-router";
import UpdateGroupApiHandler from 'src/api.handlers/social/social2Page/UpdateGroupApiHandler';
import { NotificationHelper } from "src/helpers/NotificationHelper";

// import
const route = useRoute();
const groupLink = ref(`/social/group/${route.params.id}`);
const updateGroupApi = UpdateGroupApiHandler.UpdateGroupDescriptionAsync;

// objects
const props = defineProps({
    groupInfo: {
        type: Object,
        default: null
    }
})

const postOptions = ref([
    {
        value: false,
        label: "Tự do",
    },
    {
        value: true,
        label: "Yêu cầu phê duyệt",
    }
])

const newGroupInfo = ref({
    id: route.params.id,
    name: props.groupInfo.name,
    description: props.groupInfo.description,
    postMode:
        props.groupInfo.requireApprovedWhenPost ? "Yêu cầu phê duyệt" : "Tự do",
    isPublic: props.groupInfo.isPublic
});

// // Boolean variables
const isEditGroupSettings = ref(false);
const isLoadingBtn = ref(false);

// // funtions

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
        name: props.groupInfo.name,
        description: props.groupInfo.description,
        postMode: {
            label: props.groupInfo.requireApprovedWhenPost ? "Yêu cầu phê duyệt" : "Tự do",
            value: props.groupInfo.requireApprovedWhenPost
        }
    }
}
</script>

<style scoped>
.edit-section {
    margin: 1rem 18rem 0 18rem;
    background-color: white;
    border: 1px solid rgba(180, 180, 180, 0.599);
    border-radius: 8px;
}
</style>