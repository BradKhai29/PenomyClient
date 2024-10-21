// This google helper implements the token-model flow (based on the recommedation from Google document)
// Link: https://developers.google.com/identity/oauth2/web/guides/use-token-model
// For more detail about the implicit grant-flow, you can reference from following link.
// Link: https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow

// Configuration section.
const CLIENT_LIBRARY_URL = "https://accounts.google.com/gsi/client";
const SCOPES = "email profile openid";
const CLIENT_LIBRARY_ID = "gsi_client";
const CLIENT_ID =
    "370050022584-puv98rb6n4mmodqg1ftv0k1ho4es5js1.apps.googleusercontent.com";

/**
 * Represent the data contains from the response of google consent.
 * @note This class is only used for marker purpose.
 */
class GoogleConsentResponse {
    constructor(
        state,
        access_token,
        authuser,
        expires_in,
        prompt,
        scope,
        token_type
    ) {
        this.state = state;
        this.access_token = access_token;
        this.authuser = authuser;
        this.expires_in = expires_in;
        this.prompt = prompt;
        this.scope = scope;
        this.token_type = token_type;
    }
}

const clientLibraryState = {
    loadSuccess: false,
    google: null,
};

/**
 * Loading the Google client library for processing google auth.
 *
 * @param {Callback} loadSuccessCallback The callback that will be invoked when the
 * client library script is loading success.
 */
function loadClientLibrary(loadSuccessCallback) {
    // Check if the client library is load success.
    if (clientLibraryState.loadSuccess) {
        loadSuccessCallback();

        return;
    }

    // Create a script tag to inject the google client library.
    const script = document.createElement("script");

    // Init the script's attributes.
    script.id = CLIENT_LIBRARY_ID;
    script.src = CLIENT_LIBRARY_URL;
    script.defer = true;
    script.async = true;

    // Add load event listener to script.
    script.addEventListener("load", () => {
        clientLibraryState.loadSuccess = true;

        if (loadSuccessCallback) {
            loadSuccessCallback();

            clientLibraryState.google = window.google;
            console.log(clientLibraryState.google);
        }
    });

    // Add script to document head.
    document.head.appendChild(script);
}

function loginWithGoogle(securityState, resolveCallback) {
    const tokenClient =
        clientLibraryState.google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            state: securityState,
            callback: resolveCallback,
        });

    tokenClient.requestAccessToken();
}

const GoogleHelper = {
    loadClientLibrary: loadClientLibrary,
    loginWithGoogle: loginWithGoogle,
};

export { CLIENT_ID, SCOPES, GoogleHelper, GoogleConsentResponse };
