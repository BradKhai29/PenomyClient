import { domainRootPath } from "../common/DomainRootPath";

const routeDefinition = [
    {
        path: domainRootPath.auth,
        component: () => import("layouts/AuthLayout.vue"),
        children: [
            {
                path: "forgot-password",
                component: () => import("src/pages/auth/Auth4Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
