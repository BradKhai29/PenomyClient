import { domainRootPath } from "../common/DomainRootPath";

const routeDefinition = [
    {
        path: domainRootPath.userPost,
        component: () => import("src/layouts/SocialLayout.vue"),
        children: [
            {
                path: "posts/createform",
                component: () => import("src/pages/userPost/UserPost1Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
