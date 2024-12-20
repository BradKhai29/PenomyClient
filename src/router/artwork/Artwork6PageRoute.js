import { domainRootPath } from "../common/DomainRootPath";

const Artwork6AnimeChapterDetailRouteName = "user-anime-chapter-detail";

// The route definition of artwork-6 page.
// The definition must be declared as an array of route-objects.
const routeDefinition = [
    {
        path: domainRootPath.artwork,
        component: () => import("layouts/OverlayMainLayout.vue"),
        children: [
            {
                name: Artwork6AnimeChapterDetailRouteName,
                path: "anime/:artworkId/chapter/:chapterId",
                component: () =>
                    import(
                        "src/pages/artwork/Artwork6Page.AnimeChapterDetail.vue"
                    ),
            },
        ],
    },
];

export default routeDefinition;
export { Artwork6AnimeChapterDetailRouteName };
