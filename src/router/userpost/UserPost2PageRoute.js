import { domainRootPath } from "../common/DomainRootPath";

const routeDefinition = [
    {
        path: domainRootPath.userPost,
        component: () => import("src/layouts/SocialLayout.vue"),
        children: [
            {
                path: "posts/view",
                component: () => import("src/pages/userPost/UserPost2Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
