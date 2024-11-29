import { domainRootPath } from "../common/DomainRootPath";

const Art5RouteNames = {
    ComicChapterDetail: "comic-chapter-detail",
};

const routeDefinition = [
    {
        path: domainRootPath.artwork,
        component: () => import("layouts/OverlayMainLayout.vue"),
        children: [
            {
                name: Art5RouteNames.ComicChapterDetail,
                path: "comic/:comicId/chapter/:chapterId",
                component: () => import("pages/artwork/Artwork5Page.vue"),
            },
        ],
    },
];

export { Art5RouteNames };
export default routeDefinition;
