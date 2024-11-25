<template>
    <q-btn
        @click="sendReport"
        id="report-profile-button"
        dense
        no-caps
        class="q-ml-sm bg-dark text-light border-radius-sm shadow-1 q-px-sm"
    >
        <q-icon name="report" />
        <span class="q-ml-xs text-subtitle1"> Báo cáo tài khoản </span>
    </q-btn>
</template>

<script>
export default {
    name: "ReportProfileButton",
    props: {
        userId: {
            required: true,
        },
    },
    methods: {
        sendReport() {
            console.log("Send report user", this.userId);
        },
    },
};
</script>
