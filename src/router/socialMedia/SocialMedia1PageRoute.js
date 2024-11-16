import { domainRootPath } from "../common/DomainRootPath";
// The route definition of artwork-1 page.
// The definition must be declared as an array of route-objects.
const routeDefinition = [
    {
        path: domainRootPath.socialMedia,
        component: () => import("src/layouts/SocialLayout.vue"),
        children: [
            {
                path: "feeds",
                component: () =>
                    import("pages/socialMedia/SocialMedia1Page.vue"),
            },
        ],
    },

    {
        path: domainRootPath.socialMedia,
        component: () => import("src/layouts/OverlaySocialLayout.vue"),
        children: [
            {
                path: "groups",
                component: () =>
                    import("pages/socialMedia/SocialMedia1Page.vue"),
            },
            {
                path: "groups/create",
                component: () =>
                    import("pages/socialMedia/SocialMedia2Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
