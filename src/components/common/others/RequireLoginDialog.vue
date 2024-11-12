<template>
    <q-dialog v-model="showDialog" @hide="onHide">
        <q-card>
            <q-card-section>
                <HeaderHighlight
                    label="Vui lòng đăng nhập"
                    class="text-h6 text-weight-bold"
                />
            </q-card-section>

            <q-card-section class="q-pt-none text-subtitle1">
                <span>Vui lòng đăng nhập để thực hiện chức năng này.</span>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn
                    flat
                    label="Đóng"
                    class="text-bold text-primary"
                    v-close-popup
                />
                <q-btn
                    to="/auth/login"
                    class="text-bold text-primary"
                    flat
                    label="Đăng nhập ngay"
                    v-close-popup
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
// Import components section.
import HeaderHighlight from "../creatorStudio/HeaderHighlight.vue";

export default {
    name: "RequireLoginDialog",
    emits: ["update:modelValue"],
    components: {
        HeaderHighlight,
    },
    props: {
        modelValue: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            showDialog: false,
        };
    },
    methods: {
        onHide() {
            this.showDialog = false;
            this.$emit("update:modelValue", this.showDialog);
        },
    },
    watch: {
        modelValue() {
            this.showDialog = this.modelValue;
            this.$emit("update:modelValue", this.showDialog);
        },
    },
};
</script>
