import { domainRootPath } from "../common/DomainRootPath";

const CreatorProfile1RouteNames = {
    profileDetail: "creator-profile-detail",
};

const routeDefinition = [
    {
        path: domainRootPath.creatorProfile,
        component: () => import("layouts/MainLayout.vue"),
        children: [
            {
                name: CreatorProfile1RouteNames.profileDetail,
                path: ":creatorId",
                component: () =>
                    import("pages/creatorProfile/CreatorProfile1Page.vue"),
            },
        ],
    },
];

export { CreatorProfile1RouteNames };
export default routeDefinition;
