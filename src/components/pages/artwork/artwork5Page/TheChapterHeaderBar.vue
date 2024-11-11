<template>
    <section
        id="chapter-header-bar"
        class="row bg-dark-900 text-light q-px-md q-py-xs"
    >
        <div class="col flex items-center text-light text-subtitle1">
            <router-link :to="`/artwork/comic/${comicId}`">
                <div
                    class="text-weight-bold text-light text-subtitle1 comic-title"
                >
                    {{ comicTitle }}
                </div>
            </router-link>
            <span class="text-weight-bold">
                <q-icon name="chevron_right" size="sm" />
            </span>

            <GetLinkButton :label="`Tập ${chapterOrder}`" />
        </div>
        <div class="col flex items-center justify-center">
            <q-btn
                id="prev_chapter_btn"
                dense
                class="bg-primary text-dark border-radius-sm"
            >
                <q-icon
                    name="play_arrow"
                    size="sm"
                    style="transform: rotate(180deg)"
                />
            </q-btn>
            <div
                id="chapter_list_btn"
                class="bg-primary text-dark text-weight-bold border-radius-sm q-mx-xs q-px-sm flex items-center justify-between"
                style="height: 32px"
            >
                <span class="chapter_list_btn_text">{{ chapterTitle }} </span>
                <q-icon
                    name="chevron_right"
                    size="sm"
                    style="transform: rotate(90deg)"
                />
            </div>
            <q-btn
                id="next_chapter_btn"
                dense
                class="bg-primary text-dark border-radius-sm"
            >
                <q-icon name="play_arrow" size="sm" />
            </q-btn>
        </div>
        <div
            id="chapter-action-buttons-group"
            class="col flex items-center justify-end"
        >
            <q-btn dense class="bg-light text-dark border-radius-sm">
                <q-icon name="chat_bubble" size="sm" />
            </q-btn>
            <q-btn dense class="bg-light text-dark border-radius-sm q-mx-sm">
                <q-icon name="info" size="sm" />
            </q-btn>
            <q-btn
                dense
                no-caps
                class="bg-light text-dark border-radius-sm flex items-center"
            >
                <q-icon name="bug_report" size="sm" />
                <span class="q-ml-xs text-subtitle2 text-weight-bold"
                    >Báo lỗi</span
                >
            </q-btn>
        </div>
    </section>
</template>

<script>
// Import dependencies section.
import { UrlHelper } from "src/helpers/UrlHelper";

// Import components section.
import GetLinkButton from "src/components/common/artwork/GetLinkButton.vue";

export default {
    name: "TheChapterHeaderBar",
    components: {
        GetLinkButton,
    },
    props: {
        comicId: {
            required: true,
        },
        comicTitle: {
            type: String,
            required: true,
        },
        chapterId: {
            required: true,
        },
        chapterTitle: {
            type: String,
            required: true,
        },
        chapterOrder: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            isCopyLink: false,
        };
    },
};
</script>

<style scoped>
* {
    --chapter-list-btn-width: 200px;
    --comic-title-width: 280px;
}

#chapter_list_btn {
    width: var(--chapter-list-btn-width);
}

#chapter_list_btn:hover {
    cursor: pointer !important;
    opacity: 0.9 !important;
}

.chapter_list_btn_text {
    max-width: calc(var(--chapter-list-btn-width) - 40px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.comic-title {
    max-width: var(--comic-title-width) !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.comic-title:hover {
    opacity: 0.8;
}
</style>
