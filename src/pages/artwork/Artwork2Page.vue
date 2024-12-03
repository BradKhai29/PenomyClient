<template>
    <q-page class="">
        <AppPagination
            :max="10"
            :maxDisplayPages="5"
            v-model="currentPage"
            :disable="isProcessing"
            :showInput="false"
        />
        <div>Current Page: {{ currentPage }}</div>
    </q-page>
</template>

<script>
import AppPagination from "src/components/common/others/AppPagination.vue";

export default {
    name: "Artwork2Page",
    components: {
        AppPagination,
    },
    data: function () {
        return {
            currentPage: 1,
            isProcessing: false,
        };
    },
    methods: {
        async getPageAsync() {
            this.isProcessing = true;

            // Check the isProcessing flag every 50 ms
            const CHECKING_INTERVAL_TIMEOUT = 1000;

            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log(this.currentPage);

                    resolve("COMPLETED");
                    this.isProcessing = false;
                }, CHECKING_INTERVAL_TIMEOUT);
            });
        },
    },
    watch: {
        currentPage() {
            this.getPageAsync();
        },
    },
};
</script>
