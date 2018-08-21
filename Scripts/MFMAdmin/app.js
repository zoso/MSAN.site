import "babel-polyfill";

import Vue from 'vue';
//import VeeValidate from 'vee-validate';
import router from './router';
//import attributeNo from './no.js';
import App from "./App.vue";

router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0);
    next();
});

/* const config = {
    classes: true,
    classNames: {
        invalid: 'c-inputform__input--invalid'
    },
    locale: 'nb',
    dictionary: {
        nb: { messages: attributeNo.messages, attributes: attributeNo.attributes }
    }
}

Vue.use(VeeValidate, config);
 */
const app = new Vue({
    el: '#mfmadmin-app',
    router,
    components: { App },
    template: '<App/>'
});