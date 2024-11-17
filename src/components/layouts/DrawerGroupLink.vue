<template>
    <q-item clickable tag="a" :to="props.link" class="flex flex-row items-center app-drawer-link"
        :class="{ 'is-selected': isSelected }">
        <q-img v-if="props.createdAt" :src="props.image" width="3.6rem" height="3rem" style="border-radius: 5px;" />
        <div class="q-pl-md" v-if="props.createdAt">
            <div>
                {{ props.title }}
            </div>
            <span class="text-caption">Ngày tạo: {{ props.createdAt }}</span>
        </div>

        <!-- Create group link -->
        <div class="q-pl-sm" v-if="!props.createdAt">
            <q-icon name="add_circle" size="1.5rem"/>
            <span class="q-ml-sm">Tạo nhóm của bạn</span>
        </div>
    </q-item>
</template>

<script setup>
defineOptions({
    name: "DrawerLink",
});

const props = defineProps({
    title: {
        type: String,
        required: true,
    },

    link: {
        type: String,
        default: "#",
    },

    image: {
        type: String,
        default: "",
    },
    isSelected: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: String,
        default: "",
    }
});
</script>

<style scoped>
.app-drawer-link {
    --primary: #53bf94;
    --primary-700: #e5f3ef;
    --light: #f9fafc;
    --light-500: #dddddd;
    --dark: #120e36;

    color: var(--dark);
    font-weight: bold;
    border-radius: 4px;
}

.app-drawer-link:hover {
    background-color: var(--light) !important;
    border-left: 4px solid var(--dark) !important;
}

.app-drawer-link.is-selected {
    background-color: var(--primary-700) !important;
    border-left: 4px solid var(--primary) !important;
    border-radius: 4px;
    color: #53bf94;
}
</style>
