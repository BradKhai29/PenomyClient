<template>
    <q-btn color="dark" no-caps dense class="bg-dark categories-button">
        <div class="row items-center">
            <span>Thể loại</span>
            <q-icon right name="expand_more" size="sm" />
        </div>

        <q-menu
            v-model="showMenu"
            transition-show="jump-down"
            transition-hide="jump-up"
            :offset="[0, 12]"
            fit
        >
            <q-list class="q-py-sm categories-menu">
                <q-item id="categories-list" class="column">
                    <HeaderHighlight label="Thể loại" />
                    <div class="flex q-mt-sm q-gutter-sm">
                        <router-link
                            v-for="i in 20"
                            :key="i"
                            :to="`?i=${i}`"
                            class="q-pa-sm bg-light-300 text-dark category-tag"
                            >Tag [{{ i }}]</router-link
                        >
                    </div>
                </q-item>
                <q-item id="categories-list" class="column">
                    <HeaderHighlight label="Quốc gia" />
                    <div class="flex q-mt-sm q-gutter-sm">
                        <router-link
                            v-for="i in 4"
                            :key="i"
                            :to="`?country=${i}`"
                            class="q-pa-sm bg-light-300 text-dark category-tag"
                            >Nước [{{ i }}]</router-link
                        >
                    </div>
                </q-item>
            </q-list>
        </q-menu>
    </q-btn>
</template>

<script setup>
import HeaderHighlight from "src/components/common/creatorStudio/HeaderHighlight.vue";
import { ref } from "vue";

const showMenu = ref(false);
</script>

<style scoped>
.categories-button {
    border-radius: 6.4px;
    padding: 6.4px !important;
}

.categories-menu {
    --max-width: 640px;
    --min-width: 300px;

    min-width: var(--min-width) !important;
    max-width: var(--max-width) !important;
}

.category-tag,
.origin-tag {
    --light-500: #dddddd;

    text-decoration: none;
    border-radius: 4px !important;
}

.category-tag:hover,
.origin-tag:hover {
    cursor: pointer;
    background-color: var(--light-500) !important;
}
</style>
