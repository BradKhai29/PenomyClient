import { domainRootPath } from "../common/DomainRootPath";
const routeDefinition = [
    {
        path: domainRootPath.artwork,
        component: () => import("layouts/OverlayMainLayout.vue"),
        children: [
            {
                path: "comic/:artworkId",
                component: () => import("pages/artwork/Artwork3Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
