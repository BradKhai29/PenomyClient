<template>
    <q-page class="q-pa-md">
        <HeaderHighlight :label="headerLabel" />

        <section class="q-mt-md search-result-section">
            <div v-if="hasSearchItems">
                <SearchItemCard
                    v-for="item in searchResultItems"
                    :key="item.id"
                    :artworkDetail="item"
                />
            </div>
        </section>
    </q-page>
</template>

<script>
import { SearchApiHandler } from "src/api.handlers/artwork/common/SearchApiHandler";
import { SearchResponseItem } from "src/api.models/artwork/search/SearchResponseItem";
import { StringHelper } from "src/helpers/StringHelper";
import { ArrayHelper } from "src/helpers/ArrayHelper";

// Import components section.
import HeaderHighlight from "src/components/common/creatorStudio/HeaderHighlight.vue";
import SearchItemCard from "src/components/pages/artwork/artwork8Page/SearchItemCard.vue";

// Init store for later operation.
import { useSearchStore } from "src/stores/common/SearchStore";
const searchStore = useSearchStore();

export default {
    name: "Artwork8Page",
    components: {
        HeaderHighlight,
        SearchItemCard,
    },
    data() {
        return {
            searchText: null,
            /**
             *  @type {SearchResponseItem[]} Type of this list.
             */
            searchResultItems: [],
        };
    },
    computed: {
        currentSearchText() {
            return this.$route.query.searchText;
        },
        headerLabel() {
            return `Kết quả: ${this.searchResultItems.length} tác phẩm`;
        },
        hasSearchItems() {
            return this.searchResultItems.length > 0;
        },
    },
    mounted() {
        this.getSearchText();
        this.searchByKeywordAsync();
    },
    methods: {
        getSearchText() {
            this.searchText = this.$route.query.searchText;
        },
        async searchByKeywordAsync() {
            const isEmpty = StringHelper.isNullOrEmpty(this.searchText);

            if (isEmpty) {
                return;
            }

            console.log("Trigger search");
            const searchResult = await SearchApiHandler.searchComicAsync(
                this.searchText
            );

            if (searchResult) {
                searchStore.addSearchHistory(this.searchText);

                ArrayHelper.clear(this.searchResultItems);

                this.searchResultItems.push(...searchResult);
                console.log(searchResult);
            }
        },
    },
    watch: {
        currentSearchText(newPath, _) {
            this.getSearchText();
            console.log(this.searchText);

            this.searchByKeywordAsync();
        },
    },
};
</script>
