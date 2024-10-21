const mailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Validates an email address format.
 *
 * This function checks whether the given email string follows a valid email format
 * using a regular expression. It checks the local part (before the "@"), the domain part
 * (after the "@"), and ensures that the domain ends with a valid top-level domain.
 *
 * @param {String} email - The email address to be validated.
 * @returns {Boolean} Returns true if the email is in a valid format, false otherwise.
 */
function validateEmail(email) {
    if (!email) {
        return false;
    }

    return email.match(mailRegExp);
}

/**
 * Checks if a string contains any numeric characters.
 *
 * This function takes a string as input and returns true if the string contains
 * any numeric characters (digits 0-9), and false otherwise. It uses a regular
 * expression to check for the presence of numbers.
 *
 * @param {string} input - The string to be checked for numeric characters.
 * @returns {boolean} - Returns true if the input contains numeric characters, false otherwise.
 */
function containsNumber(input) {
    // Regular expression pattern to match any numeric digit (0-9)
    const hasNumber = /[0-9]/;

    // Test the input string against the regular expression
    return hasNumber.test(input);
}

/**
 * Checks if a string contains both uppercase and lowercase letters.
 *
 * This function takes a string as input and returns true if the string contains
 * at least one uppercase letter (A-Z) and at least one lowercase letter (a-z).
 * It uses two regular expressions to check for the presence of both cases.
 *
 * @param {string} input - The string to be checked for uppercase and lowercase letters.
 * @returns {boolean} - Returns true if the input contains both uppercase and lowercase letters, false otherwise.
 */
function containsUpperAndLower(input) {
    // Regular expression pattern to match at least one uppercase letter (A-Z)
    const hasUppercase = /[A-Z]/;

    // Regular expression pattern to match at least one lowercase letter (a-z)
    const hasLowercase = /[a-z]/;

    // Check if the input contains both uppercase and lowercase letters
    return hasUppercase.test(input) && hasLowercase.test(input);
}

const InputHelper = {
    validateEmail: validateEmail,
    containsNumber: containsNumber,
    containsUpperAndLower: containsUpperAndLower,
};

export { InputHelper };
