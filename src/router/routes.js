import artwork1PageRoute from "./artwork/Artwork1PageRoute";
import auth1PageRoute from "./auth/Auth1PageRoute";
import creatorStudio1PageRoute from "./creatorStudio/CreatorStudio1PageRoute";
import creatorStudio2PageRoute from "./creatorStudio/CreatorStudio2PageRoute";
import creatorStudio3PageRoute from "./creatorStudio/CreatorStudio3PageRoute";
import creatorStudio4PageRoute from "./creatorStudio/CreatorStudio4PageRoute";
import creatorStudio5PageRoute from "./creatorStudio/CreatorStudio5PageRoute";
import creatorStudio6PageRoute from "./creatorStudio/CreatorStudio6PageRoute";
import creatorStudio8PageRoute from "./creatorStudio/CreatorStudio8PageRoute";
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
    ...creatorStudio1PageRoute,
    ...creatorStudio2PageRoute,
    ...creatorStudio3PageRoute,
    ...creatorStudio4PageRoute,
    ...creatorStudio5PageRoute,
    ...creatorStudio6PageRoute,
    ...creatorStudio8PageRoute,
    ...creatorStudio12PageRoute,
    ...creatorStudio22PageRoute,
    ...creatorStudio25PageRoute,
    errorNotFoundPageRoute,
];

export default routes;
