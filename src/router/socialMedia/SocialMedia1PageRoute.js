import { domainRootPath } from "../common/DomainRootPath";

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
        ],
    },
];

export default routeDefinition;
