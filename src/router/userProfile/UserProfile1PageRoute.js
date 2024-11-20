import { domainRootPath } from "../common/DomainRootPath";

// The route definition of artwork-1 page.
// The definition must be declared as an array of route-objects.
const routeDefinition = [
    {
        path: domainRootPath.userProfile,
        component: () => import("layouts/MainLayout.vue"),
        children: [
            {
                path: ":userId",
                component: () =>
                    import("pages/userProfile/UserProfile1Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
