<template>
    <section
        id="chapter-navigation"
        class="q-py-md bg-light-500 column items-center"
    >
        <div class="chapter-navigation text-dark">
            <div
                class="col flex items-center text-dark text-subtitle1 text-weight-bold"
            >
                <router-link
                    :to="`/artwork/comic/${comicId}`"
                    class="text-decoration-none text-dark comic-title"
                >
                    {{ comicTitle }}
                </router-link>
                <span class="text-weight-bold">
                    <q-icon name="chevron_right" size="sm" />
                </span>
                <span>{{ chapterTitle }}</span>
            </div>
        </div>
    </section>
</template>

<script>
export default {
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
