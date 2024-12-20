<template>
    <div
        class="row content-start container"
        :class="authStore.userId == message.userId ? 'justify-end' : ''"
    >
        <div class="avatar" v-if="authStore.userId != message.userId">
            <q-avatar size="3.5em" class="shadow-1">
                <q-img :src="message.avatarUrl" width="100%" height="100%" />
                <q-tooltip
                    delay="300"
                    anchor="center start"
                    self="center end"
                    style="margin: 30px"
                >
                    {{ message.nickName }}
                </q-tooltip>
            </q-avatar>
        </div>
        <div class="message-container">
            <div
                v-if="authStore.userId != message.userId"
                class="q-pa-xs user-name"
            >
                {{ message.nickName }}
            </div>
            <div
                v-for="message in message.messages"
                :key="message"
                class="message-content"
            >
                {{ message.content }}
                <q-tooltip
                    delay="300"
                    :anchor="
                        authStore.userId == message.UserId
                            ? 'center start'
                            : 'center end'
                    "
                    :self="
                        authStore.userId == message.UserId
                            ? 'center end'
                            : 'center start'
                    "
                    style="margin: 30px"
                    >{{ message.time }}
                </q-tooltip>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useAuthStore } from "src/stores/common/AuthStore";

const props = defineProps({
    message: {
        type: Object,
        default: null,
    },
});

const authStore = useAuthStore();
</script>
<style scoped>
.avatar {
    display: flex;
    flex-direction: column;
    padding: 0.2rem;
    justify-content: end;
}

.user-name {
    color: grey;
}

.container {
    margin-bottom: 2rem;
}

.message-content {
    margin-bottom: 0.3rem;
    background-color: var(--primary);
    padding: 1rem;
    border: 1px solid #cacaca;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    max-width: 30vw;
    word-wrap: break-word;
}
</style>
