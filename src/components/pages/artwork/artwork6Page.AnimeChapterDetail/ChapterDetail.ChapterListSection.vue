<template>
    <section
        id="chapter-list-container"
        class="q-pa-md bg-dark-900 flex-grow"
        :class="isVideoExpanded ? '' : 'q-ml-md border-radius-sm'"
    >
        <div
            id="chapter-list-header-button-group"
            class="flex items-center justify-between text-light"
        >
            <div class="flex items-center">
                <span class="text-subtitle1">Chọn tập</span>
            </div>
            <div class="flex items-center">
                <q-btn
                    dense
                    flat
                    padding="xs"
                    @click="selectDisplayMode(gridDisplayMode)"
                    :class="isGridMode ? 'text-primary' : ''"
                >
                    <q-icon name="window" />
                </q-btn>
                <q-btn
                    dense
                    flat
                    padding="xs"
                    @click="selectDisplayMode(listDisplayMode)"
                    :class="!isGridMode ? 'text-primary' : ''"
                >
                    <q-icon name="view_list" />
                </q-btn>
            </div>
        </div>

        <section v-if="hasChapters" id="chapter-list-section" class="q-mt-md">
            <div class="chapter-list-inner-wrapper row">
                <div
                    @click="selectChapter(chapter.id)"
                    class="chapter-item-wrapper col-sm-2"
                    v-for="chapter in chapterList"
                    :key="chapter.id"
                >
                    <router-link class="underline-none">
                        <div
                            class="q-mr-sm q-mb-sm text-subtitle2 anime-chapter-grid-item q-px-md q-py-sm"
                            :class="
                                chapter.id == currentChapterId
                                    ? 'border-sm-primary text-primary text-weight-bold'
                                    : 'text-light border-sm-invisible'
                            "
                        >
                            <span class="title">
                                {{ chapter.uploadOrder }}
                            </span>
                        </div>
                    </router-link>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import { AnimeChapterDetailResponseDto } from "src/api.models/artwork/artwork6Page/AnimeChapterDetailResponseDto";

export default {
    name: "AnimeChapterListSection",
    props: {
        artworkId: {
            required: true,
        },
        chapterId: {
            required: true,
        },
        isVideoExpanded: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            /**
             * @type {AnimeChapterDetailResponseDto[]} Type of this array.
             */
            chapterList: [],
            chapterDisplayMode: "",
            currentChapterId: null,
        };
    },
    computed: {
        maxGridItemPerLine() {
            return 6;
        },
        gridDisplayMode() {
            return "grid";
        },
        listDisplayMode() {
            return "list";
        },
        isGridMode() {
            return this.chapterDisplayMode == this.gridDisplayMode;
        },
        hasChapters() {
            return this.chapterList.length > 0;
        },
    },
    beforeMount() {
        this.chapterDisplayMode = this.gridDisplayMode;
    },
    async mounted() {
        for (let i = 0; i < 12; i++) {
            const chapterItem = new AnimeChapterDetailResponseDto(
                i,
                "chapter_" + i,
                i + 1,
                ""
            );

            this.chapterList.push(chapterItem);
        }
    },
    methods: {
        selectDisplayMode(displayMode) {
            this.chapterDisplayMode = displayMode;
        },
        selectChapter(chapterId) {
            this.currentChapterId = chapterId;
        },
    },
};
</script>

<style scoped>
.chapter-list-inner-wrapper {
    --max-width: 340px;

    max-width: var(--max-width) !important;
}

.anime-chapter-grid-item {
    background-color: rgba(66, 66, 66, 0.48) !important;
}

.anime-chapter-grid-item .title {
    display: inline-block;
    width: 16px !important;
    text-align: center;
}
</style>
