const routeDefinition = [
    {
        path: "/studio",
        component: () => import("layouts/CreatorStudioLayout.vue"),
        children: [
            {
                path: "series/create",
                component: () =>
                    import("pages/creatorStudio/CreatorStudio8Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
