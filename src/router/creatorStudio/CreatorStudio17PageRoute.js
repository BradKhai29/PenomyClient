const CreatorStudio17EditAnimeChapterRouteName = "studio-edit-anime-chapter";

const routeDefinition = [
    {
        path: "/studio",
        component: () => import("layouts/CreatorStudioLayout.vue"),
        children: [
            {
                name: CreatorStudio17EditAnimeChapterRouteName,
                path: "anime/chapter/edit/:chapterId",
                component: () =>
                    import(
                        "pages/creatorStudio/CreatorStudio17Page.EditAnimeChap.vue"
                    ),
            },
        ],
    },
];

export default routeDefinition;
export { CreatorStudio17EditAnimeChapterRouteName };
