<template>
    <section
        id="allow-comment"
        v-if="publicLevelsRef.length != 0 && !isLoading"
    >
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
                :name="radioInputName"
                :value="publicLevelItem.value"
                :label="publicLevelItem.label"
                :checked="isPublicLevelSelected(publicLevelItem.value)"
                v-model="selectedPublicLevel"
                @click="toggleSelect"
            />
        </div>
    </section>
</template>

<script setup>
import RadioInput from "./ArtworkRadioInput.vue";
import { CreatorStudio6ApiHandler } from "src/api.handlers/creatorStudio/creatorStudio6Page/CreatorStudio6ApiHandler";
import { PublicLevelItem } from "src/api.models/creatorStudio/common/PublicLevelItem";
import { onBeforeMount, ref, watch } from "vue";

/**
 * Check if this component is loading or not.
 */
const isLoading = ref(true);
/**
 * @type {PublicLevelItem[]} The type of this array.
 */
const publicLevels = [];
const publicLevelsRef = ref(publicLevels);

/**
 * This public level ref will use to bind for input.
 */
const selectedPublicLevel = ref(0);
const radioInputName = "publicLevel";

const props = defineProps({
    modelValue: {
        required: true,
    },
    artworkPublicLevel: {
        default: null,
    },
});

const emit = defineEmits(["update:modelValue", "hasChange"]);

// Load all public levels from api to display for the creator.
onBeforeMount(handleBeforeMount);

async function handleBeforeMount() {
    const _publicLevels =
        await CreatorStudio6ApiHandler.getAllPublicLevelsAsync();

    if (_publicLevels) {
        _publicLevels.forEach((item) => publicLevelsRef.value.push(item));
    }

    if (props.artworkPublicLevel) {
        const foundItem = publicLevelsRef.value.find(
            (item) => item.value == props.artworkPublicLevel
        );

        selectedPublicLevel.value = foundItem.value;
    } else if (publicLevelsRef.value[0]) {
        // If no artwork public level is specified, then take
        // the first option as a default selection.
        selectedPublicLevel.value = publicLevelsRef.value[0].value;
    }

    // Turn off is loading flag to display component.
    isLoading.value = false;
}

function isPublicLevelSelected(publicLevelValue) {
    const result = selectedPublicLevel.value == publicLevelValue;

    return result;
}

function toggleSelect() {
    emit("hasChange", radioInputName, true);
}

watch(
    () => selectedPublicLevel.value,
    (_, __) => {
        emit("update:modelValue", selectedPublicLevel.value);
    }
);
</script>
