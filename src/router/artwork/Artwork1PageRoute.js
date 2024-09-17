import { domainRootPath } from "../common/DomainRootPath";

// The route definition of artwork-1 page.
// The definition must be declared as an array of route-objects.
const routeDefinition = [
    {
        path: "/",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            {
                path: "",
                component: () => import("pages/artwork/Artwork1Page.vue"),
            },
            {
                path: "artwork2",
                component: () => import("pages/artwork/ArtWorkDetailMangaPage.vue"),
            }
        ],
    },
    {
        path: domainRootPath.artwork,
        component: () => import("layouts/MainLayout.vue"),
        children: [
            {
                path: "",
                component: () => import("pages/artwork/Artwork1Page.vue"),
            },
            {
                path: "mangadetail",
                component: () => import("pages/artwork/MangaDetailPage.vue")
            }
        ],
    },
];

export default routeDefinition;
