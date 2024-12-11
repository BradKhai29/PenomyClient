import { domainRootPath } from "../common/DomainRootPath";

// The route definition of artwork-8 (search result) page.
// The definition must be declared as an array of route-objects.
const routeDefinition = [
    {
        path: domainRootPath.artwork,
        component: () => import("layouts/MainLayout.vue"),
        children: [
            {
                path: "search",
                component: () => import("pages/artwork/Artwork8Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
