import Vue from "vue";
import Router from "vue-router";

import Front from "./Front/Front.vue";
import FindUser from "./FindUser/FindUser.vue";
import FindAbo from "./FindAbo/FindAbo.vue";
import FindOneUser from "./FindUser/FindOneUser.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            components: {
                mainView: Front
            }
        },
        {
            path: "/finduser",
            name: "finduser",
            components: {
                mainView: FindUser
            }
        },
        {
            path: "/finduser/:id",
            name: "finduserid",
            components: {
                mainView: FindOneUser
            }
        },
        {
            path: "/findabo",
            name: "findabo",
            components: {
                mainView: FindAbo
            }
        }
    ]
});