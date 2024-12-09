<template>
    <q-item
        :to="link"
        clickable
        tag="a"
        class="flex flex-row items-center app-drawer-link"
        :class="{ 'is-selected': isSelected }"
    >
        <q-icon :name="icon" size="24px" />
        <div class="q-pl-md">
            {{ title }}
        </div>

        <q-badge v-if="hasBadge" class="q-ml-md bg-primary flex items-center">
            <q-icon :name="badgeIcon" color="dark" size="xs" />
        </q-badge>

        <q-tooltip
            v-if="hasBadge"
            anchor="bottom middle"
            self="top middle"
            :offset="[8, 8]"
        >
            <strong class="text-subtitle2">{{ tooltipMessage }}</strong>
        </q-tooltip>
    </q-item>
</template>

<script>
export default {
    name: "DrawerLink",
    props: {
        title: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            default: "",
        },
        icon: {
            type: String,
            default: "",
        },
        isSelected: {
            type: Boolean,
            default: false,
        },
        hasBadge: {
            type: Boolean,
            default: false,
        },
        badgeIcon: {
            type: String,
            default: "info",
        },
        tooltipMessage: {
            type: String,
            default: "Có tác phẩm tạm xóa",
        },
    },
};
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
