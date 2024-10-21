const routeDefinition = [
    {
        path: "/studio/comic/chapters",
        component: () => import("layouts/CreatorStudioLayout.vue"),
        children: [
            {
                name: "create-chapter",
                path: "create",
                component: () =>
                    import("pages/creatorStudio/CreatorStudio9Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
