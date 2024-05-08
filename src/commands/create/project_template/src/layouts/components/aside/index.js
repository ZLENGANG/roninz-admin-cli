import { ref } from "vue";
import { useSystemStore } from "@/store/modules/system";
import Menu from "./menu.vue";
import SubMenu from "./subMenu.vue";
import MenuItem from "./menu-item.vue";
//#hook:hook_1
const systemStore = useSystemStore();
const getMenuList = (routerList) => {
    if (!routerList || routerList.length === 0)
        return [];
    return routerList.map((router) => {
        var _a;
        //#hook:hook_2
        return {
            key: router.path,
            //#hook:hook_3
            title: router.path,
            icon: (_a = router === null || router === void 0 ? void 0 : router.meta) === null || _a === void 0 ? void 0 : _a.icon,
            children: getMenuList(router.children),
        };
    });
};
const items = ref(getMenuList(systemStore.routerList));
//#end;
() => {
    console.log(Menu, SubMenu, MenuItem, systemStore);
};
return {
    slot: {},
    hook: {
        hook_1: {
            i18n: {
                HOOK: function () {
                    return `import useI18n from "../../hooks/useLang";
          const { menuSwitchesToLang } = useI18n();`;
                },
            },
        },
        hook_2: {
            i18n: {
                HOOK: function () {
                    return `const title = menuSwitchesToLang(router.meta.title);`;
                },
            },
        },
        hook_3: {
            i18n: {
                HOOK: function () {
                    return `label: title,`;
                },
                FALSE: function () {
                    return `label: router.meta.title,`;
                },
            },
        },
    },
};
