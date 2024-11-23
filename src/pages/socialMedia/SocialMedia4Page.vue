<template>
    <q-page>
        <div class="full-width edit-bg">123</div>
        <!-- <q-item clickable tag="a" :to="props.link" class="q-mt-md flex flex-row items-center group-link">
            <q-img :src="props.image" width="3rem" height="3rem" style="border-radius: 5px;" />
            <div class="q-pl-md">
                <div class="text-bold group-name">
                    {{ props.name }}
                </div>
                <span v-if="props.isPublic">
                    <q-icon name="public" size="1rem" />
                    Nhóm công khai . </span>
                <span v-if="!props.isPublic">
                    <q-icon name="lock" size="1rem" />
                    Nhóm riêng tư . </span>
                <span>{{ props.totalMembers }} thành viên</span>
            </div>
        </q-item> -->
    </q-page>
</template>

<script setup>
import { ref, defineProps } from 'vue';
defineOptions({
    name: "DrawerLink",
});

const props = defineProps({
    name: {
        type: String,
        required: true,
        default: "Group name",
    },
    isPublic: {
        type: Boolean,
        required: true,
        default: true,
    },
    totalMembers: {
        type: Number,
        required: true,
        default: 0,
    },
    link: {
        type: String,
        default: "#",
    },

    image: {
        type: String,
        default: "https://res.cloudinary.com/dps2s6w4a/image/upload/v1732191484/groups/cofnyyqkfu2nzreccaa3.jpg",
    },
});
</script>

<style scoped>
.edit-bg {
    /* padding: 0 12rem; */
    background-color: black;
}

/* .edit-section {
    padding: 0 12rem;
    background-color: rgb(249, 249, 249);
} */

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
