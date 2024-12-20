<template>
    <li
        class="flex text-dark-500 justify-between search-item"
        @click="goToSearchLink"
    >
        <div class="flex items-center">
            <q-icon name="schedule" size="sm" />
            <span class="q-ml-sm text-subtitle1">{{ label }}</span>
        </div>
        <q-btn
            @click="showRemoveDialog = true"
            flat
            dense
            no-caps
            class="remove-button"
        >
            Xóa
        </q-btn>

        <!-- Remove popup -->
        <q-dialog v-model="showRemoveDialog">
            <q-card>
                <q-card-section class="row items-center">
                    <q-avatar
                        icon="history"
                        color="negative"
                        text-color="light"
                        size="lg"
                    />
                    <span class="q-ml-sm text-subtitle1">
                        Xóa khỏi lịch sử tìm kiếm ?
                    </span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn
                        flat
                        no-caps
                        label="Đóng"
                        color="dark"
                        v-close-popup
                        class="text-subtitle1"
                    />
                    <q-btn
                        flat
                        no-caps
                        label="Xác nhận xóa"
                        color="negative"
                        class="text-subtitle1 text-weight-bold"
                        @click="removeSearchItem"
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <!-- Remove popup -->
    </li>
</template>

<script>
export default {
    name: "TheSearchBarItem",
    emits: ["removeItem"],
    props: {
        index: {
            type: Number,
            required: true,
        },
        label: {
            type: String,
            required: true,
            default: "Tìm kiếm gần đây",
        },
    },
    data() {
        return {
            showRemoveDialog: false,
        };
    },
    methods: {
        goToSearchLink() {
            const link = `/artwork/search?searchText=${this.label}`;

            this.$router.push(link);
        },
        removeSearchItem() {
            this.$emit("removeItem", this.index);

            this.showRemoveDialog = false;
        },
    },
};
</script>

<style scoped>
.remove-button,
.search-item {
    --light-300: #eeeeee;
    --light-500: #dddddd;
}

.search-item {
    padding: 4px;
    border-radius: 4px;
}

.search-item:hover {
    cursor: pointer;
    background-color: var(--light-300);
}

.remove-button {
    text-decoration: underline;
}

.remove-button:hover {
    background-color: var(--light-500);
}
</style>
