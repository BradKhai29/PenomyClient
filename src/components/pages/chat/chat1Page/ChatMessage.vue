<template>
    <div class="row content-start container" :class="isMe ? 'justify-end' : ''">
        <div class="avatar" v-if="!isMe">
            <q-avatar size="3.5em" class="shadow-1">
                <q-img src="https://cdn.quasar.dev/img/avatar2.jpg" width="100%" height="100%" />
                <q-tooltip delay='300' anchor='center start' self="center end" style="margin: 30px;">
                    userName
                </q-tooltip>
            </q-avatar>
        </div>
        <div class="message-container">
            <div v-if="!isMe" class="q-pa-xs user-name">name</div>
            <div class="message-content">I just feel like typing a really, really, REALLY long message to
                annoy you...I just feel like typing a really, really, REALLY long message to
                annoy you...I just feel like typing a really, really, REALLY long message to
                annoy you...
                <q-tooltip delay= 300 :anchor="isMe ? 'center start' : 'center end'"
                    :self="isMe ? 'center end' : 'center start'" style="margin: 30px;">12:30
                </q-tooltip>
            </div>
            <div class="message-content">
                <q-tooltip delay= 300 :anchor="isMe ? 'center start' : 'center end'"
                    :self="isMe ? 'center end' : 'center start'" style="margin: 30px;">12:30
                </q-tooltip>
                <div>
                    I just feel like typing a really, really, REALLY long message to
                    annoy you...
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount, defineProps } from 'vue';

const props = defineProps({
    message: {
        type: Object,
        default: null
    },
    isMe: {
        type: Boolean,
        default: false
    }
});

</script>
<style scoped>
.avatar {
    display: flex;
    flex-direction: column;
    padding: .2rem;
    justify-content: end;

}

.user-name {
    color: grey;
}

.container {
    margin-bottom: 2rem;
}

.message-content {
    margin-bottom: .3rem;
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