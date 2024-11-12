import { domainRootPath } from "../common/DomainRootPath";
const routeDefinition = [
    {
        path: domainRootPath.artwork,
        component: () => import("layouts/OverlayMainLayout.vue"),
        children: [
            {
                path: "comic2/:artworkId",
                component: () => import("pages/artwork/Artwork3Page.vue"),
            },
            {
                path: "comic/:artworkId",
                component: () => import("src/pages/artwork/Artwork3PageV2.vue"),
            },
        ],
    },
];

export default routeDefinition;
