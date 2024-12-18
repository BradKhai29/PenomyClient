const CreatorStudio16AnimeDetailRouteName = "studio-anime-detail";

const routeDefinition = [
    {
        path: "/studio",
        component: () => import("layouts/CreatorStudioLayout.vue"),
        children: [
            {
                name: CreatorStudio16AnimeDetailRouteName,
                path: "anime/chapter/detail/:chapterId",
                component: () =>
                    import(
                        "pages/creatorStudio/CreatorStudio16Page.DetailAnimeChap.vue"
                    ),
            },
        ],
    },
];

export default routeDefinition;
export { CreatorStudio16AnimeDetailRouteName };
