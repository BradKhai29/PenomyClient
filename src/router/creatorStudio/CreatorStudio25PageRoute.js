const routeDefinition = [
    {
        path: "/studio",
        component: () => import("layouts/CreatorStudioLayout.vue"),
        children: [
            {
                path: "bin",
                component: () =>
                    import("pages/creatorStudio/CreatorStudio25Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
