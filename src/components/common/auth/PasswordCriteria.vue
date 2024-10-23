<template>
    <div :id="idRef" class="flex items-center">
        <q-icon
            name="check"
            :size="$q.screen.lt.sm ? '12px' : '14px'"
            class="border-radius-rounded q-pa-xs"
            :class="
                isPassed
                    ? 'bg-primary text-dark border-md-invisible'
                    : 'text-dark-500 border-md-dark-500'
            "
        />
        <span class="q-ml-xs">{{ label }}</span>
    </div>
</template>

<script>
import { StringHelper } from "src/helpers/StringHelper";

export default {
    props: {
        id: {
            type: String,
            default: null,
        },
        label: {
            type: String,
            required: true,
        },
        isPassed: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            idRef: null,
        };
    },
    mounted() {
        const idPrefix = "password_criteria_";
        const length = 6;

        this.idRef =
            this.id ??
            `${idPrefix}${StringHelper.generateSecureRandomString(length)}`;
    },
};
</script>
