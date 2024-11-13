class ApiResponse {
    /**
     * @param {Boolean} isSuccess Return true if the api response is succes.
     * @param {*} responseBody The body of the api response.
     */
    constructor(isSuccess, responseBody) {
        this.isSuccess = isSuccess;
        this.responseBody = responseBody;
    }

    /**
     * A short hand to create an success instance of ApiResponse class.
     *
     * @param {*} responseBody The belonged response body of this instance.
     * @returns {ApiResponse} A success instance of ApiResponse class with provided response body.
     */
    static success(responseBody) {
        return new ApiResponse(true, responseBody);
    }

    /**
     * A short hand to create an failed instance of ApiResponse class.
     *
     * @returns {ApiResponse} A failed instance of ApiResponse class.
     */
    static failed() {
        return new ApiResponse(false);
    }
}

export { ApiResponse };
