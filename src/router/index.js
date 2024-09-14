import { route } from "quasar/wrappers";
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
    const Router = createRouter({
        routes,
        linkActiveClass: "link-active",
        linkExactActiveClass: "link-exact-active",
        scrollBehavior: (_, __, savedPosition) => {
            if (savedPosition) {
                return savedPosition;
            }

            return { left: 0, top: 0 };
        },
        // Leave this as is and make changes in quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        history: createWebHistory(process.env.VUE_ROUTER_BASE),
    });

    return Router;
});
