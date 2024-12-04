<template>
    <q-btn class="text-dark" dense flat no-cap padding="1px" icon="more_vert">
        <!-- If user access this, display actions for user -->
        <q-menu
            v-if="isUser"
            anchor="bottom left"
            self="bottom end"
            :offset="offset"
        >
            <q-item clickable v-close-popup class="flex items-center">
                <q-icon class="text-secondary-900" name="favorite" size="sm" />
                <span class="q-ml-xs">Yêu thích</span>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup class="flex items-center">
                <q-icon class="text-primary" name="add_box" size="sm" />
                <span class="q-ml-xs">Theo dõi</span>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup class="flex items-center">
                <q-icon class="text-dark" name="report" size="sm" />
                <span class="q-ml-xs">Báo cáo</span>
            </q-item>
        </q-menu>

        <!-- If author accesses this, display action for author -->
        <q-menu
            v-if="isAuthor"
            anchor="bottom left"
            self="bottom end"
            :offset="offset"
        >
            <q-item clickable v-close-popup class="flex items-center">
                <q-icon class="text-primary" name="edit" size="sm" />
                <span class="q-ml-xs">Chỉnh sửa</span>
            </q-item>
        </q-menu>
    </q-btn>
</template>

<script>
export default {
    name: "ArtworkCardOtherActionButton",
    props: {
        artworkId: {
            required: true,
        },
        isAuthor: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        offset() {
            return [10, 10];
        },
        isUser() {
            return !this.isAuthor;
        },
    },
};
</script>
