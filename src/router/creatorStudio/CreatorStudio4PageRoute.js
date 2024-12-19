const routeDefinition = [
    {
        path: "/studio",
        component: () => import("layouts/CreatorStudioLayout.vue"),
        children: [
            {
                path: "reported",
                component: () =>
                    import("pages/creatorStudio/CreatorStudio4Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
