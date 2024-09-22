<template>
    <section class="flex justify-between items-center page-header shadow-2">
        <div class="text-subtitle1 flex items-center">
            <span class="text-weight-bold"> {{ props.headerTitle }} </span>
            <span class="text-weight-bold">
                <q-icon name="chevron_right" size="sm"
            /></span>
            <span> Sửa thông tin </span>
        </div>
        <div class="flex items-center q-gutter-sm">
            <q-btn
                @click="alert = true"
                class="font-arial text-weight-bold"
                label="Hủy thay đổi"
                color="dark"
                align="center"
            ></q-btn>
            <q-btn
                class="font-arial text-weight-bold flex items-center"
                color="negative"
            >
                <span class="q-mr-xs">Xóa</span>
                <q-icon name="delete" size="xs" />
            </q-btn>
        </div>
        <q-dialog v-model="alert" persistent>
            <q-card>
                <q-card-section>
                    <HeaderHighlight
                        label="Lưu ý"
                        class="text-h6 text-weight-bold"
                    />
                </q-card-section>

                <q-card-section class="q-pt-none text-subtitle1">
                    Các thông tin của tác phẩm sẽ không được lưu lại nếu bạn
                    hủy.
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn
                        flat
                        label="Đóng"
                        class="text-bold"
                        color="primary"
                        v-close-popup
                    />
                    <q-btn
                        class="text-bold"
                        flat
                        label="Xác nhận hủy"
                        color="primary"
                        v-close-popup
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </section>
</template>

<script setup>
import { ref } from "vue";
import HeaderHighlight from "components/common/creatorStudio/HeaderHighlight.vue";

const alert = ref(false);

const props = defineProps({
    headerTitle: {
        type: String,
        required: true,
        default: null,
    },
});
</script>

<style scoped>
.page-header {
    --light-100: #f9fafc;
    padding: 16px;
    background-color: var(--light-100t);
}
</style>
