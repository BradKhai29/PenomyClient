const routeDefinition = [
    {
        path: "/studio/comic",
        component: () => import("layouts/CreatorStudioLayout.vue"),
        children: [
            {
                path: "detail/:artworkId",
                component: () =>
                    import("pages/creatorStudio/CreatorStudio7Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
