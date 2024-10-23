<template>
    <q-page>
        <section class="column q-pa-md q-gutter-md">
            <AppPagination
                :max="20"
                :showBoundaryLinks="false"
                :showInput="true"
                v-model="pageNumber"
            />
            {{ pageNumber }}
        </section>
    </q-page>
</template>

<script>
import AppPagination from "src/components/common/others/AppPagination.vue";

export default {
    components: {
        AppPagination,
    },
    data() {
        return {
            pageNumber: 1,
        };
    },
};
</script>

<style scoped>
</style>
