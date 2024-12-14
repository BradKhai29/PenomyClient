<template>
    <div class="q-pa-sm">
        <q-card flat bordered>
            <img :src="groupInfo.coverImgUrl">

            <div class="q-pa-md">
                <div class="text-bold text-subtitle1">{{ groupInfo.name }}</div>
                <div class="row justify-between">

                    <div>{{ groupInfo.totalMembers }} thành viên</div>
                    <div>{{ groupInfo.totalPosts }} bài viết</div>
                </div>
                <q-btn style="width: 100%;" color="primary" :to="toLink">Xem nhóm</q-btn>
            </div>
        </q-card>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    groupInfo: {
        type: Object,
        required: false
    }
})

const toLink = "/social/group/" + props.groupInfo.id
</script>