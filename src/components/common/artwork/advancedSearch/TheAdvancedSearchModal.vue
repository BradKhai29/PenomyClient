<template>
    <q-card
        id="advanced-search-modal"
        class="q-mt-xl bg-light-100 shadow-1 text-dark-500"
    >
        <q-card-section
            class="row items-center q-pb-none"
            id="advanced-search-header"
        >
            <div class="text-subtitle1">Tìm kiếm nâng cao</div>
            <q-space />
            <q-btn
                icon="close"
                class="bg-light-500"
                flat
                round
                dense
                v-close-popup
            />
        </q-card-section>

        <q-card-section>
            <q-input
                id="searchKeyword"
                dense
                outlined
                v-model="searchKeyword"
                class="text-subtitle1 q-mb-md"
                color="dark"
                label="Nhập từ khóa"
            >
                <template v-slot:prepend>
                    <q-icon name="search" size="sm" />
                </template>
            </q-input>
            <div class="flex q-gutter-md q-mb-md">
                <q-input
                    id="searchCreator"
                    dense
                    outlined
                    v-model="searchCreator"
                    class="text-subtitle1 col-grow"
                    color="dark"
                    label="Nhập tên tác giả"
                >
                    <template v-slot:prepend>
                        <q-icon name="person_search" size="sm" />
                    </template>
                </q-input>
                <q-input
                    id="searchStudio"
                    dense
                    outlined
                    v-model="searchStudio"
                    class="text-subtitle1 col-grow"
                    color="dark"
                    label="Nhập tên studio"
                >
                    <template v-slot:prepend>
                        <q-icon name="camera" size="sm" />
                    </template>
                </q-input>
            </div>
            <AdvancedSearchOriginsInput v-model="selectedOrigins" />
            <ArtworkCategoriesInput
                class="q-mt-md"
                v-model="selectedCategories"
            />
            <section class="q-mt-md flex justify-end q-gutter-sm">
                <q-btn v-close-popup no-caps class="text-dark">Hủy</q-btn>
                <q-btn no-caps class="bg-dark text-light" @click="search"
                    >Tìm kiếm</q-btn
                >
            </section>
        </q-card-section>
    </q-card>
</template>

<script setup>
import { onMounted, ref } from "vue";
import ArtworkCategoriesInput from "./AdvancedSearchCategoriesInput.vue";
import AdvancedSearchOriginsInput from "./AdvancedSearchOriginsInput.vue";

onMounted(() => {
    console.log("Mounted advanced search");
});

const searchKeyword = ref("");
const searchCreator = ref("");
const searchStudio = ref("");
const selectedOrigins = ref([]);
const selectedCategories = ref([]);

function search() {
    console.log("searchKeyword", searchKeyword.value);
    console.log("searchCreator", searchCreator.value);
    console.log("searchStudio", searchStudio.value);
    console.log("selectedOrigins", selectedOrigins.value);
    console.log("selectedCategories", selectedCategories.value);
}
</script>

<style scoped>
#advanced-search-modal {
    --max-width: 960px;
    --min-width: 600px;
    --margin-x: 16px;

    max-width: clamp(
        var(--min-width),
        calc(100vw - var(--max-width)),
        var(--max-width)
    );

    margin-left: var(--margin-x);
    margin-right: var(--margin-x);

    border-radius: 6.4px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
#advanced-search-modal::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
#advanced-search-modal {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
</style>
