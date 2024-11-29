<template>
    <q-btn
        id="follow-btn"
        rounded
        no-caps
        unelevated
        class="shadow-1"
        :class="hasReportedRef ? 'bg-tertiary-500' : 'bg-primary'"
        @click="hasReportedRef = !hasReportedRef"
    >
        <q-badge
            v-if="hasReportedRef"
            color="red"
            floating
            class="text-weight-bold"
        >
            22
        </q-badge>
        <q-icon name="report" class="text-dark" />
        <span class="q-ml-xs text-weight-bold text-subtitle2 text-dark">
            Báo cáo vi phạm
        </span>
    </q-btn>
</template>

<script>
export default {
    name: "ReportButton",
    props: {
        chapterId: {
            required: true,
        },
        hasReported: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            hasReportedRef: false,
        };
    },
};
</script>
