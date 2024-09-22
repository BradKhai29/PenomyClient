<template>
    <header class="header-highlight">
        <span> {{ label }} </span>
    </header>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true,
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
