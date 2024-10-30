<template>
    <q-dialog v-model="confirm" persistent>
        <q-card>
            <q-card-section class="row items-center">
                <span class="q-ml-sm">{{ prop.message }}</span>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn label="Cancel" color="cyan-10" v-close-popup @click="onclickHandler(false)" />
                <q-btn label="Remove" color="red" v-close-popup @click="onclickHandler(true)" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script setup>
import { ref, defineProps } from 'vue'

const prop = defineProps({
    message: {
        type: String
    },
})
const confirm = ref(true);
const emit = defineEmits(['popupClick']);
function onclickHandler(event) {
    emit('popupClick', event);
}

</script>