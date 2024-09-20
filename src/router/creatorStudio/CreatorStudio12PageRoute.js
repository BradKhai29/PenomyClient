const routeDefinition = [
    {
        path: "/studio",
        component: () => import("layouts/CreatorStudioLayout.vue"),
        children: [
            {
                path: "anime/create",
                component: () =>
                    import("pages/creatorStudio/CreatorStudio5Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
