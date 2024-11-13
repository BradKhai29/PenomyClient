<template>
    <q-btn
        dense
        flat
        no-caps
        round
        padding="xs"
        class="text-subtitle1 shadow-1"
        :class="darkMode ? 'text-dark' : 'text-light'"
        @click="copyLink"
        @mouseleave="isCopyLink = false"
    >
        <q-tooltip anchor="center right" self="center left" :offset="[4, 10]">
            <strong class="text-subtitle2">
                {{ isCopyLink ? "Đã lưu link" : "Lấy link" }}
            </strong>
        </q-tooltip>
        <span v-if="label" class="q-ml-xs">{{ label }}</span>
        <q-icon name="link" :size="size" style="transform: rotate(-45deg)" />
    </q-btn>
</template>

<script>
import { UrlHelper } from "src/helpers/UrlHelper";

export default {
    name: "GetLinkButton",
    props: {
        label: {
            type: String,
            default: null,
        },
        darkMode: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: "sm",
        },
    },
    data() {
        return {
            isCopyLink: false,
        };
    },
    methods: {
        copyLink() {
            // Copy current chapter url to clipboard.
            UrlHelper.copyCurrentUrlToClipBoard();
            this.isCopyLink = true;
        },
    },
};
</script>
