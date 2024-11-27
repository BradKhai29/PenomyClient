const routeDefinition = [
    {
        path: "/guest",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            {
                path: "history",
                component: () => import("pages/guest/GuestViewHistoryPage.vue"),
            },
        ],
    },
];

export default routeDefinition;
