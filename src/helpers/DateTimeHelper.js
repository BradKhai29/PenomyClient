const DEFAULT_DATETIME_STRING_OUTPUT_FORMAT = "yyyymmddhhmmss";
const YYYY_MM_DD_FORMAT = "yyyy/mm/dd";
const DD_MM_YYYY_FORMAT = "dd/mm/yyyy";

/**
 * Get the formatted string of the input datetime with specified out format.
 *
 * @param {string} [format="yyyymmddhhmmss"] The format to output for the DateTimeString. (Default: yyyymmddhhmmss)
 * @returns The formatted string of the input datetime.
 */
function getFormatDateTimeString(
    datetime,
    format = DEFAULT_DATETIME_STRING_OUTPUT_FORMAT
) {
    const currentDateTime = datetime;

    let currentDateTimeString = null;
    const year = currentDateTime.getFullYear();
    const month = currentDateTime.getMonth() + 1;
    const day = currentDateTime.getDate();

    if (format == DEFAULT_DATETIME_STRING_OUTPUT_FORMAT) {
        const hours = currentDateTime.getHours();
        const minutes = currentDateTime.getMinutes();
        const seconds = currentDateTime.getSeconds();
        const milliseconds = currentDateTime.getMilliseconds();

        currentDateTimeString = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
    } else if (format == YYYY_MM_DD_FORMAT) {
        currentDateTimeString = `${year}/${month}/${day}`;
    } else if (format == DD_MM_YYYY_FORMAT) {
        currentDateTimeString = `${day}/${month}/${year}`;
    }

    return currentDateTimeString;
}

function getFormatISODateString(
    outputFormat,
    day,
    month,
    year,
    hours,
    minutes
) {
    if (!outputFormat) {
        // Format to "dd/mm/yyyy hh:mm" as default options.
        return `${day}/${month}/${year} - ${hours}:${minutes}`;
    }

    if (outputFormat == DD_MM_YYYY_FORMAT) {
        // Format to "dd/mm/yyyy".
        return `${day}/${month}/${year}`;
    }
}

/**
 * Get the ISO formatted date string of the input parameters.
 *
 * @param {Date} inputDateTime The datetime to converted to ISO format.
 *
 * @returns {String} The ISO formatted string of the input parameters. (Ex: '2024-10-11T08:25:49.041481Z')
 */
function toISODateString(inputDateTime) {
    let year, month, date, hours, minutes, seconds, milliseconds;

    year = inputDateTime.getFullYear();
    month = inputDateTime.getMonth() + 1;
    date = inputDateTime.getDate();
    hours = String(inputDateTime.getHours()).padStart(2, "0");
    minutes = String(inputDateTime.getMinutes()).padStart(2, "0");
    seconds = String(inputDateTime.getSeconds()).padStart(2, "0");
    milliseconds = inputDateTime.getMilliseconds();

    const isoDateString = `${year}-${month}-${date}T${hours}:${minutes}:${seconds}.${milliseconds}`;
    return isoDateString;
}

/**
 * Formats an ISO-8601 datetime string to specified output format.
 *
 * @param {String} isoDateStr - The ISO 8601 datetime string (Ex: '2024-10-11T08:25:49.041481Z').
 * @param {String} outputFormat - The output format (Ex: 'dd/mm/yyyy hh:mm:ss').
 * @returns {String} The formatted date string after formating.
 */
function formatISODate(isoDateStr, outputFormat) {
    const date = new Date(isoDateStr);

    // Extract date components
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");

    return getFormatISODateString(
        outputFormat,
        day,
        month,
        year,
        hours,
        minutes
    );
}

class TimeZoneDetail {
    constructor(timeZone, countryName) {
        this.timeZone = timeZone;
        this.countryName = countryName;
        this.standardTimeZone = `${countryName} (${timeZone})`;
    }
}

const timezoneDictionary = {
    "Asia/Saigon": new TimeZoneDetail("Asia/Ho_Chi_Minh", "Vietnam"),
    "Asia/Ho_Chi_Minh": new TimeZoneDetail("Asia/Ho_Chi_Minh", "Vietnam"),
};

/**
 * Get the client timezone and return the string that present that timezone (Ex: Asia/Ho_Chi_Minh UTC +07:00)
 *
 * @reference https://stackoverflow.com/questions/1091372/getting-the-clients-time-zone-and-offset-in-javascript
 * @returns {String} The string that represented the client's timezone.
 */
function getClientTimeZone() {
    const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    let timeZoneString =
        timezoneDictionary[clientTimeZone].standardTimeZone ?? clientTimeZone;

    const UTC_PREFIX = "UTC";
    const AN_HOUR = 60;

    // If the offset is smaller than 0, client timezone is ahead of UTC, vice versa.
    const clientOffset = new Date().getTimezoneOffset();
    const utcOffset = String(-clientOffset / AN_HOUR).padStart(2, "0");

    if (utcOffset > 0) {
        timeZoneString += ` ${UTC_PREFIX}+${utcOffset}:00`;
    } else {
        timeZoneString += ` ${UTC_PREFIX}+${utcOffset}:00`;
    }

    return timeZoneString;
}

function getClientLocale() {
    return Intl.DateTimeFormat().resolvedOptions().locale;
}

const DateTimeHelper = {
    getFormatDateTimeString: getFormatDateTimeString,
    formatISODate: formatISODate,
    toISODate: toISODateString,
    getClientTimeZone: getClientTimeZone,
    DEFAULT_DATETIME_STRING_OUTPUT_FORMAT:
        DEFAULT_DATETIME_STRING_OUTPUT_FORMAT,
    YYYY_MM_DD_FORMAT: YYYY_MM_DD_FORMAT,
    DD_MM_YYYY_FORMAT: DD_MM_YYYY_FORMAT,
};

export { DateTimeHelper };
