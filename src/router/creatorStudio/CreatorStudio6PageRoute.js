const routeDefinition = [
    {
        path: "/studio/comic",
        component: () => import("layouts/CreatorStudioLayout.vue"),
        children: [
            {
                path: "create",
                component: () =>
                    import("pages/creatorStudio/CreatorStudio6Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
