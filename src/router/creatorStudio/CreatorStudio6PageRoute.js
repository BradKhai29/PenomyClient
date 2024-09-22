const routeDefinition = [
    {
        path: "/studio/comic",
        component: () => import("layouts/CreatorStudioLayout.vue"),
        children: [
            {
                path: "create",
                component: () =>
                    import("pages/creatorStudio/CreatorStudio5Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
