const CreatorStudio11RouteNames = {
    ChapterEdit: "comic-chapter-creator-edit",
};

const routeDefinition = [
    {
        path: "/studio",
        component: () => import("layouts/CreatorStudioLayout.vue"),
        children: [
            {
                name: CreatorStudio11RouteNames.ChapterEdit,
                path: "comic/chapter/edit/:chapterId",
                component: () =>
                    import("pages/creatorStudio/CreatorStudio11Page.vue"),
            },
        ],
    },
];

export { CreatorStudio11RouteNames };
export default routeDefinition;
