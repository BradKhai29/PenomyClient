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

const NumberHelper = {
    isNumber: isNumber,
    getSecureRandomNumber: getSecureRandomNumber,
    formatNumberShort: formatNumberShort,
};

export { NumberHelper };
