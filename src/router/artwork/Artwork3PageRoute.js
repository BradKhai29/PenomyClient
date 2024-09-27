import { domainRootPath } from "../common/DomainRootPath";
const routeDefinition = [
    {
        path: `${domainRootPath.artwork}/:id`,
        component: () => import("layouts/MainLayout.vue"),
        children: [
            {
                path: "",
                component: () => import("pages/artwork/Artwork3Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
