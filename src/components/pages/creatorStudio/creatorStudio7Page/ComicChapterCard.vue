<template>
    <div class="row items-center shadow-1 border-radius-sm">
        <q-img
            :src="thumbnailUrl"
            style="width: 100px; height: 100px"
            :ratio="1"
        />
        <section class="col-grow q-pl-md q-pr-sm">
            <div id="chapter_header" class="row text-subtitle2 q-mt-sm">
                <div class="flex items-center q-mr-auto q-gutter-sm">
                    <span v-if="!isDrafted" class="text-subtitle1">
                        Tập {{ uploadOrder }}
                    </span>
                    <span
                        v-else-if="isDrafted"
                        class="text-subtitle2 border-radius-sm col-md-auto bg-primary-700 text-primary"
                        style="padding: 2px"
                    >
                        Bản nháp
                    </span>
                </div>
                <div class="flex items-center q-gutter-sm">
                    <q-btn
                        v-if="isDrafted"
                        dense
                        unelevated
                        no-caps
                        class="text-subtitle2 bg-primary text-dark text-weight-bold q-px-sm"
                        >Xuất bản</q-btn
                    >
                    <q-btn
                        dense
                        unelevated
                        no-caps
                        class="text-subtitle2 bg-dark text-light text-weight-bold q-px-sm"
                        >Sửa</q-btn
                    >
                    <q-btn dense unelevated no-caps icon="more_vert" />
                </div>
            </div>
            <div>
                <span> {{ title }} </span>
            </div>
            <div class="row items-center text-dark-500 text-subtitle2">
                <span> {{ createdAt }} </span>
                <span class="q-ml-md"></span>
            </div>
        </section>
    </div>
</template>

<script>
import { PublishStatuses } from "src/api.handlers/creatorStudio/creatorStudio7Page/CreatorStudio7ApiHandler";
export default {
    name: "ComicChapterCard",
    props: {
        title: {
            type: String,
            required: true,
        },
        uploadOrder: {
            type: Number,
            required: true,
            default: 0,
        },
        thumbnailUrl: {
            type: String,
            required: true,
        },
        publishStatus: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: String,
            required: true,
        },
        allowComment: {
            type: Boolean,
            default: true,
        },
        totalViews: {
            type: Number,
            default: 0,
        },
        totalFavorites: {
            type: Number,
            default: 0,
        },
        totalComments: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            isDrafted: false,
        };
    },
    beforeMount() {
        this.isDrafted = this.checkDrafted();
    },
    methods: {
        checkDrafted() {
            return this.publishStatus == PublishStatuses.DRAFTED;
        },
    },
};
</script>
