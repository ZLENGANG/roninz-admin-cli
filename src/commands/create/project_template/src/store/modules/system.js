import { defineStore } from "pinia";
import { store } from "../index";
import router from "@/router";
export const useSystemStore = defineStore({
    id: "system",
    state: () => ({
        lang: "zhCN",
        themeValue: "normal",
        isCollapse: false,
        removeRouterList: [],
        routerList: [],
        tabBarList: [],
    }),
    actions: {
        setLang(lang) {
            this.lang = lang;
        },
        addTabBar(tab) {
            const find = this.tabBarList.find((item) => item.path === tab.path);
            if (find)
                return;
            this.tabBarList.push(tab);
        },
        delTabbar(path) {
            this.tabBarList = this.tabBarList.filter((item) => item.path !== path);
            if (path === window.location.hash.replace("#", "") &&
                this.tabBarList.length > 0) {
                router.push(this.tabBarList[this.tabBarList.length - 1].path);
            }
        },
        switchCollapse() {
            this.isCollapse = !this.isCollapse;
        },
        resetSystem() {
            this.removeRouterList.forEach((item) => item());
            this.removeRouterList = [];
            this.tabBarList = [];
        },
        setRouterList(routerList) {
            this.routerList = routerList;
        },
        addRemoveRouterList(router) {
            this.removeRouterList.push(router);
        },
    },
    persist: {
        paths: ["isCollapse", "routerList", "tabBarList", "themeValue", "lang"],
    },
});
export const useSystemStoreWithOut = () => {
    return useSystemStore(store);
};
