<template>
    <section
        id="chapter-navigation-wrapper"
        class="q-py-md row justify-center items-center relative-position"
    >
        <div
            class="chapter-navigation bg-dark-500 flex items-center text-light text-subtitle1 text-weight-bold"
        >
            <q-btn
                no-caps
                dense
                padding="none"
                :to="`/artwork/comic/${comicId}`"
                class="q-ml-sm text-decoration-none comic-title text-subtitle1 text-weight-bold"
            >
                {{ comicTitle }}
            </q-btn>
            <span class="text-weight-bold">
                <q-icon name="chevron_right" size="sm" />
            </span>
            <span>{{ chapterTitle }}</span>
        </div>

        <ChapterListMenu class="col-12" :chapterList="chapterList" />
    </section>
</template>

<script>
import ChapterListMenu from "./ChapterListMenu.vue";

export default {
    components: {
        ChapterListMenu,
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
        chapterList: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style scoped>
.chapter-navigation {
    --max-width: 800px;

    width: 100% !important;
    max-width: var(--max-width);
    padding: 0px 4px;
}

.comic-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
