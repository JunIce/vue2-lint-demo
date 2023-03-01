import Vue from "vue";
import App from "./App.vue";
import vueCompositionApi, { createApp } from "@vue/composition-api";

Vue.config.productionTip = false;
Vue.use(vueCompositionApi);

createApp(App).mount("#app");
