<template>
    <q-item tag="div" class="user-infor q-pa-md">
        <q-avatar size="3em">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="">
            <q-badge floating color="teal" class="circle">
                <q-icon name="check" size="0.5rem" />
            </q-badge>
        </q-avatar>
        <div bold class="user-name">{{ userName }}</div>
        <div class="post-time">{{ postTime }}</div>
        <q-btn v-if="isAuthor" color="red" dense size=".7rem">Tác giả</q-btn>
        <q-space></q-space>

        <q-icon name="more_vert" class="cursor-pointer">
            <q-menu label="123" icon="more_vert" dropdown-icon="null"><q-list>
                    <q-item clickable v-close-popup @click="onItemClick">
                        <q-item-section>
                            <q-item-label>Photos</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="onItemClick">
                        <q-item-section>
                            <q-item-label>Videos</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="onItemClick">
                        <q-item-section>
                            <q-item-label>Articles</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
        </q-icon>
    </q-item>

    user comment
    <q-item tag="div" id="content" align="left">
        {{ comment }}
    </q-item>

    <q-item tag="div">
        <q-item-label class="reply-container">
            <a class="cursor-pointer"><q-icon name="chat_bubble" /> Phản hồi</a>
            <a class="cursor-pointer">
                {{ replies }} phản hồi<q-icon name="arrow_drop_down_circle" />
            </a>
        </q-item-label>
        <q-space></q-space>
        <q-item-label>
            <q-btn color="primary" size=".7rem" dense icon="thumb_up">
                {{ like }}k
            </q-btn>
        </q-item-label>
    </q-item>

    <q-separator />
</template>

<script setup>
defineProps({
    avatar: {
        type: String,
        default: "https://cdn.quasar.dev/img/boy-avatar.png"
    },
    userName: {
        type: String,
        default: "tên người dùng"
    },
    postTime: {
        type: String,
        default: "(2 phút trước)"
    },
    comment: {
        type: String,
        default: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut doloribus maiores repellat sit, ad fuga nihil fugiat adipisci voluptate aliquid eum corrupti reiciendis, nam explicabo accusantium vitae voluptatum dolore asperiores?"
    },
    like: {
        type: Number,
        default: 100
    },
    replies: {
        type: Number,
        default: 2
    },
    isAuthor: {
        type: Boolean,
        default: true
    }

})
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