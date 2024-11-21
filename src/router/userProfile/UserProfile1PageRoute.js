import { domainRootPath } from "../common/DomainRootPath";

const UserProfile1RouteNames = {
    profileDetail: "user-profile-detail",
};

const routeDefinition = [
    {
        path: domainRootPath.userProfile,
        component: () => import("layouts/MainLayout.vue"),
        children: [
            {
                name: UserProfile1RouteNames.profileDetail,
                path: ":userId",
                component: () =>
                    import("pages/userProfile/UserProfile1Page.vue"),
            },
        ],
    },
];

export { UserProfile1RouteNames };
export default routeDefinition;
