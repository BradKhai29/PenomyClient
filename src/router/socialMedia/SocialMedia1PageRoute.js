import { domainRootPath } from "../common/DomainRootPath";

const routeDefinition = [
    {
        path: domainRootPath.socialMedia,
        component: () => import("src/layouts/SocialLayout.vue"),
        children: [
            {
                path: "",
                component: () => import("src/pages/userPost/UserPost2Page.vue"),
            },
            {
                path: "feeds",
                component: () =>
                    import("pages/socialMedia/SocialMedia1Page.vue"),
            },
        ],
    },

    {
        path: domainRootPath.socialMedia,
        component: () => import("src/layouts/SocialLayout.vue"),
        children: [
            {
                path: "/social/groups/joined",
                component: () =>
                    import("pages/socialMedia/SocialMedia1Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
