import { domainRootPath } from "../common/DomainRootPath";
// The route definition of artwork-1 page.
// The definition must be declared as an array of route-objects.
const routeDefinition = [
    {
        path: domainRootPath.socialMedia,
        component: () => import("src/layouts/SocialLayout.vue"),
        children: [
            {
                path: "group/:id",
                component: () =>
                    import("pages/socialMedia/SocialMedia3Page.vue"),
            },
            {
                path: "group/:id/manage",
                component: () =>
                    import("pages/socialMedia/SocialMedia3Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
