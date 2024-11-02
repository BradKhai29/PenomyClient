<template>
    <section id="allow-comment">
        <div class="flex items-center q-mb-sm">
            <span class="text-weight-bold q-pr-xs"> Tùy chọn xuất bản </span>
            <span>
                <q-icon name="info_outline" size="xs" />
                <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[5, 5]"
                    :transition-duration="100"
                    class="text-subtitle2 text-light bg-dark"
                >
                    Chọn "lên lịch" để cài đặt thời gian xuất bản.
                </q-tooltip>
            </span>
        </div>
        <div class="flex q-gutter-md">
            <RadioInput
                v-model="publishOption"
                :value="publishOptions.immediate"
                :name="inputName"
                label="Ngay lập tức"
                checked
            />
            <RadioInput
                v-model="publishOption"
                :value="publishOptions.scheduled"
                :name="inputName"
                label="Lên lịch xuất bản"
            />
        </div>
        <div
            id="schedule-detail"
            v-show="publishOption == publishOptions.scheduled"
        >
            <section class="flex q-mt-md schedule-detail">
                <div id="schedule-date" class="q-mr-sm">
                    <q-field
                        :outlined="true"
                        :dense="true"
                        @click="showDatePicker = true"
                        color="primary"
                    >
                        <template v-slot:prepend>
                            <q-icon name="event" />
                        </template>

                        <template v-slot:control>
                            <div class="text-weight-bold self-center">
                                {{ scheduleDate }}
                            </div>
                        </template>
                    </q-field>
                    <q-menu v-model="showDatePicker">
                        <q-date
                            v-model="scheduleDate"
                            :mask="dateMask"
                            today-btn
                            color="primary"
                        />
                    </q-menu>
                </div>
                <div id="schedule-time" class="q-mr-sm">
                    <q-field
                        outlined
                        dense
                        @click="showTimePicker = true"
                        color="primary"
                    >
                        <template v-slot:control>
                            <div class="self-center text-weight-bold">
                                {{ scheduleTime }}
                            </div>
                        </template>
                    </q-field>
                    <q-menu v-model="showTimePicker">
                        <q-time
                            now-btn
                            color="primary"
                            v-model="scheduleTime"
                        />
                    </q-menu>
                </div>
                <div id="schedule-timezone">
                    <q-field outlined dense color="primary">
                        <template v-slot:control>
                            <div class="self-center text-weight-bold">
                                {{ clientTimezone }}
                            </div>
                        </template>
                    </q-field>
                </div>
            </section>
            <section class="q-mt-sm">
                Tập truyện sẽ được xuất bản theo thời gian đã được lên lịch.
            </section>
        </div>
    </section>
</template>

<script>
// Import dependencies section.
import { DateTimeHelper } from "src/helpers/DateTimeHelper";
// Import components section.
import RadioInput from "./ArtworkRadioInput.vue";

const publishOptions = {
    immediate: "immediate",
    scheduled: "scheduled",
};

import { ScheduleOptionDetail } from "src/api.models/creatorStudio/common/ScheduleOptionDetail";

export default {
    name: "ChapterPublishOptionsInput",
    components: {
        RadioInput,
    },
    emit: ["update:modelValue", "hasChange"],
    props: {
        modelValue: {
            type: ScheduleOptionDetail,
            required: true,
        },
    },
    data() {
        return {
            inputName: "publishOptions",
            dateMask: "DD/MM/YYYY",
            showDatePicker: false,
            showTimePicker: false,
            scheduleDate: null,
            scheduleTime: null,
            clientTimezone: DateTimeHelper.getClientTimeZone(),
            publishOptions: publishOptions,
            /**
             * @type {Number} The enum value indicate the option of publishing the chapter.
             */
            publishOption: null,
        };
    },
    mounted() {
        const publishDateTime = this.modelValue.scheduleDate ?? new Date();
        const hours = String(publishDateTime.getHours()).padStart(2, "0");
        const minutes = String(publishDateTime.getMinutes()).padStart(2, "0");

        this.scheduleTime = `${hours}:${minutes}`;
        this.scheduleDate = DateTimeHelper.getFormatDateTimeString(
            publishDateTime,
            DateTimeHelper.DD_MM_YYYY_FORMAT
        );

        this.publishOption = publishOptions.immediate;
    },
    methods: {
        /**
         * @returns {Date} The date instance that represented the scheduled datetime.
         */
        getScheduleDateTime() {
            const scheduleDateTokens = this.scheduleDate.split("/");
            const scheduleTimeTokens = this.scheduleTime.split(":");

            // Year, month, date section (with mask: DD/MM/YYYY)
            const year = scheduleDateTokens[2] * 1;
            const month = scheduleDateTokens[1] * 1 - 1;
            const date = scheduleDateTokens[0] * 1;

            // Hours, minutes section (with mask: hh:mm)
            const hours = scheduleTimeTokens[0] * 1;
            const minutes = scheduleTimeTokens[1] * 1;

            const scheduleDateTime = new Date(
                year,
                month,
                date,
                hours,
                minutes,
                0,
                0
            );

            return scheduleDateTime;
        },
        emitUpdateModel() {
            const scheduleDateTime = this.getScheduleDateTime();
            const isScheduled = this.publishOption == publishOptions.scheduled;

            const modelValue = new ScheduleOptionDetail(
                isScheduled,
                this.scheduleDate,
                scheduleDateTime
            );

            this.$emit("update:modelValue", modelValue);
        },
    },
    watch: {
        publishOption() {
            this.emitUpdateModel();
        },
        scheduleDate() {
            this.emitUpdateModel();
        },
        scheduleTime() {
            this.emitUpdateModel();
        },
    },
};
</script>

<style scoped>
.schedule-detail *:hover {
    cursor: pointer;
}
</style>
