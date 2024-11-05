import { domainRootPath } from "../common/DomainRootPath";

const routeDefinition = [
    {
        path: domainRootPath.artwork,
        component: () => import("layouts/OverlayMainLayout.vue"),
        children: [
            {
                path: "comic/:comicId/chapter/:chapterId",
                component: () => import("pages/artwork/Artwork5Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
