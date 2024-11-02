<template>
    <section id="allow-comment">
        <div class="flex items-center q-mb-xs">
            <span class="text-weight-bold q-pr-xs">
                {{ label }}
            </span>
            <span>
                <q-icon name="info" size="xs" />
                <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[5, 5]"
                    :transition-duration="100"
                    class="text-subtitle2 text-light bg-dark"
                >
                    Cho phép người dùng được bình luận ở trang này.
                </q-tooltip>
            </span>
        </div>
        <div class="flex q-gutter-md">
            <RadioInput
                v-model="allowComment"
                :value="true"
                :name="radioInputName"
                label="Cho phép"
                :checked="props.modelValue == true"
            />
            <RadioInput
                v-model="allowComment"
                :value="false"
                :name="radioInputName"
                label="Không cho phép"
                :checked="props.modelValue == false"
            />
        </div>
    </section>
</template>

<script setup>
import { onBeforeMount, ref, watch } from "vue";
import RadioInput from "./ArtworkRadioInput.vue";

const allowComment = ref(false);
const oldValue = ref(false);
const radioInputName = "allowComment";

const props = defineProps({
    modelValue: {
        required: true,
    },
    oldAllowComment: {
        default: null,
    },
    label: {
        type: String,
        default: "Bật bình luận ở trang mô tả",
    },
});

const emit = defineEmits(["update:modelValue", "hasChange"]);

onBeforeMount(() => {
    if (props.oldAllowComment != null) {
        allowComment.value = Boolean(props.oldAllowComment);
        oldValue.value = Boolean(props.oldAllowComment);
    }
});

watch(
    () => allowComment.value,
    (newValue, _) => {
        emit("update:modelValue", newValue);
        emit("hasChange", radioInputName, true);
    }
);
</script>
