const routeDefinition = [
    {
        path: "/studio",
        component: () => import("layouts/CreatorStudioLayout.vue"),
        children: [
            {
                path: "overview",
                component: () =>
                    import("pages/creatorStudio/CreatorStudio1Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
