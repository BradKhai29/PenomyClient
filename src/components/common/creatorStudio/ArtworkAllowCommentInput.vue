<template>
    <section id="allow-comment">
        <div class="flex items-center q-mb-xs">
            <span class="text-weight-bold q-pr-xs">
                {{ label }}
            </span>
            <span>
                <q-icon name="info_outline" size="xs" />
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
                @click="toggleInput"
                v-model="allowComment"
                :value="true"
                :name="radioInputName"
                label="Cho phép"
                :checked="props.modelValue == true"
            />
            <RadioInput
                @click="toggleInput"
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
import { ref, watch } from "vue";
import RadioInput from "./ArtworkRadioInput.vue";

const allowComment = ref(false);
const radioInputName = "allowComment";

const props = defineProps({
    modelValue: {
        required: true,
    },
    label: {
        type: String,
        default: "Bật bình luận ở trang mô tả",
    },
});

const emit = defineEmits(["update:modelValue", "hasChange"]);

function toggleInput() {
    emit("hasChange", radioInputName, true);
}

watch(
    () => allowComment.value,
    (newValue, _) => {
        emit("update:modelValue", newValue);
    }
);
</script>
