import Vue from "vue";

import "normalize.css/normalize.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/styles/index.scss";

import App from "./App";
import store from "./store";
import router from "./router";

import "@/icons";
import "@/permission";

Vue.config.productionTip = false;
Vue.use(ElementUI);

window.router = router;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
