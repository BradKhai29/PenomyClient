<template>
    <section>
        <!-- Show the separator if it is specified -->
        <div
            v-if="showSeparator"
            class="border-sm-bottom-light-500 q-mt-sm q-mb-xl"
        ></div>
        <!-- Show the separator if it is specified -->
        <div v-else class="q-mt-sm q-mb-xl"></div>

        <div class="flex justify-center text-dark-500">
            <div class="column items-center">
                <q-icon :name="icon" size="120px"></q-icon>
                <span class="text-subtitle1">
                    {{ displayMessage }}
                </span>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "EmptyStatePlaceholder",
    props: {
        icon: {
            type: String,
            default: "outbox",
        },
        displayMessage: {
            type: String,
            default: "Người dùng này không có nội dùng nào",
        },
        showSeparator: {
            type: Boolean,
            default: true,
        },
    },
};
</script>
