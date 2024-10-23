import { domainRootPath } from "../common/DomainRootPath";

const routeDefinition = [
    {
        path: domainRootPath.auth,
        component: () => import("layouts/AuthLayout.vue"),
        children: [
            {
                path: "register",
                component: () => import("src/pages/auth/Auth2Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
