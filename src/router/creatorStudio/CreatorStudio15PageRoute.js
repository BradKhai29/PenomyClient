const routeDefinition = [
    {
        path: "/studio",
        component: () => import("layouts/CreatorStudioLayout.vue"),
        children: [
            {
                name: "create-anime-chapter",
                path: "anime/chapters/create",
                component: () =>
                    import(
                        "pages/creatorStudio/CreatorStudio15Page.CreateAnimeChap.vue"
                    ),
            },
        ],
    },
];

export default routeDefinition;
