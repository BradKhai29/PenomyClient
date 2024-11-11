import { domainRootPath } from "../common/DomainRootPath";

// The route definition of artwork-1 page.
// The definition must be declared as an array of route-objects.
const routeDefinition = [
    {
        path: domainRootPath.creatorProfile,
        component: () => import("layouts/MainLayout.vue"),
        children: [
            {
                path: "d/:creatorId",
                component: () =>
                    import("pages/creatorProfile/CreatorProfile1Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
