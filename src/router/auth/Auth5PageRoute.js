import { domainRootPath } from "../common/DomainRootPath";

const routeDefinition = [
    {
        path: domainRootPath.auth,
        component: () => import("layouts/AuthLayout.vue"),
        children: [
            {
                path: "reset-password",
                component: () => import("src/pages/auth/Auth5Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
