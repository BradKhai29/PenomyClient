<template>
    <div v-if="!isLoading" class="column">
        <div
            class="row justify-between input-header"
            :class="{ error: hasError }"
        >
            <label class="text-weight-bold">
                <span>Quốc gia</span>
                <span class="asterisk">*</span>
            </label>
            <span v-if="hasError" class="error">Chọn 1 tùy chọn</span>
        </div>
        <div>
            <q-select
                outlined
                v-model="selectedOrigin"
                :options="originOptions"
                :dense="true"
                :options-dense="true"
                class="text-subtitle2 origin"
                :class="{ error: hasError }"
            >
                <template v-slot:prepend>
                    <q-icon name="language" />
                </template>
            </q-select>
        </div>
        <div class="input-footer flex items-center">
            <span class="q-pr-xs">Quốc gia gốc của tác phẩm</span>
            <span>
                <q-icon name="info_outline" size="xs" />
                <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[5, 5]"
                    :transition-duration="100"
                    class="text-subtitle2 text-light bg-dark"
                >
                    Mặc định quốc gia gốc của tác phẩm được đăng tải sẽ là Việt
                    Nam.
                </q-tooltip>
            </span>
        </div>
    </div>
</template>

<script>
import { CreatorStudio6ApiHandler } from "src/api.handlers/creatorStudio/creatorStudio6Page/CreatorStudio6ApiHandler";

const defaultOption = { label: "Chọn quốc gia", value: -1 };
const inputName = "origin";

export default {
    name: "ArtworkOriginInput",
    props: {
        modelValue: {
            required: true,
        },
        artworkOriginId: {
            default: null,
        },
    },
    data() {
        return {
            isLoading: true,
            originOptions: [defaultOption],
            selectedOrigin: null,
            hasError: false,
            artworkOldOriginId: null,
        };
    },
    async mounted() {
        const _origins = await CreatorStudio6ApiHandler.getAllOriginsAsync();

        if (_origins) {
            // Populate the origin list that fetched from
            // the WebAPI to this component data:origins.
            _origins.forEach((item) =>
                this.originOptions.push({ value: item.id, label: item.label })
            );
        }

        if (this.artworkOriginId) {
            this.artworkOldOriginId = this.artworkOriginId;

            this.selectedOrigin = this.originOptions.find(
                (item) => item.value == this.artworkOriginId
            );
        } else {
            // Set selected origin as default options.
            this.selectedOrigin = this.originOptions[0];
        }

        this.isLoading = false;
        this.$emit("verifyInput", this);
    },
    emits: ["update:modelValue", "verifyInput", "hasChange"],
    methods: {
        verifyInput() {
            if (this.selectedOrigin.value == defaultOption.value) {
                this.hasError = true;
            } else {
                this.hasError = false;
            }

            return !this.hasError;
        },
    },
    watch: {
        selectedOrigin(newOrigin, _) {
            this.hasError = false;

            // Emit the update:modelValue event if any change in selected origin.
            this.$emit("update:modelValue", newOrigin.value);

            if (this.artworkOldOriginId) {
                const hasChange =
                    this.selectedOrigin.value != defaultOption.value &&
                    this.artworkOldOriginId != this.selectedOrigin.value;

                this.$emit("hasChange", inputName, hasChange);
            }
        },
    },
};
</script>


<style scoped>
label.origin {
    border: 1px solid #120e36 !important;
    border-radius: 6.8px;
}

.input-header {
    padding: 4px 0 6px 0;
}

.input-footer {
    padding: 4px 0px;
}

.asterisk {
    color: #dc5834;
    font-weight: bold;
}

/* Error section */
.input-header.error {
    color: #dc5834;
}

label.error {
    border: 1px solid #dc5834 !important;
    border-radius: 6.8px;
}

.input-wrapper.error input {
    border-color: #dc5834;
    outline-color: #dc5834;
}
</style>
