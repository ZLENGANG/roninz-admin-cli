import { defineStore } from "pinia";
import { store } from "../index";
export const useUserInfoStore = defineStore({
    id: "user",
    state: () => ({
        nickName: "",
        userName: "",
        token: "",
        role: "",
        routerList: [],
    }),
    actions: {
        dropLogin() {
            this.userName = "";
            this.token = "";
            this.role = "";
            this.routerList = [];
        },
        getToken() {
            return this.token;
        },
        login(params) {
            const { userName, token, nickName } = params;
            this.userName = userName;
            this.token = token;
            this.nickName = nickName;
        },
        setUserInfo(role, routerList) {
            this.role = role;
            this.routerList = routerList;
        },
        async getUserInfo() {
            return this.routerList;
        },
    },
    persist: {
        paths: ["nickName", "userName", "token"],
    },
});
export const useUserInfoStoreWithOut = () => {
    return useUserInfoStore(store);
};
