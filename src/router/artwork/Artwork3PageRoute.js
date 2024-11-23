import { domainRootPath } from "../common/DomainRootPath";

const routeDefinition = [
    {
        path: domainRootPath.artwork,
        component: () => import("layouts/OverlayMainLayout.vue"),
        children: [
            {
                path: "comic/:artworkId",
                component: () => import("src/pages/artwork/Artwork3PageV2.vue"),
            },
        ],
    },
];

export default routeDefinition;
