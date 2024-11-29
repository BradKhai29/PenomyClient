// Configuration section.
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
const GOOGLE_LOGIN_API = `${BaseWebApiUrl}/g32/signin-google`;

function signInWithGoogle() {
    window.location.replace(GOOGLE_LOGIN_API);
}

const GoogleHelper = {
    signInWithGoogle: signInWithGoogle,
};

export { GoogleHelper };
