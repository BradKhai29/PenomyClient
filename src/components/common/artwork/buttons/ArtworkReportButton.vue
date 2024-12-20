<template>
    <q-btn
        class="bg-light-300 text-dark text-subtitle1 text-weight-bold"
        no-caps
        :rounded="isComicType"
    >
        <q-icon name="report" size="sm" />
        <span class="q-ml-xs">Báo cáo</span>
        <q-badge rounded floating class="bg-dark text-light text-weight-bold">
            0
        </q-badge>
        <q-tooltip
            anchor="top middle"
            self="bottom middle"
            :offset="[8, 8]"
            :class="isComicType ? 'bg-dark text-light' : ''"
        >
            <strong class="text-subtitle2">Gửi báo cáo vi phạm</strong>
        </q-tooltip>
    </q-btn>
</template>

<script>
export default {
    name: "ArtworkReportButton",
    props: {
        artworkId: {
            required: true,
        },
        isComicType: {
            type: Boolean,
            default: true,
        },
    },
};
</script>
