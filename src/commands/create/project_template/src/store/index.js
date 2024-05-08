import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const store = createPinia();
store.use(piniaPluginPersistedstate);
const initStore = (app) => {
    app.use(store);
};
export { store, initStore };
