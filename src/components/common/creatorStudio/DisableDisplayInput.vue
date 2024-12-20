<template>
    <div class="column">
        <div class="flex items-center justify-between input-header">
            <label class="text-weight-bold">
                <span class="q-mr-xs">{{ label }}</span>
                <span>
                    <q-icon name="info" size="xs" />
                    <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[5, 5]"
                        :transition-duration="100"
                        class="text-subtitle2 text-light bg-dark"
                    >
                        {{ tooltipMessage }}
                    </q-tooltip>
                </span>
            </label>
        </div>
        <div class="input-wrapper">
            <span>{{ displayContent }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "DisableDisplayInput",
    props: {
        label: {
            type: String,
            required: true,
        },
        tooltipMessage: {
            type: String,
            required: true,
        },
        displayContent: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>
.input-wrapper {
    --dark: #120e36;
    --light-500: #dddddd;

    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--dark);
    border-radius: 6.8px;
    font-size: 16px;
    background-color: var(--light-500);
}

.input-wrapper input:focus {
    outline: rgb(41, 121, 255) solid 1px;
}

.input-header {
    padding: 4px 0 6px 0;
}

.input-footer {
    padding: 4px 0px;
}
</style>
