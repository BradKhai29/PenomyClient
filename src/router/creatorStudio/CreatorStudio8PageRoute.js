const routeDefinition = [
    {
        path: "/studio/comic",
        component: () => import("layouts/CreatorStudioLayout.vue"),
        children: [
            {
                path: "edit/:id",
                component: () =>
                    import("pages/creatorStudio/CreatorStudio8Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
