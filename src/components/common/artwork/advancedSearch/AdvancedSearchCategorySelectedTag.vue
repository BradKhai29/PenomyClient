<template>
    <div class="category-tag">
        <span class="tag-content text-subtitle1 flex items-center">
            <span class="q-mr-sm">
                {{ label }}
            </span>
            <span class="remove-button" @click="removeItem">
                <q-icon name="close" />
            </span>
        </span>
    </div>
</template>

<script>
import { CategoryItem } from "src/api.models/creatorStudio/common/CategoryItem";

export default {
    emits: ["removeItem"],
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
    },
    methods: {
        removeItem() {
            const removedCategoryItem = new CategoryItem(
                this.id,
                this.label,
                false
            );

            this.$emit("removeItem", removedCategoryItem);
        },
    },
};
</script>

<style scoped>
.category-tag,
.remove-button {
    --dark: #120e36;
    --dark-500: #150d58e1;
    --light-300: #eeeeee;
    --light-500: #dddddd;

    display: flex;
}

.category-tag .tag-content {
    background-color: var(--dark);
    color: var(--light-300);
    padding: 2px 6.4px;
    border-radius: 4px !important;
}

/* Remove button section */
.remove-button .q-icon {
    padding: 2px;
    border-radius: 100%;
    background-color: var(--light-300);
    color: var(--dark);
    font-weight: bold;
}

.remove-button .q-icon:hover {
    cursor: pointer;
    background-color: var(--light-500);
}
</style>
