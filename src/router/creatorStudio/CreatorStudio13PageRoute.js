const routeDefinition = [
    {
        path: "/studio",
        component: () => import("layouts/CreatorStudioLayout.vue"),
        children: [
            {
                path: "anime/detail/:artworkId",
                component: () =>
                    import(
                        "pages/creatorStudio/CreatorStudio13Page.DetailAnime.vue"
                    ),
            },
        ],
    },
];

export default routeDefinition;
