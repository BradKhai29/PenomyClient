<template>
    <q-btn
        id="follow-btn"
        rounded
        no-caps
        unelevated
        class="shadow-1 bg-primary"
        @click="isFollowedRef = !isFollowedRef"
    >
        <q-icon v-if="isFollowedRef" name="add_box" class="text-dark" />
        <q-btn v-else dense round size="sm" class="bg-dark">
            <q-icon name="check" size="xs" class="text-light" />
        </q-btn>
        <span class="q-ml-xs text-weight-bold text-subtitle2 text-dark">
            Theo dõi
        </span>
    </q-btn>
</template>

<script>
export default {
    name: "FollowComicButton",
    props: {
        chapterId: {
            required: true,
        },
        isFollowed: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            isFollowedRef: false,
        };
    },
    beforeMount() {
        // Mount the related data from props.
        this.isFollowedRef = this.isFollowed;
    },
};
</script>
