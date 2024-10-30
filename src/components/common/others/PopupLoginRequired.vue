<template>
    <q-dialog v-model="isOpened" persistent>
        <q-card>
            <q-card-section class="row items-center">
                <span class="q-ml-sm">You need to sign in to continue.</span>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" @click="isOpened = false"/>
                <router-link to="/auth/login">
                    <q-btn flat label="Login" color="primary" @click="isOpened = false" /></router-link>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue'

const prop = defineProps({
    open: {
        type: Boolean,
    }
})

const isOpened = ref(prop.open)
watch(
    () => prop.open,
    () => {
        isOpened.value = true
    }
)
</script>