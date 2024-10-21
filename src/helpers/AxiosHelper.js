import { AxiosError } from "axios";

/**
 * Try to return the input error object as a AxiosError
 * to leverage the auto-completion of the vscode.
 * @param {AxiosError} error.
 * @returns {AxiosError} The axios error.
 */
function toAxiosError(error) {
    return error;
}

const AxiosHelper = {
    toAxiosError: toAxiosError,
};

export { AxiosHelper };
