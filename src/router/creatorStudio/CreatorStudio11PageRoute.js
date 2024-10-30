const routeDefinition = [
    {
        path: "/studio",
        component: () => import("layouts/CreatorStudioLayout.vue"),
        children: [
            {
                name: "comic-chapter-edit",
                path: "comic/chapter/edit/:chapterId",
                component: () =>
                    import("pages/creatorStudio/CreatorStudio11Page.vue"),
            },
        ],
    },
];

export default routeDefinition;
