import { createApp } from "vue";
import App from "./App.vue";

import vuetify from "./plugins/vuetify";
import router from "./Router";
import { createPinia } from "pinia";

import "@mdi/font/css/materialdesignicons.css";

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(createPinia());

app.mount("#app");
