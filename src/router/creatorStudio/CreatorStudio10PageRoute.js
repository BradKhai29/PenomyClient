const CreatorStudio10RouteNames = {
    ChapterDetail: "comic-chapter-creator-detail",
};

const routeDefinition = [
    {
        path: "/studio",
        component: () => import("layouts/CreatorStudioLayout.vue"),
        children: [
            {
                name: CreatorStudio10RouteNames.ChapterDetail,
                path: "comic/chapter/detail/:chapterId",
                component: () =>
                    import("pages/creatorStudio/CreatorStudio10Page.vue"),
            },
        ],
    },
];

export { CreatorStudio10RouteNames };
export default routeDefinition;
