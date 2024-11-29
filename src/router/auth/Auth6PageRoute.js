import { domainRootPath } from "../common/DomainRootPath";

const routeDefinition = [
    {
        path: domainRootPath.auth,
        component: () => import("layouts/AuthLayout.vue"),
        children: [
            {
                path: "google",
                component: () => import("src/pages/auth/Auth6Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
