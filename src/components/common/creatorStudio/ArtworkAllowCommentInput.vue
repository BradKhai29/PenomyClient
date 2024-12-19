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
                :checked="allowComment == true"
            />
            <RadioInput
                v-model="allowComment"
                :value="false"
                :name="radioInputName"
                label="Không cho phép"
                :checked="allowComment == false"
            />
        </div>
    </section>
</template>

<script>
// Import dependencies section.
import RadioInput from "./ArtworkRadioInput.vue";

export default {
    name: "ArtworkAllowCommentInput",
    emits: ["update:modelValue", "hasChange"],
    components: {
        RadioInput,
    },
    props: {
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
    },
    computed: {
        radioInputName() {
            return "allowComment";
        },
    },
    data() {
        return {
            allowComment: false,
        };
    },
    beforeMount() {
        if (this.oldAllowComment) {
            this.allowComment = this.oldAllowComment;
        }
    },
    watch: {
        allowComment(newValue, _) {
            if (this.oldAllowComment) {
                const hasChange = this.oldAllowComment != newValue;

                this.$emit("hasChange", this.radioInputName, hasChange);
            }

            this.$emit("update:modelValue", newValue);
        },
    },
};
</script>
