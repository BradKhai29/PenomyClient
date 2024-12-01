<template>
    <GroupCard v-for="group in groups" :key="group.id" :group="group" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import GroupCard from './GroupCard.vue';
import MyCreatedGroupsApiHandler from 'src/api.handlers/social/social1Page/GetCreatedGroupsApiHandler';
import { NotificationHelper } from 'src/helpers/NotificationHelper';

const myCreatedGroupsApiHandler = MyCreatedGroupsApiHandler.MyCreatedGroups;

const groups = ref([]);

onMounted(() => {

    getCreatedGroups();
})

async function getCreatedGroups() {
    try {
        var res = await myCreatedGroupsApiHandler(100);
        if (res.isSuccess) {
            groups.value = res.responseBody;
        }
        else {
            NotificationHelper.notifyError("Đã có lỗi xảy ra!");
        }
    } catch {
        NotificationHelper.notifyError("Đã có lỗi xảy ra!");
    }
}
</script>