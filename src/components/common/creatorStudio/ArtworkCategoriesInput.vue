<template>
    <section id="categories-section">
        <div
            class="flex items-center justify-between q-mb-xs"
            :class="{ error: hasError }"
        >
            <label class="text-weight-bold">
                <span>Thể loại</span>
                <span class="asterisk">*</span>
            </label>

            <span :class="{ error: hasError }">
                <span v-if="selectedCategories.length == 0"> Chưa chọn </span>
                <span
                    v-if="selectedCategories.length != 0"
                    class="flex items-center"
                >
                    <q-badge class="bg-primary text-dark text-weight-bold">{{
                        selectedCategories.length
                    }}</q-badge>
                    <span class="q-ml-xs text-subtitle2">thể loại</span>
                </span>
            </span>
        </div>
        <div class="flex items-center">
            <div class="flex items-center categories-container fit">
                <div
                    class="categories-list flex wrap q-gutter-sm"
                    :class="{ error: hasError }"
                >
                    <CategorySelectedTag
                        v-for="category in selectedCategories"
                        :key="category.id"
                        v-bind="category"
                        @removeItem="onCategoryItemRemove"
                    />
                    <q-btn
                        dense
                        class="category-add-button q-ml-sm"
                        @click="showDropdown = !showDropdown"
                    >
                        <q-icon name="add" size="sm" />
                    </q-btn>
                </div>
            </div>
            <section
                class="category-dropdown-container q-mt-md shadow-1"
                :class="{ hidden: !showDropdown }"
            >
                <div class="flex items-center">
                    <div class="col-grow q-mr-sm">
                        <q-input
                            outlined
                            v-model="searchCategory"
                            :dense="true"
                            class="text-subtitle1"
                            placeholder="Từ khóa thể loại"
                        >
                            <template v-slot:prepend>
                                <q-icon name="search" />
                            </template>
                        </q-input>
                    </div>
                    <q-btn
                        class="bg-dark text-white"
                        label="reset"
                        @click="resetCategories"
                    />
                </div>
                <section class="q-mt-md">
                    <div class="q-mb-sm">
                        <span>
                            Nhấn các tag bên dưới để thêm thể loại vào tác phẩm,
                            nhấn lại để xóa thể loại khỏi tác phẩm.
                        </span>
                    </div>
                    <div class="flex q-gutter-sm">
                        <CategoryTag
                            v-for="category in categories"
                            :key="category.id"
                            v-bind="category"
                            @changeState="onCategoryTagChangeState"
                            @preSelect="onCategoryTagPreSelect"
                        />
                    </div>
                </section>
            </section>
        </div>
    </section>
</template>

<script>
import { StringHelper } from "src/helpers/StringHelper";
import { CategoryItem } from "src/api.models/creatorStudio/common/CategoryItem";
import CategoryTag from "./ArtworkCategoryTag.vue";
import CategorySelectedTag from "./ArtworkCategorySelectedTag.vue";
import { CreatorStudio6ApiHandler } from "src/api.handlers/creatorStudio/creatorStudio6Page/CreatorStudio6ApiHandler";

// The name of this input support for changes detected.
const inputName = "category";

