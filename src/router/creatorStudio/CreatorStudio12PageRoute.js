const routeDefinition = [
    {
        path: "/studio",
        component: () => import("layouts/CreatorStudioLayout.vue"),
        children: [
            {
                path: "anime/create",
                component: () =>
                    import("pages/creatorStudio/CreatorStudio6Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
