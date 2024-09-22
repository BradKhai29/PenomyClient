<template>
    <section id="allow-comment" v-if="publicLevelsRef.length != 0">
        <div class="flex items-center q-mb-xs">
            <span class="text-weight-bold q-pr-xs"> Chế độ xem </span>
            <span>
                <q-icon name="info_outline" size="xs" />
                <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[5, 5]"
                    :transition-duration="100"
                    class="text-subtitle2 text-light bg-dark"
                >
                    Giới hạn số người có thể truy cập vào tác phẩm này.
                </q-tooltip>
            </span>
        </div>
        <div class="flex q-gutter-md">
            <RadioInput
                v-for="publicLevelItem in publicLevelsRef"
                :key="publicLevelItem.value"
                v-model="publicLevel"
                :name="radioInputName"
                :value="publicLevelItem.value"
                :label="publicLevelItem.label"
                :checked="publicLevelItem.isChecked"
            />
        </div>
    </section>
</template>

<script setup>
import RadioInput from "./ArtworkRadioInput.vue";
import { ArtworkApiHandler } from "src/api.handlers/creatorStudio/creatorStudio6Page/ArtworkApiHandler";
import { PublicLevelItem } from "src/api.models/creatorStudio/creatorStudio6Page/PublicLevelItem";
import { onBeforeMount, ref, watch } from "vue";

/**
 * @type {PublicLevelItem[]} The type of this array.
 */
const publicLevels = [];
const publicLevelsRef = ref(publicLevels);

// This public level ref will use to bind for input.
const publicLevel = ref(null);
const radioInputName = "publicLevel";

async function handleBeforeMount() {
    const _publicLevels = await ArtworkApiHandler.getAllPublicLevelsAsync();

    if (_publicLevels) {
        _publicLevels.forEach((item) => publicLevelsRef.value.push(item));
    }
}

onBeforeMount(handleBeforeMount);

const props = defineProps({
    modelValue: {
        required: true,
    },
});

const emit = defineEmits(["update:modelValue"]);

watch(
    () => publicLevel.value,
    (newValue, _) => {
        emit("update:modelValue", newValue);
    }
);
</script>
