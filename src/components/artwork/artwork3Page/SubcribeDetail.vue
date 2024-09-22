<template>
    <q-card flat bordered class="q-pa-md follow-section">
        <q-card-section horizontal class="q-pa-none row">
            <div class="col-6 row items-center no-wrap subcribe">
                <q-avatar size="48px" rounded>
                    <q-icon name="account_circle" />
                </q-avatar>
                <div class="user-info q-ml-sm">
                    <div class="username"><strong>{{ userName }}</strong></div>
                    <div class="follower-count">{{ followerCount }}</div>
                </div>
            </div>
            <q-card class="col-6 row justify-end subcribe-btn">
                <q-btn unelevated no-caps rounded text-color="#120E36" :label="buttonLabel"
                    class="custom-btn text-weight-bold" />
            </q-card>
        </q-card-section>
    </q-card>
</template>

<script setup>
import { ref } from 'vue'

// Define reactive data for the component
const userName = ref('Penomy Official')
const followerCount = ref('1N Người theo dõi')
const buttonLabel = ref('Theo dõi')
</script>

<style scoped>
.custom-btn {
    font-size: 16px;
    --light-100: #f9fafc;
    --dark: #120e36;
    font-family: Arial, Helvetica, sans-serif;
    background-color: var(--light-100);
    color: var(--dark);
}


.user-info {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
}
</style>
