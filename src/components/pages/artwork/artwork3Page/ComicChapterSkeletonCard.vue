<template>
    <div
        class="row items-center border-sm-top-light-500 border-sm-bottom-light-500"
    >
        <q-skeleton class="chapter-image" square />
        <section class="col-grow q-pl-md q-pr-sm">
            <div
                id="chapter_header"
                class="row text-subtitle2 items-center text-dark justify-between"
            >
                <q-skeleton width="48px" height="22px" />
            </div>
            <div class="q-mt-sm">
                <q-skeleton width="100%" height="24px" />
            </div>
            <div class="q-mt-sm">
                <q-skeleton width="100%" height="24px" />
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "ComicChapterSkeletonCard",
};
</script>

<style scoped>
.chapter-image {
    width: 100px;
    height: 100px;
    background-color: rgba(0, 0, 0, 0.16);
}
</style>
