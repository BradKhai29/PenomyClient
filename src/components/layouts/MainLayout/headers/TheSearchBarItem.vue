<template>
    <li
        class="flex text-dark-500 justify-between search-item"
        @click="goToSearchLink"
    >
        <div class="flex items-center">
            <q-icon name="schedule" size="sm" />
            <span class="q-ml-sm text-subtitle1">{{ props.label }}</span>
        </div>
        <q-btn flat dense no-caps class="remove-button">Xóa</q-btn>
    </li>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
    label: {
        type: String,
        required: true,
        default: "Tìm kiếm gần đây",
    },
    link: {
        type: String,
        required: true,
        default: "#",
    },
});

const router = useRouter();

function goToSearchLink() {
    router.push(props.link);
}
</script>


<style scoped>
.remove-button,
.search-item {
    --light-300: #eeeeee;
    --light-500: #dddddd;
}

.search-item {
    padding: 4px;
    border-radius: 4px;
}

.search-item:hover {
    cursor: pointer;
    background-color: var(--light-300);
}

.remove-button {
    text-decoration: underline;
}

.remove-button:hover {
    background-color: var(--light-500);
}
</style>
