<template>
    <div v-if="showComponent" :id="componentId" class="app-pagination">
        <q-btn
            v-if="showBoundaryLinks"
            :id="`${componentId}_first_btn`"
            dense
            unelevated
            flat
            class="pagination-button"
            :class="{ disabled: reachMin }"
            icon="keyboard_double_arrow_left"
            :style="buttonStyle"
            @click="firstPage"
            :disable="reachMin || disable"
        />
        <q-btn
            v-if="showDirectionLinks"
            :id="`${componentId}_next_btn`"
            dense
            unelevated
            flat
            class="pagination-button"
            :class="{ disabled: reachMin }"
            icon="chevron_left"
            :style="buttonStyle"
            @click="prevPage"
            :disable="reachMin || disable"
        />
        <span
            v-for="numberBtn in displayButtons"
            :key="numberBtn"
            :style="buttonStyle"
        >
            <q-btn
                v-if="numberBtn != INPUT_BUTTON"
                dense
                unelevated
                flat
                class="pagination-button"
                :class="{ selected: numberBtn == currentPageNumber }"
                @click="setPageNumber(numberBtn)"
                :disable="disable"
            >
                {{ numberBtn }}
            </q-btn>
            <q-btn
                v-else
                dense
                unelevated
                flat
                icon="more_horiz"
                class="pagination-button"
                :disable="disable"
            >
                <q-menu fit self="top middle" v-model="showInputMenu">
                    <input
                        style="
                            border: none;
                            outline: none !important;
                            width: 100px;
                        "
                        placeholder="Số trang"
                        type="number"
                        name="page-number"
                        id="page-number"
                        class="q-ma-sm"
                        @focusout="setPageNumberByInput"
                        @keyup="onKeyUpInputPageNumber"
                        v-model="inputPageNumber"
                    />
                </q-menu>
            </q-btn>
        </span>
        <q-btn
            v-if="showDirectionLinks"
            :id="`${componentId}_prev_btn`"
            dense
            unelevated
            flat
            class="pagination-button"
            :class="{ disabled: reachMax }"
            :style="buttonStyle"
            icon="chevron_right"
            @click="nextPage"
            :disable="reachMax || disable"
        />
        <q-btn
            v-if="showBoundaryLinks"
            :id="`${componentId}_last_btn`"
            dense
            unelevated
            flat
            class="pagination-button"
            :class="{ disabled: reachMax }"
            icon="keyboard_double_arrow_right"
            :style="buttonStyle"
            @click="lastPage"
            :disable="reachMax || disable"
        />
    </div>
</template>

<script>
// Import dependencies section.
import { StringHelper } from "src/helpers/StringHelper";
const SHOW_ALL_PAGES = -1;
const INPUT_BUTTON = -2;

