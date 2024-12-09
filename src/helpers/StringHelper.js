const accentRegExp =
    /([aáàạảãâấậẩẫầăắặẳẵằ])|([AÁÀẠẢÃÂẤẬẨẪẦĂẮẶẲẴẰ])|([eéẹẻẽèêếệểễề])|([EÉẸẺẼÈÊẾỆỂỄỀ])|([iíịỉĩì])|([IÍỊỈĨÌ])|([uúụủũùưứửữừự])|(UÚỤỦŨÙƯỨỬỮỪỰ)|([oóọỏõòôốộổỗồơớợởỡờ])|([OÓỌỎÕÒÔỐỘỔỖỒƠỚỢỞỠỜ])|([yýỳỹỷỵ])|([YÝỲỸỶỴ])|([đ])|([Đ])/g;

function accentReplacer(_, a, A, e, E, i, I, u, U, o, O, y, Y, d, D) {
    if (a) return "a";
    if (A) return "A";
    if (e) return "e";
    if (E) return "E";
    if (i) return "i";
    if (I) return "I";
    if (o) return "o";
    if (O) return "O";
    if (u) return "u";
    if (U) return "U";
    if (y) return "y";
    if (Y) return "Y";
    if (d) return "d";
    if (D) return "D";
}

const emptyString = "";
const CHARACTERS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * Generates a random string of a specified length (with cryptographic security).
 *
 * @param {Number} length The length of the random string.
 * @returns
 */
function generateSecureRandomString(length) {
    const charactersLength = CHARACTERS.length;
    let result = "";
    const randomValues = new Uint32Array(length);

    // Generate cryptographically secure random values
    crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
        result += CHARACTERS.charAt(randomValues[i] % charactersLength);
    }

    return result;
}

/**
 * Check if the input string value is null or empty or contains only white space.
 * @param {string} value The string value to check.
 */
function isNullOrEmpty(value) {
    if (value == emptyString) {
        return true;
    }

    if (String(value).trim().length == 0) {
        return true;
    }

    return false;
}

const StringHelper = {
    /**
     * Replace all the accent characters found in the input stringValue
     * with its non-accent characters.
     * @example Input (Đây là đầu vào) => Output (Day la dau vao).
     * @param {String} stringValue The string to replace the accent characters.
     */
    replaceAccentChar(stringValue) {
        return stringValue.replace(accentRegExp, accentReplacer);
    },
    emptyString() {
        return emptyString;
    },
    generateSecureRandomString: generateSecureRandomString,
    isNullOrEmpty,
};

export { StringHelper };
