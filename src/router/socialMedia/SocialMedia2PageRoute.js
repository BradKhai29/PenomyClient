import { domainRootPath } from "../common/DomainRootPath";
// The route definition of artwork-1 page.
// The definition must be declared as an array of route-objects.
const routeDefinition = [
    {
        path: domainRootPath.socialMedia,
        component: () => import("src/layouts/OverlaySocialLayout.vue"),
        children: [
            {
                path: "group/create",
                component: () =>
                    import("pages/socialMedia/SocialMedia2Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
