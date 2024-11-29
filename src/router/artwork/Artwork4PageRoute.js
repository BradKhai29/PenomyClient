import { domainRootPath } from "../common/DomainRootPath";

const routeDefinition = [
    {
        path: domainRootPath.artwork,
        component: () => import("layouts/OverlayMainLayout.vue"),
        children: [
            {
                path: "anime/:artworkId",
                component: () => import("src/pages/artwork/Artwork4Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
