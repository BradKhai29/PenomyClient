import { domainRootPath } from "../common/DomainRootPath";

// The route definition of artwork-1 page.
// The definition must be declared as an array of route-objects.
const routeDefinition = [
    {
        path: domainRootPath.userProfile,
        component: () => import("layouts/MainLayout.vue"),
        children: [
            {
                path: "user",
                component: () =>
                    import("pages/userProfile/UserProfile1Page.vue"),
            },
            {
                path: "/author/:authorId",
                component: () => import("pages/artwork/Artwork1Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
