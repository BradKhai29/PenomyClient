const routeDefinition = [
    {
        path: "/studio",
        component: () => import("layouts/CreatorStudioLayout.vue"),
        children: [
            {
                name: "comic-chapter-detail",
                path: "comic/chapter/detail/:chapterId",
                component: () =>
                    import("pages/creatorStudio/CreatorStudio10Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
