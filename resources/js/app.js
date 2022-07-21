require('./bootstrap');

import App from "./layout/App.vue";
import router from "./router";
import store from "./store";
import { createApp } from "vue"
const app = createApp(App);

import ExampleComponent from "./components/ExampleComponent.vue";


app.component("example-component", ExampleComponent);

app.use(router).use(store);
app.mount('#app');