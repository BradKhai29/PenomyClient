const accentRegExp =
    /([aáàạảãâấậẩẫầăắặẳẵằ])|([AÁÀẠẢÃÂẤẬẨẪẦĂẮẶẲẴẰ])|([eéẹẻẽèêếệểễề])|([EÉẸẺẼÈÊẾỆỂỄỀ])|([iíịỉĩì])|([IÍỊỈĨÌ])|([uúụủũùưứửữừự])|(UÚỤỦŨÙƯỨỬỮỪỰ)|([oóọỏõòôốộổỗồơớợởỡờ])|([OÓỌỎÕÒÔỐỘỔỖỒƠỚỢỞỠỜ])|([yýỳỹỷỵ])|([YÝỲỸỶỴ])|([đ])|([Đ])/g;

function accentReplacer(inputString, a, A, e, E, i, I, u, U, o, O, y, Y, d, D) {
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
};

export { StringHelper };
