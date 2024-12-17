import { domainRootPath } from "../common/DomainRootPath";

const routeDefinition = [
    {
        path: domainRootPath.socialMedia,
        component: () => import("src/layouts/SocialLayout.vue"),
        children: [
            {
                path: "friends",
                component: () => import("src/pages/friend/Friend1Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