export default {
    name: "AppPagination",
    emits: ["update:modelValue", "hasChange"],
    props: {
        modelValue: {
            type: Number,
            required: true,
        },
        /**
         * Indicate to disable all the pagination buttons and the pagination bar.
         * @note The default value is (false).
         */
        disable: {
            type: Boolean,
            default: false,
        },
        /**
         * The gutter space between the pagination buttons.
         */
        gutter: {
            type: String,
            default: "4.8px",
        },
        /**
         * The maximum page to display on the pagination bar.
         */
        max: {
            type: Number,
            required: true,
            default: 0,
        },
        /**
         * The maximum number of pagination buttons to display at a time.
         * @note If set to (SHOW_ALL_PAGES = -1), the component will show all pagination buttons (equal to max)
         * @note If not set, the default value is 6.
         * @remarks Set this value to control how many page buttons are rendered at once.
         */
        maxDisplayPages: {
            type: Number,
            default: 6,
        },
        /**
         * Indicate to show the direction button links
         * @note Default is set to (true).
         */
        showDirectionLinks: {
            type: Boolean,
            default: true,
        },
        /**
         * Indicate to show the boundary button links
         * @note Default is set to (false).
         */
        showBoundaryLinks: {
            type: Boolean,
            default: false,
        },
        /**
         * Indicate to show the pagination input to enter the page number to navigate.
         * @note If show-pagination-input is (true), the component will automatically calculate when to show the input.
         * @remarks Default is set to (true).
         */
        showInput: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            /**
             * The id of this pagination component.
             */
            componentId: null,
            /**
             * Indicate if the component will be showned or not.
             */
            showComponent: true,
            currentPageNumber: 1,
            inputPageNumber: null,
            showInputMenu: false,
            /**
             * The flag to check if the current pagination reach its minimum page (equal 1).
             */
            reachMin: true,
            /**
             * The flag to check if the current pagination reach its maximum page.
             */
            reachMax: false,
            buttonStyle: {
                "margin-right": this.gutter,
                // "margin-bottom": this.gutter,
            },
            displayButtons: [],
            INPUT_BUTTON: INPUT_BUTTON,
        };
    },
    mounted() {
        if (!this.max || this.max <= 0) {
            this.showComponent = false;
            return;
        }

        // Init random id for the component.
        const idLength = 6;
        const prefix = "app_pagination";
        const randomId = StringHelper.generateSecureRandomString(idLength);
        this.componentId = `${randomId}_${prefix}`;

        // Init the display range.
        this.getDisplayButtons();
    },
    methods: {
        setPageNumber(pageNumber) {
            this.currentPageNumber = pageNumber;

            this.emitUpdateEvent();
        },
        /**
         * @param {InputEvent} event The event listen to when key up.
         */
        onKeyUpInputPageNumber(event) {
            if (event.key === "Enter") {
                this.setPageNumberByInput();
            }
        },
        setPageNumberByInput() {
            this.showInputMenu = false;

            // If the input number is exceed the max, then set it as max.
            if (this.inputPageNumber > this.max) {
                this.currentPageNumber = this.max;
            }
            // If the input number is lower than the min, then set it as min.
            else if (this.inputPageNumber < 1) {
                this.currentPageNumber = 1;
            }
            // Otherwise, set the value as the input.
            else {
                this.currentPageNumber = this.inputPageNumber;
            }

            this.emitUpdateEvent();
        },
        /**
         * Navigate to the first page of the pagination bar.
         */
        firstPage() {
            this.currentPageNumber = 1;

            this.emitUpdateEvent();
        },
        /**
         * Navigate to the last page of the pagination bar.
         */
        lastPage() {
            this.currentPageNumber = this.max;

            this.emitUpdateEvent();
        },
        prevPage() {
            // Check if current page number reach minimum page or not.
            if (this.currentPageNumber > 1) {
                this.currentPageNumber--;

                this.emitUpdateEvent();
            }
        },
        nextPage() {
            // Check if current page number reach maximum page or not.
            if (this.currentPageNumber < this.max) {
                this.currentPageNumber++;

                this.emitUpdateEvent();
            }
        },
        /**
         * Get the display range of pagination page numbers.
         */
        getDisplayButtons() {
            // Clear the display range to update the pagination bar.
            const isNotEmpty = this.displayButtons.length != 0;
            if (isNotEmpty) {
                this.displayButtons.splice(0, this.displayButtons.length);
            }

            // If the maxPages is equal to (SHOW_ALL_PAGES options),
            // or the difference between maxDisplayPages and max
            // is not large, then show all the pages
            const MIN_DIFFERENCE_TO_SHOW_PARTLY = 2;

            const showAllPages =
                this.maxDisplayPages == SHOW_ALL_PAGES ||
                this.max - this.maxDisplayPages <=
                    MIN_DIFFERENCE_TO_SHOW_PARTLY;

            if (showAllPages) {
                for (
                    let buttonNumber = 1;
                    buttonNumber <= this.max;
                    buttonNumber++
                ) {
                    this.displayButtons.push(buttonNumber);
                }

                return;
            }

            if (this.showInput) {
                this.getDisplayButtonsWhenShowInput();

                return;
            }

            // Check if the current page number is nearly reach the max.
            const isNearlyMax =
                this.max - this.currentPageNumber < this.maxDisplayPages;

            if (isNearlyMax) {
                const lowerRange = this.max - this.maxDisplayPages + 1;
                const upperRange = this.max;

                for (let button = lowerRange; button <= upperRange; button++) {
                    this.displayButtons.push(button);
                }

                return;
            }

            this.getDisplayButtonsWhenHideInput();
        },
        /**
         * Get the display buttons when the show-input flag is true.
         */
        getDisplayButtonsWhenShowInput() {
            // Show partly the pagination bar when the difference between
            // the max and the maxDisplayPages are large enough.
            // (- 2) is to show the first button and the input if indicate
            const DIFFERENCE_TO_SHOW_MAX = this.maxDisplayPages - 2;

            // Show the max number if the current page number
            // is less than the max in the range that can show.
            const showMax =
                this.max - this.currentPageNumber < DIFFERENCE_TO_SHOW_MAX;

            if (showMax) {
                const FIRST_BUTTON = 1;
                const NEXT_BUTTON_AFTER_FIRST_BUTTON = this.showInput
                    ? INPUT_BUTTON
                    : 2;

                // Add 2 first button into the pagination bar.
                this.displayButtons.push(
                    FIRST_BUTTON,
                    NEXT_BUTTON_AFTER_FIRST_BUTTON
                );

                const rangeButton = this.max - (DIFFERENCE_TO_SHOW_MAX - 1);
                for (let button = rangeButton; button <= this.max; button++) {
                    this.displayButtons.push(button);
                }

                return;
            }

            // Show partly when current page number is still small.
            const EXCLUDING_INPUT_BUTTON_AND_LAST_BUTTON = 2;
            const maxDisplayPages =
                this.maxDisplayPages - EXCLUDING_INPUT_BUTTON_AND_LAST_BUTTON;

            const coefficient = Math.floor(
                this.currentPageNumber / maxDisplayPages
            );

            const modCoefficient = this.currentPageNumber % maxDisplayPages;

            // If the current page number reach the upper range of its range,
            // then calculate the display lower range and upper range differently.
            // Example:
            // - If (maxDisplayPages = 6), (currentPageNumber = 12), (max = 20)
            // - Then the currentPageNumber reach the upper of the range [6, 12];
            const reachUpperRange = modCoefficient == 0;

            // Get the lower range and upper range of the pagination
            // to display the corresponding number buttons.
            const lowerRange = reachUpperRange
                ? (coefficient - 1) * maxDisplayPages + 1
                : coefficient * maxDisplayPages + 1;

            const upperRange = reachUpperRange
                ? Math.min(coefficient * maxDisplayPages, this.max)
                : Math.min((coefficient + 1) * maxDisplayPages, this.max);

            for (let button = lowerRange; button <= upperRange; button++) {
                this.displayButtons.push(button);
            }

            const LAST_BUTTON = this.max;
            this.displayButtons.push(INPUT_BUTTON, LAST_BUTTON);
        },
        /**
         * Get the display buttons when the show-input flag is false.
         */
        getDisplayButtonsWhenHideInput() {
            const coefficient = Math.floor(
                this.currentPageNumber / this.maxDisplayPages
            );

            const modCoefficient =
                this.currentPageNumber % this.maxDisplayPages;

            // If the current page number reach the upper range of its range,
            // then calculate the display lower range and upper range differently.
            // Example:
            // - If (maxDisplayPages = 6), (currentPageNumber = 12), (max = 20)
            // - Then the currentPageNumber reach the upper of the range [6, 12];
            const reachUpperRange = modCoefficient == 0;

            // Get the lower range and upper range of the pagination
            // to display the corresponding number buttons.
            const lowerRange = reachUpperRange
                ? (coefficient - 1) * this.maxDisplayPages + 1
                : coefficient * this.maxDisplayPages + 1;

            const upperRange = reachUpperRange
                ? Math.min(coefficient * this.maxDisplayPages, this.max)
                : Math.min((coefficient + 1) * this.maxDisplayPages, this.max);

            for (let button = lowerRange; button <= upperRange; button++) {
                this.displayButtons.push(button);
            }
        },
        emitUpdateEvent() {
            this.reachMin = this.currentPageNumber == 1;
            this.reachMax = this.currentPageNumber == this.max;

            this.getDisplayButtons();
            this.$emit("update:modelValue", this.currentPageNumber);
            this.$emit("hasChange");
        },
    },
};
</script>

<style scoped>
.pagination-button {
    --light-300: #eeeeee;
    --light-500: #afafaf;
    --dark: #120e36;
    --min-width: 32px;

    min-width: var(--min-width) !important;
    text-align: center !important;
    background-color: var(--light-300) !important;
    color: var(--dark);
}

.pagination-button.selected {
    background-color: var(--dark) !important;
    color: var(--light-300) !important;
    font-weight: bold;
}

.pagination-button.disabled {
    background-color: var(--light-500) !important;
}

.pagination-button:last-child {
    margin-right: 0 !important;
}

@media screen and (min-width: 600px) {
    .pagination-button {
        margin-bottom: none !important;
    }
}
</style>
