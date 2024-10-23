<template>
    <header class="header-highlight">
        <span> {{ label }} </span>
        <q-badge
            v-if="badgeLabel"
            class="q-py-xs bg-primary text-dark text-weight-bold"
        >
            {{ badgeLabel }}
        </q-badge>
    </header>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true,
        },
        badgeLabel: {
            type: String,
        },
    },
};
</script>

<style scoped>
.header-highlight span {
    --primary-700: #53bf94;

    padding: 4px 8px;
    border-left: 4px solid var(--primary-700);
    font-size: 16px;
}
</style>
