<template>
    <div class="column">
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
import { ArtworkApiHandler } from "src/api.handlers/creatorStudio/creatorStudio6Page/ArtworkApiHandler";

const defaultOption = { label: "Chọn quốc gia", value: -1 };

export default {
    name: "ArtworkOriginInput",
    data() {
        return {
            originOptions: [defaultOption],
            selectedOrigin: null,
            hasError: false,
        };
    },
    async mounted() {
        const _origins = await ArtworkApiHandler.getAllOriginsAsync();

        if (_origins) {
            // Populate the origin list that fetched from
            // the WebAPI to this component data:origins.
            _origins.forEach((item) =>
                this.originOptions.push({ value: item.id, label: item.label })
            );
        }

        if (this.artworkOriginId) {
            const index = this.originOptions.findIndex(
                (item) => item.value == this.artworkOriginId
            );

            this.selectedOrigin = this.originOptions[index];
        } else {
            // Set selected origin as default options.
            this.selectedOrigin = this.originOptions[0];
        }

        this.$emit("verifyInput", this);
    },
    emits: ["update:modelValue", "verifyInput"],
    props: {
        modelValue: {
            required: true,
        },
        artworkOriginId: {
            type: Number,
            default: null,
        },
    },
    watch: {
        selectedOrigin(newOrigin, _) {
            this.hasError = false;

            this.$emit("update:modelValue", newOrigin.value);
        },
    },
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
