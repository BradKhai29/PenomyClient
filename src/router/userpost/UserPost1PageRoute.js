import { domainRootPath } from "../common/DomainRootPath";

const routeDefinition = [
    {
        path: "/post",
        component: () => import("src/layouts/SocialLayout.vue"),
        children: [
            {
                path: "posts/createform",
                component: () => import("pages/userPost/UserPostForm.vue"),
            },
        ],
    },
];

export default routeDefinition;
