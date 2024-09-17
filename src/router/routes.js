import artwork1PageRoute from "./artwork/Artwork1PageRoute";
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
    errorNotFoundPageRoute,
];

export default routes;
