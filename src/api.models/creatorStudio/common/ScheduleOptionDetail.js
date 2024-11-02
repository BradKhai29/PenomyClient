class ScheduleOptionDetail {
    /**
     * @param {Boolean} isScheduled If true, then the artwork will be publised at specified scheduleDateTime.
     * @param {Date} scheduleDate The date object that contains information of scheduled datetime.
     * @param {String} scheduleDateTime The string that represent the value of scheduled datetime.
     */
    constructor(isScheduled, scheduleDate, scheduleDateTime) {
        this.isScheduled = isScheduled;
        this.scheduleDate = scheduleDate;
        this.scheduleDateTime = scheduleDateTime;
    }

    static new() {
        return new ScheduleOptionDetail(false, new Date(), null);
    }
}

export { ScheduleOptionDetail };
