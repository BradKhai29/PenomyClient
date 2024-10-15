function currentDateTimeString() {
    const currentDateTime = new Date();

    const currentDateTimeString = `${currentDateTime.getUTCFullYear()}${currentDateTime.getUTCMonth()}${currentDateTime.getUTCDate()}${currentDateTime.getUTCHours()}${currentDateTime.getUTCMinutes()}${currentDateTime.getUTCSeconds()}${currentDateTime.getUTCMilliseconds()}`;

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
}

/**
 * Formats an ISO-8601 datetime string to specified output format.
 *
 * @param {String} isoDateStr - The ISO 8601 datetime string (Ex: '2024-10-11T08:25:49.041481Z').
 * @param {String} outputFormat - The output format (Ex: 'dd/mm/yyyy hh:mm:ss').
 * @returns {String} - The formatted date string after formating.
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

const DateTimeHelper = {
    currentDateTimeString: currentDateTimeString,
    formatISODate: formatISODate,
};

export { DateTimeHelper };
