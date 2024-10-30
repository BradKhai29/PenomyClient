import artwork1PageRoute from "./artwork/Artwork1PageRoute";
import auth1PageRoute from "./auth/Auth1PageRoute";
import auth2PageRoute from "./auth/Auth2PageRoute";
import auth3PageRoute from "./auth/Auth3PageRoute";
import auth4PageRoute from "./auth/Auth4PageRoute";
import auth5PageRoute from "./auth/Auth5PageRoute";
import creatorStudio1PageRoute from "./creatorStudio/CreatorStudio1PageRoute";
import creatorStudio2PageRoute from "./creatorStudio/CreatorStudio2PageRoute";
import creatorStudio3PageRoute from "./creatorStudio/CreatorStudio3PageRoute";
import creatorStudio4PageRoute from "./creatorStudio/CreatorStudio4PageRoute";
import creatorStudio5PageRoute from "./creatorStudio/CreatorStudio5PageRoute";
import creatorStudio6PageRoute from "./creatorStudio/CreatorStudio6PageRoute";
import creatorStudio7PageRoute from "./creatorStudio/CreatorStudio7PageRoute";
import creatorStudio8PageRoute from "./creatorStudio/CreatorStudio8PageRoute";
import creatorStudio9PageRoute from "./creatorStudio/CreatorStudio9PageRoute";
import creatorStudio10PageRoute from "./creatorStudio/CreatorStudio10PageRoute";
import creatorStudio11PageRoute from "./creatorStudio/CreatorStudio11PageRoute";
import creatorStudio12PageRoute from "./creatorStudio/CreatorStudio12PageRoute";
import creatorStudio22PageRoute from "./creatorStudio/CreatorStudio22PageRoute";
import creatorStudio25PageRoute from "./creatorStudio/CreatorStudio25PageRoute";
import artwork3PageRoute from "./artwork/Artwork3PageRoute";

// Always leave this as last one, but you can also remove it
const errorNotFoundPageRoute = {
    path: "/:catchAll(.*)*",
    component: () => import("src/pages/ErrorNotFoundPage.vue"),
};

const routes = [
    ...artwork1PageRoute,
    ...artwork3PageRoute,
    // Continue to add more page routes here.
    ...auth1PageRoute,
    ...auth2PageRoute,
    ...auth3PageRoute,
    ...auth4PageRoute,
    ...auth5PageRoute,
    ...creatorStudio1PageRoute,
    ...creatorStudio2PageRoute,
    ...creatorStudio3PageRoute,
    ...creatorStudio4PageRoute,
    ...creatorStudio5PageRoute,
    ...creatorStudio6PageRoute,
    ...creatorStudio7PageRoute,
    ...creatorStudio8PageRoute,
    ...creatorStudio9PageRoute,
    ...creatorStudio10PageRoute,
    ...creatorStudio11PageRoute,
    ...creatorStudio12PageRoute,
    ...creatorStudio22PageRoute,
    ...creatorStudio25PageRoute,
    errorNotFoundPageRoute,
];

export default routes;
