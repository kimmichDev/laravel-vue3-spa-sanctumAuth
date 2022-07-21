import { createRouter, createWebHistory } from "vue-router";
import Login from "./pages/Login.vue";
import Home from "./pages/Home.vue";
import Register from "./pages/Register.vue";
import Dashboard from "./pages/Dashboard.vue";
import store from "./store";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: "home",
            path: "/",
            component: Home,
            meta: {
                middlware: "guest",
            }
        },
        {
            name: "login",
            path: "/login",
            component: Login,
            meta: {
                middlware: "guest",
            }
        },
        {
            name: "register",
            path: "/register",
            component: Register,
            meta: {
                middlware: "guest",
            }
        },
        {
            name: "dashboard",
            path: "/dashboard",
            component: Dashboard,
            meta: {
                middlware: "auth",
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.middlware == "auth") {
        if (store.state.auth.auth) {
            next();
        } else {
            next({ name: "login" });
        }
    } else {
        if (to.name == "login" || to.name == "register") {
            if (store.state.auth.auth) {
                next({ name: "dashboard" });
            } else {
                next();
            }
        }
        else {
            next();
        }
    }


});

export default router;