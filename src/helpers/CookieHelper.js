class Cookie {
    /**
     * @param {boolean} isExisted Check if the Cookie is existed or not.
     * @param {String} key The key of this cookie.
     * @param {String} value The value of this cookie.
     */
    constructor(isExisted, key, value) {
        this.isExisted = isExisted;
        this.key = key;
        this.value = value;
    }
}

class CookieHelper {
    static getAllCookies() {
        const cookieList = [];
        const separator = "=";

        if (document.cookie) {
            const cookies = document.cookie.split(";");

            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i];

                const keyValuePair = cookie.split(separator);

                let cookieItem = new Cookie(
                    true,
                    keyValuePair[0],
                    keyValuePair[1]
                );

                cookieList.push(cookieItem);
            }
        }

        return cookieList;
    }

    /**
     * Get the cookie from this page by the input name
     * @param {String} cookieName The name of the cookie.
     * @returns {Cookie} instance contains information of the target cookie.
     */
    static getCookie(cookieName) {
        const key = `${cookieName}=`;
        let value = "";
        const notFoundIndex = -1;

        if (document.cookie) {
            const cookies = document.cookie.split(";");

            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();

                if (cookie.indexOf(key) != notFoundIndex) {
                    value = cookie.substring(key.length);

                    return new Cookie(true, cookieName, value);
                }
            }
        }

        return new Cookie(false);
    }

    /**
     * Set the cookie by the provided name & value.
     * The expiration of this cookie is specified by the input live days.
     *
     * @param {String} cookieName Name of the cookie.
     * @param {String} cookieValue Value of the cookie.
     * @param {Number} liveDays Total days this cookie can live.
     */
    static setCookie(cookieName, cookieValue, liveDays) {
        const dateTimeNow = new Date();

        dateTimeNow.setTime(
            dateTimeNow.getTime() + liveDays * 24 * 60 * 60 * 1000
        );
        let expires = "expires=" + dateTimeNow.toUTCString();

        const cookie = `${cookieName}=${cookieValue};expires=${expires};path=/;SameSite=Strict`;
        document.cookie = cookie;
    }

    /**
     * Remove the cookie with the provided name.
     *
     * @param {String} cookieName Name of the cookie to remove.
     */
    static removeCookie(cookieName) {
        const minDate = "Thu, 01 Jan 1970 00:00:00 UTC";
        const cookie = `${cookieName}=;expires=${minDate};path=/;`;
        document.cookie = cookie;
    }
}

export { Cookie, CookieHelper };