export default {
    components: {
        CategoryTag,
        CategorySelectedTag,
    },
    props: {
        modelValue: {
            type: Array,
            required: true,
        },
    },
    emits: ["update:modelValue", "verifyInput", "hasChange"],
    data() {
        return {
            showDropdown: false,
            /**
             * @type {CategoryItem[]} The type of this array.
             */
            categories: [],
            /**
             * @type {CategoryItem[]} The type of this array.
             */
            selectedCategories: [],
            // This array contains all instances of the
            // CategoryTag component that are selected for this artwork.
            selectedCategoryTags: [],
            searchCategory: null,
            hasError: false,
        };
    },
    async beforeMount() {
        const _categories =
            await CreatorStudio6ApiHandler.getAllCategoriesAsync();

        if (_categories) {
            _categories.forEach((item) => this.categories.push(item));
        }

        if (this.modelValue && this.modelValue.length > 0) {
            this.fillUpSelectedCategories(this.modelValue);
        }
    },
    mounted() {
        this.$emit("verifyInput", this);
    },
    methods: {
        /**
         * @param {CategoryItem[]} selectedCategoryList The list contains all selected categories.
         */
        fillUpSelectedCategories(selectedCategoryList) {
            for (let i = 0; i < selectedCategoryList.length; i++) {
                const categoryItem = selectedCategoryList[i];

                // Change the prop:isSelected to (true) for the found category item.
                const foundCategoryItem = this.categories.find(
                    (item) => item.id == categoryItem.id
                );

                foundCategoryItem.isSelected = true;
                this.selectedCategories.push(foundCategoryItem);
            }
        },
        // This method is supported for debug purpose.
        showCategories() {
            console.log("Selected Categories", this.selectedCategories);
            console.log("Category Tag", this.selectedCategoryTags);
        },
        verifyInput() {
            if (this.selectedCategories.length > 0) {
                this.hasError = false;
                return true;
            }

            this.hasError = true;
            return false;
        },
        resetCategories() {
            this.selectedCategoryTags.forEach((item) => item.removeTag());
            // Clear the selected categories array.
            this.selectedCategories.splice(0, this.selectedCategories.length);
        },
        addCategoryTag(categoryTag) {
            const notFoundIndex = -1;
            const foundCategoryTagIndex = this.selectedCategoryTags.findIndex(
                (item) => item.id == categoryTag.id
            );

            if (foundCategoryTagIndex == notFoundIndex) {
                this.selectedCategoryTags.push(categoryTag);
            }
        },
        removeCategoryTagById(categoryTagId) {
            const notFoundIndex = -1;

            const foundCategoryTagIndex = this.selectedCategoryTags.findIndex(
                (item) => item.id == categoryTagId
            );

            const foundCategoryIndex = this.selectedCategories.findIndex(
                (item) => item.id == categoryTagId
            );

            if (foundCategoryIndex != notFoundIndex) {
                this.selectedCategories.splice(foundCategoryIndex, 1);
                this.selectedCategoryTags.splice(foundCategoryTagIndex, 1);
            }

            // Emit the event with all selected categories of this artwork.
            this.$emit("update:modelValue", this.selectedCategories);

            // Emit hasChange event to let parent know.
            this.$emit("hasChange", inputName, true);
        },
        onCategoryTagPreSelect(categoryTag) {
            this.addCategoryTag(categoryTag);
        },
        /**
         * @param {CategoryItem} categoryItem The category item to handle.
         */
        onCategoryTagChangeState(categoryItem, categoryTag) {
            const notFoundIndex = -1;
            if (categoryItem.isSelected) {
                // Check if this category item is added to the selected list.
                const itemIndex = this.selectedCategories.findIndex(
                    (item) => item.id == categoryItem.id
                );

                const isItemExisted = itemIndex != notFoundIndex;

                if (!isItemExisted) {
                    this.selectedCategories.push(categoryItem);

                    // The category tag for later operation.
                    this.addCategoryTag(categoryTag);
                }
            } else {
                // If isSelected is false, then remove this
                // category item from the selected list.
                this.removeCategoryTagById(categoryItem.id);
            }

            // Emit the event with all selected categories of this artwork.
            this.$emit("update:modelValue", this.selectedCategories);

            // Emit hasChange event to let parent know.
            this.$emit("hasChange", inputName, true);
            this.verifyInput();
        },
        /**
         * @param {CategoryItem} categoryItem The category item to handle.
         */
        onCategoryItemRemove(categoryItem) {
            // Remove from the selected list first.
            const notFoundIndex = -1;
            const foundCategoryIndex = this.selectedCategories.findIndex(
                (item) => item.id == categoryItem.id
            );

            if (foundCategoryIndex != notFoundIndex) {
                this.selectedCategories.splice(foundCategoryIndex, 1);
            }

            // Find the respective CategoryTag component instance
            // to trigger its removeTag function.
            const foundCategoryTag = this.selectedCategoryTags.find(
                (categoryTag) => categoryTag.id == categoryItem.id
            );

            if (foundCategoryTag) {
                foundCategoryTag.removeTag();
            }

            this.removeCategoryTagById(categoryItem.id);
        },
        trySearchCategoryByKeyword() {
            if (this.searchCategory == "") {
                this.clearSearch();

                return;
            }

            for (let i = 0; i < this.categories.length; i++) {
                const currentCategoryItem = this.categories[i];
                const searchKeyword = StringHelper.replaceAccentChar(
                    this.searchCategory
                );

                const categoryLabel = StringHelper.replaceAccentChar(
                    currentCategoryItem.label
                ).toLowerCase();

                // Search the category with matching label.
                if (categoryLabel.includes(searchKeyword.toLowerCase())) {
                    currentCategoryItem.matchedSearch = true;
                } else {
                    currentCategoryItem.matchedSearch = false;
                }
            }
        },
        clearSearch() {
            this.categories.forEach((item) => (item.matchedSearch = false));
        },
    },
    watch: {
        searchCategory() {
            this.trySearchCategoryByKeyword();
        },
    },
};
</script>

<style scoped>
.asterisk {
    color: #dc5834;
    font-weight: bold;
}

.error {
    color: #dc5834;
}

.categories-container,
.category-add-button,
.category-dropdown-container {
    --dark: #120e36;
    --border-radius: 4px;
    --light-500: #eeeeee;
}

.categories-container {
    padding: 8px;
    border: 1px solid var(--dark);
    border-radius: var(--border-radius);
}

.category-add-button {
    padding: 8.4px 12px;
    background-color: var(--light-500);
    border-radius: var(--border-radius);
}

.category-add-button:hover {
    cursor: pointer;
    background-color: var(--dark);
    color: var(--light-500);
}

.category-dropdown-container {
    display: block;
    transition-delay: 0.2s;
    transition-duration: 0.2s;
    padding: 16px;
    border-radius: 4px;
}
</style>
