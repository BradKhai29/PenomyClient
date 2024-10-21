<template>
    <div class="column">
        <div class="flex items-center justify-between input-header">
            <label class="text-weight-bold">
                <span class="q-mr-xs">Thứ tự tập</span>
                <span>
                    <q-icon name="info" size="xs" />
                    <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[5, 5]"
                        :transition-duration="100"
                        class="text-subtitle2 text-light bg-dark"
                    >
                        Thứ tự của tập truyện sẽ được đăng tải.
                    </q-tooltip>
                </span>
            </label>
        </div>
        <div class="input-wrapper">
            <span>{{ modelValue }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: Number,
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

.asterisk {
    color: #dc5834;
    font-weight: bold;
}

/* Error section */
.input-header.error {
    color: #dc5834;
}

.input-wrapper.error input {
    border-color: #dc5834;
    outline-color: #dc5834;
}
</style>
