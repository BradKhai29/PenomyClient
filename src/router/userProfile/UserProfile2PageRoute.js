import { domainRootPath } from "../common/DomainRootPath";

const EditProfileRouteName = "user-profile-edit";

const routeDefinition = [
    {
        path: domainRootPath.userProfile,
        component: () => import("layouts/MainLayout.vue"),
        children: [
            {
                name: EditProfileRouteName,
                path: ":userId/edit",
                component: () =>
                    import("pages/userProfile/UserProfile2Page.vue"),
            },
        ],
    },
];

export { EditProfileRouteName };
export default routeDefinition;
