<template>
    <section>
        <div class="text-subtitle1">
            <span>Quốc gia</span>
            <span class="q-ml-xs" v-if="selectedOrigins.length"
                >(Đã chọn:
                {{ selectedOrigins != null && selectedOrigins.length }})</span
            >
        </div>
        <div class="q-gutter-sm">
            <OriginTag
                v-for="item in origins"
                :key="item.id"
                :label="item.label"
                :originId="item.id"
                @changeState="handleOriginTagChangeState"
            />
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import OriginTag from "./AdvancedSearchOriginTag.vue";

const origins = ref([]);
const selectedOrigins = ref([]);
const props = defineProps({
    modelValue: {
        type: Array,
        required: true,
        default: () => [],
    },
});

const emit = (["update:modelValue"]);

const VietNamese = {
    id: 1,
    label: "Việt Nam",
};

const Japanese = {
    id: 2,
    label: "Nhật Bản",
};

const Chinese = {
    id: 3,
    label: "Trung Quốc",
};

const Korean = {
    id: 4,
    label: "Hàn Quốc",
};

onMounted(() => {
    origins.value.push(VietNamese);
    origins.value.push(Japanese);
    origins.value.push(Chinese);
    origins.value.push(Korean);
});

function handleOriginTagChangeState(originId, isSelected) {
    const foundOrigin = origins.value.find((item) => item.id == originId);

    if (isSelected) {
        selectedOrigins.value.push(foundOrigin);
    } else {
        const foundIndex = selectedOrigins.value.findIndex(
            (item) => item.id == originId
        );

        // Remove the origin from the selected list.
        selectedOrigins.value.splice(foundIndex, 1);
    }

    emit("update:modelValue", selectedOrigins.value);
}
</script>
