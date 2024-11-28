<template>
    <q-item tag="div" class="user-infor q-pa-md">
        <q-avatar size="3em">
            <img :src="comment.avatar" alt="">
            <q-badge floating color="teal" class="circle">
                <q-icon name="check" size="0.5rem" />
            </q-badge>
        </q-avatar>
        <div bold class="user-name">{{ comment.userName }}</div>
        <div class="post-time">({{ comment.postTime }})</div>
        <q-btn v-if="comment.isAuthor" color="red" dense size=".7rem">Tác giả</q-btn>
        <q-space></q-space>

        <q-icon name="more_vert" class="cursor-pointer">
            <q-menu icon="more_vert" dropdown-icon="null"><q-list>
                    <q-item clickable v-close-popup @click="onItemClick">
                        <q-item-section>
                            <q-item-label>Edit</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="onItemClick">
                        <q-item-section>
                            <q-item-label>Remove</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
        </q-icon>
    </q-item>

    <q-item tag="div" id="content" align="left">
        {{ comment.content }}
    </q-item>

    <q-item tag="div">
        <q-item-label class="reply-container">
            <a class="cursor-pointer"><q-icon name="chat_bubble" /> Phản hồi</a>
            <a class="cursor-pointer">
                {{ comment.replies }} phản hồi<q-icon name="arrow_drop_down_circle" />
            </a>

        </q-item-label>
        <q-space></q-space>
        <q-item-label>
            <q-btn color="primary" size=".7rem" dense icon="thumb_up">
                {{ comment.like }}k
            </q-btn>
        </q-item-label>
    </q-item>

    <q-separator />
</template>

<script setup>
import { computed} from 'vue';

var props = defineProps({
    comment: {
        type: Object,
        default: () => {
            return {
                id: 0,
                avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
                userName: "username",
                postTime: "today",
                content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut doloribus maiores repellat sit, ad fuga nihil fugiat adipisci voluptate aliquid eum corrupti reiciendis, nam explicabo accusantium vitae voluptatum dolore asperiores?",
                like: 10,
                replies: 20,
                isAuthor: true
            }
        }
    },
    replies: {
        type: Array,
        default: () => []
    }
})

const children = computed(() => props.children);
</script>
<script>
export default {
    name: "artworkComment",
};
</script>
<style scoped>
.user-infor {
    display: flex;
    align-items: center;
    column-gap: .4rem;
}

#content {
    color: var(--comment-color);
    font-size: 1vw;
}

a {
    color: var(--primary-color);
    font-weight: bold;
}

.reply-container {
    display: flex;
    gap: 1rem;
}

.circle {
    border-radius: 1000px;
    padding: .2rem;
}
</style>