/**
 * Check if the input number is actually a number or not.
 *
 * @param {*} number The input number to check.
 * @returns {Boolean} The result after checking.
 */
function isNumber(number) {
    number = number * 1;

    if (typeof number === "number" || typeof number === "bigint") {
        return number - number === 0;
    }

    if (typeof number === "string" && number.trim() !== "") {
        return Number.isFinite(number);
    }

    return false;
}
/**
 * Generates a cryptographically secure random number within a specified range [min, max].
 * This function uses the Web Crypto API's `crypto.getRandomValues` method for secure random number generation.
 *
 * @param {number} min - The lower bound (inclusive) of the desired range.
 * @param {number} max - The upper bound (inclusive) of the desired range.
 * @returns {number} A random number between min (inclusive) and max (inclusive).
 */
function getSecureRandomNumber(min, max) {
    const range = max - min + 1;
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);

    // Scale the random number to the desired range
    const randomNumber = randomBuffer[0] / (0xffffffff + 1); // 0xFFFFFFFF is the max value of Uint32Array
    return Math.floor(randomNumber * range) + min;
}

/**
 * Converts a number into a short string representation with optional precision.
 * Examples: 1000 becomes "1K", 10000 becomes "10K", 2300000 becomes "2.3M".
 *
 * @param {number} num - The number to format.
 * @param {number} [precision=1] - Optional precision for the decimal places. Default is 1.
 * @returns {string} - The formatted short version of the number (e.g., "1K", "2.3M").
 */
function formatNumberShort(num, precision = 1) {
    const zeroAfterFloatingPointRegExp = /\.0+$/;

    // If the number is greater than or equal to 1 billion, format as billions ("B")
    if (num >= 1e9) {
        return (
            (num / 1e9)
                .toFixed(precision)
                .replace(zeroAfterFloatingPointRegExp, "") + "B"
        );
    }
    // If the number is greater than or equal to 1 million, format as millions ("M")
    else if (num >= 1e6) {
        return (
            (num / 1e6)
                .toFixed(precision)
                .replace(zeroAfterFloatingPointRegExp, "") + "M"
        );
    }
    // If the number is greater than or equal to 1 thousand, format as thousands ("K")
    else if (num >= 1e3) {
        return (
            (num / 1e3)
                .toFixed(precision)
                .replace(zeroAfterFloatingPointRegExp, "") + "K"
        );
    }
    // If the number is less than 1000, return the number as is (no formatting)
    else {
        return num.toString();
    }
}

/**
 * Formats a number with periods (Example: 10000000 => 10.000.000)
 *
 * @param {number} number - The number to be formatted.
 * @returns {string} The formatted number as a string with periods.
 */
function formatNumberWithPeriods(number) {
    // Convert the number to a string
    const numberString = number.toString();
    const addPeriodRegExp = /\B(?=(\d{3})+(?!\d))/g;

    // Use regex to insert a period every three digits from the end of the string
    // \B asserts a position that is not a word boundary
    // (?=(\d{3})+(?!\d)) matches positions where groups of three digits are followed by more digits
    return numberString.replace(addPeriodRegExp, ".");
}

/**
 * Returns a number whose value is limited to the given range.
 *
 * @param {Number} min The lower boundary
 * @param {Number} value The initial value
 * @param {Number} max The upper boundary
 * @returns {Number} A number in the range (min, max)
 */
function clamp(min, value, max) {
    return Math.min(Math.max(value, min), max);
}

const NumberHelper = {
    isNumber: isNumber,
    getSecureRandomNumber: getSecureRandomNumber,
    formatNumberShort: formatNumberShort,
    formatNumberWithPeriods: formatNumberWithPeriods,
    clamp: clamp,
};

export { NumberHelper };
