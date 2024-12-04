<template>
    <section>
        <section class="bg-dark-900 q-mt-xs q-py-md shadow-1 chapter-list-menu">
            <div
                class="flex justify-center q-gutter-lg q-mx-xl relative-position"
            >
                <!-- Menu Buttons section -->
                <q-btn
                    @click="toPrevious"
                    unelevated
                    flat
                    class="menu-button"
                    style="left: 0"
                >
                    <q-icon
                        name="chevron_right"
                        size="md"
                        class="text-light"
                        style="transform: rotate(180deg)"
                    />
                </q-btn>

                <q-btn
                    @click="toNext"
                    unelevated
                    flat
                    class="menu-button"
                    style="right: 0"
                >
                    <q-icon name="chevron_right" size="md" class="text-light" />
                </q-btn>

                <router-link
                    :to="getChapterLink(chapter.id)"
                    @click="goToChapter(chapter.id)"
                    v-for="chapter in chapterList"
                    :key="chapter.id"
                    class="text-decoration-none"
                >
                    <div>
                        <div class="chapter-item-image">
                            <q-img
                                :src="chapter.thumbnailUrl"
                                :ratio="1"
                                width="100%"
                                height="100%"
                            />
                        </div>
                        <div
                            class="text-center text-subtitle2 text-weight-bold q-py-xs"
                            :class="
                                currentChapterId == chapter.id
                                    ? 'bg-primary text-dark'
                                    : 'bg-light-500 text-dark'
                            "
                        >
                            Tập {{ chapter.uploadOrder }}
                        </div>
                    </div>
                </router-link>
            </div>
        </section>
        <section
            class="fixed top chapter-list-menu-blur"
            @click="closeMenu"
        ></section>
    </section>
</template>

<script>
import { Art5RouteNames } from "src/router/artwork/Artwork5PageRoute";

export default {
    name: "ChapterListMenu",
    emits: ["goToChapter", "closeMenu"],
    props: {
        chapterList: {
            type: Array,
            required: true,
        },
        showMenu: {
            type: Boolean,
            default: false,
        },
        comicId: {
            required: true,
        },
    },
    computed: {
        currentChapterId() {
            return this.$route.params.chapterId;
        },
    },
    methods: {
        getChapterLink(inputChapterId) {
            return {
                name: Art5RouteNames.ComicChapterDetail,
                params: {
                    comicId: this.comicId,
                    chapterId: inputChapterId,
                },
            };
        },
        goToChapter(inputChapterId) {
            const chapterLink = this.getChapterLink(inputChapterId);

            this.closeMenu();
            this.$emit("goToChapter", chapterLink);
        },
        closeMenu() {
            this.$emit("closeMenu");
        },
        toPrevious() {
            console.log("Previous");
        },
        toNext() {
            console.log("Next");
        },
    },
};
</script>

<style scoped>
.chapter-list-menu {
    z-index: 200;
    right: 0;
    left: 0;
    height: auto;
}

.chapter-list-menu-blur {
    z-index: 100;
    right: 0;
    left: 0;
    height: 100vh;
}

.chapter-item-image {
    --width: 100px;
    --height: var(--width);

    width: var(--width);
    height: var(--height);
}

.menu-button {
    position: absolute;
    z-index: 100 !important;
    top: 0 !important;
    bottom: 0 !important;
    display: flex !important;
    align-items: center !important;
}
</style>
