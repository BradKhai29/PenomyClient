<template>
    <q-btn class="text-dark" dense flat no-cap padding="1px" icon="more_vert">
        <q-menu anchor="bottom left" self="bottom end" :offset="[10, 10]">
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
    </q-btn>
</template>

<script>
export default {
    name: "ArtworkCardOtherActionButton",
    props: {
        artworkId: {
            required: true,
        },
    },
    mounted() {},
};
</script>
