<template>
    <div class="row items-center shadow-1 border-radius-sm">
        <router-link
            :to="{
                name: 'comic-chapter-detail',
                params: { chapterId: id },
            }"
        >
            <q-img
                :src="thumbnailUrl"
                style="width: 100px; height: 100px"
                :ratio="1"
            />
        </router-link>
        <section class="col-grow q-pl-md q-pr-sm">
            <div id="chapter_header" class="row text-subtitle2">
                <div class="flex items-center q-mr-auto text-subtitle2">
                    <span v-if="!isDrafted" class="text-weight-bold">
                        Tập {{ uploadOrder }}
                    </span>
                    <span
                        v-else-if="isDrafted"
                        class="border-radius-sm col-md-auto bg-primary-700 text-primary text-weight-bold"
                        style="padding: 2px 4px"
                    >
                        Bản nháp
                    </span>
                    <span
                        v-if="isScheduled"
                        class="q-ml-sm border-radius-sm col-md-auto bg-light-500 text-dark"
                        style="padding: 2px 4px"
                    >
                        Lên lịch
                    </span>
                </div>
                <div class="flex items-center">
                    <q-btn
                        v-if="isDrafted"
                        dense
                        unelevated
                        no-caps
                        class="text-subtitle2 bg-primary text-dark text-weight-bold q-px-sm q-mr-sm"
                        >Xuất bản</q-btn
                    >
                    <router-link
                        :to="{
                            name: 'comic-chapter-edit',
                            params: { chapterId: id },
                        }"
                    >
                        <q-btn
                            dense
                            unelevated
                            no-caps
                            class="text-subtitle2 bg-dark text-light text-weight-bold q-px-sm"
                            >Sửa</q-btn
                        >
                    </router-link>

                    <q-btn dense unelevated no-caps icon="more_vert" />
                </div>
            </div>
            <div>
                <router-link :to="`/studio/comic/chapter/detail/${id}`">
                    <q-btn
                        dense
                        flat
                        no-caps
                        class="text-subtitle1 text-dark"
                        padding="none"
                    >
                        {{ title }}
                    </q-btn>
                </router-link>
            </div>
            <div class="row items-center text-dark-500 text-subtitle2 q-mt-sm">
                <span> Ngày tạo: {{ createdAt }} </span>
                <span class="q-ml-md">Ngày xuất bản: {{ publishedAt }}</span>
            </div>
        </section>
    </div>
</template>

<script>
import { PublishStatuses } from "src/api.handlers/creatorStudio/creatorStudio7Page/CreatorStudio7ApiHandler";
export default {
    name: "ComicChapterCard",
    props: {
        id: {
            required: true,
        },
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
        publicLevel: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: String,
            required: true,
        },
        publishedAt: {
            type: String,
            required: true,
        },
        allowComment: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            isDrafted: false,
            isScheduled: false,
        };
    },
    beforeMount() {
        this.checkChapterPublishStatus();
    },
    methods: {
        checkChapterPublishStatus() {
            this.isDrafted = this.publishStatus == PublishStatuses.DRAFTED;
            this.isScheduled = this.publishStatus == PublishStatuses.SCHEDULED;
        },
    },
};
</script>
