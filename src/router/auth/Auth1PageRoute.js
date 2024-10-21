import { domainRootPath } from "../common/DomainRootPath";

const routeDefinition = [
    {
        path: domainRootPath.auth,
        component: () => import("layouts/AuthLayout.vue"),
        children: [
            {
                path: "login",
                component: () => import("src/pages/auth/Auth1Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
