const routeDefinition = [
    {
        path: "/studio",
        component: () => import("layouts/CreatorStudioLayout.vue"),
        children: [
            {
                path: "artworks",
                component: () =>
                    import("pages/creatorStudio/CreatorStudio1Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
