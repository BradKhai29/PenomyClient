import { domainRootPath } from "../common/DomainRootPath";

const routeDefinition = [
    {
        path: domainRootPath.auth,
        component: () => import("layouts/AuthLayout.vue"),
        children: [
            {
                path: "confirm-register",
                component: () => import("src/pages/auth/Auth3Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
