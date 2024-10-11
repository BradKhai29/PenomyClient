<template>
    <div
        class="category-tag"
        :class="{ selected: isChecked, 'matched-search': matchedSearch }"
        @click="toggleTag"
    >
        <span class="tag-content text-subtitle1">{{ label }}</span>
    </div>
</template>

<script>
import { CategoryItem } from "src/api.models/creatorStudio/common/CategoryItem";

export default {
    data() {
        return {
            isChecked: false,
        };
    },
    mounted() {
        if (this.isSelected) {
            this.isChecked = this.isSelected;

            this.emitPreSelect();
        }
    },
    emits: ["changeState", "preSelect"],
    props: {
        id: {
            required: true,
            default: null,
        },
        label: {
            type: String,
            required: true,
            default: "",
        },
        isSelected: {
            type: Boolean,
            default: false,
        },
        matchedSearch: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        removeTag() {
            this.isChecked = false;
        },
        toggleTag() {
            this.isChecked = !this.isChecked;
            this.emitChangeState();
        },
        emitChangeState() {
            const categoryItem = new CategoryItem(
                this.id,
                this.label,
                this.isChecked
            );

            this.$emit("changeState", categoryItem, this);
        },
        /**
         *  This emit is triggered if the initial
         *  state has prop:isSelected equal (true).
         *
         *  Support for loading the state of the artwork from the WebAPI.
         */
        emitPreSelect() {
            this.$emit("preSelect", this);
        },
    },
};
</script>

<style scoped>
.category-tag {
    --dark: #120e36;
    --dark-500: #150d58e1;
    --light-300: #eeeeee;
    --light-500: #dddddd;
    --primary-700: #53bf94;
    --primary-700-opacity: #4ea783;

    display: flex;
}

.matched-search * {
    background-color: var(--primary-700) !important;
}

.matched-search *:hover {
    background-color: var(--primary-700-opacity) !important;
}

.category-tag .tag-content {
    background-color: var(--light-300);
    color: var(--dark);
    padding: 4px 6.4px;
    border-radius: 4px !important;
}

.category-tag:hover,
.category-tag .tag-content:hover {
    cursor: pointer;
    background-color: var(--light-500);
    border-radius: 4px !important;
}

.category-tag.selected .tag-content {
    background-color: var(--dark) !important;
    color: var(--light-300) !important;
}

.category-tag.selected .tag-content:hover {
    background-color: var(--dark-500) !important;
    color: var(--light-300) !important;
}
</style>
