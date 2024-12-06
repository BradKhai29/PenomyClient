// Auth page routes section.
import auth1PageRoute from "./auth/Auth1PageRoute";
import auth2PageRoute from "./auth/Auth2PageRoute";
import auth3PageRoute from "./auth/Auth3PageRoute";
import auth4PageRoute from "./auth/Auth4PageRoute";
import auth5PageRoute from "./auth/Auth5PageRoute";
import auth6PageRoute from "./auth/Auth6PageRoute";

// Artwork page routes section.
import artwork1PageRoute from "./artwork/Artwork1PageRoute";
import artwork3PageRoute from "./artwork/Artwork3PageRoute";
import artwork4PageRoute from "./artwork/Artwork4PageRoute";
import artwork5PageRoute from "./artwork/Artwork5PageRoute";

// Creator studio page routes section.
import creatorStudio1PageRoute from "./creatorStudio/CreatorStudio1PageRoute";
import creatorStudio2PageRoute from "./creatorStudio/CreatorStudio2PageRoute";
import creatorStudio3PageRoute from "./creatorStudio/CreatorStudio3PageRoute";
import creatorStudio4PageRoute from "./creatorStudio/CreatorStudio4PageRoute";
import creatorStudio5PageRoute from "./creatorStudio/CreatorStudio5PageRoute";
import creatorStudio6PageRoute from "./creatorStudio/CreatorStudio6PageRoute";
import creatorStudio7PageRoute from "./creatorStudio/CreatorStudio7PageRoute";
import creatorStudio8PageRoute from "./creatorStudio/CreatorStudio8PageRoute";
import creatorStudio9PageRoute from "./creatorStudio/CreatorStudio9PageRoute";
import creatorStudio10PageRoute from "./creatorStudio/CreatorStudio10PageRoute";
import creatorStudio11PageRoute from "./creatorStudio/CreatorStudio11PageRoute";
import creatorStudio12PageRoute from "./creatorStudio/CreatorStudio12PageRoute";
import creatorStudio22PageRoute from "./creatorStudio/CreatorStudio22PageRoute";
import creatorStudio25PageRoute from "./creatorStudio/CreatorStudio25PageRoute";

// Guest page routes section.
import guestPageRoute from "./guest/GuestViewHistoryPageRoute";

// User profile page routes section.
import userProfile1PageRoute from "./userProfile/UserProfile1PageRoute";
import userPost1PageRoute from "./userpost/UserPost1PageRoute";
import userPost2PageRoute from "./userpost/UserPost2PageRoute";

// Creator profile page routes section.
import creatorProfile1PageRoute from "./creatorProfile/CreatorProfile1PageRoute";

// Social media page routes section.
import socialMedia1PageRoute from "./socialMedia/SocialMedia1PageRoute";
import socialMedia2PageRoute from "./socialMedia/SocialMedia2PageRoute";
import socialMedia3PageRoute from "./socialMedia/SocialMedia3PageRoute";

// Become creator page routes section.
import becomeCreatorPageRoute from "./become_creator/BecomeCreatorPageRoute";

// Always leave this as last one, but you can also remove it
const errorNotFoundPageRoute = {
    path: "/:catchAll(.*)*",
    component: () => import("src/pages/ErrorNotFoundPage.vue"),
};

const routes = [
    // Auth routes.
    ...auth1PageRoute,
    ...auth2PageRoute,
    ...auth3PageRoute,
    ...auth4PageRoute,
    ...auth5PageRoute,
    ...auth6PageRoute,
    // Artwork routes.
    ...artwork1PageRoute,
    ...artwork3PageRoute,
    ...artwork4PageRoute,
    ...artwork5PageRoute,
    // Creator studio routes.
    ...creatorStudio1PageRoute,
    ...creatorStudio2PageRoute,
    ...creatorStudio3PageRoute,
    ...creatorStudio4PageRoute,
    ...creatorStudio5PageRoute,
    ...creatorStudio6PageRoute,
    ...creatorStudio7PageRoute,
    ...creatorStudio8PageRoute,
    ...creatorStudio9PageRoute,
    ...creatorStudio10PageRoute,
    ...creatorStudio11PageRoute,
    ...creatorStudio12PageRoute,
    ...creatorStudio22PageRoute,
    ...creatorStudio25PageRoute,
    // Guest routes.
    ...guestPageRoute,
    // User profile routes.
    ...userProfile1PageRoute,
    // Creator profile routes.
    ...creatorProfile1PageRoute,
    // Social media routes.
    ...socialMedia1PageRoute,
    ...socialMedia2PageRoute,
    ...socialMedia3PageRoute,
    // Become creator route.
    ...becomeCreatorPageRoute,
    ...userPost1PageRoute,
    ...userPost2PageRoute,
    // Other routes.
    errorNotFoundPageRoute,
];

export default routes;
