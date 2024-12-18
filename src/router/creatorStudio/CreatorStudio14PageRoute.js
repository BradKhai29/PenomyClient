const routeDefinition = [
    {
        path: "/studio",
        component: () => import("layouts/CreatorStudioLayout.vue"),
        children: [
            {
                path: "anime/edit/:artworkId",
                component: () =>
                    import(
                        "pages/creatorStudio/CreatorStudio14Page.EditAnime.vue"
                    ),
            },
        ],
    },
];

export default routeDefinition;
