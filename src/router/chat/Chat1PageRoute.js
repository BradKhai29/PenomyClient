import { domainRootPath } from "../common/DomainRootPath";

const routeDefinition = [
    {
        path: domainRootPath.chat,
        component: () => import("src/layouts/OverlaySocialLayout.vue"),
        children: [
            {
                path: "",
                component: () => import("src/pages/chat/Chat1Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
