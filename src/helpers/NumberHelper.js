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

const NumberHelper = {
    isNumber: isNumber,
};

export { NumberHelper };
