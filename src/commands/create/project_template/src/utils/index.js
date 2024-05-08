import router from "@/router";
/**
 * 获取css全局变量
 * @param {string} cssValueName css全局变量名
 * @returns {string} 颜色
 */
export const getCssValue = (cssValueName) => {
    try {
        return getComputedStyle(document.documentElement).getPropertyValue(cssValueName);
    }
    catch (_a) {
        return "";
    }
};
/**
 * 设置css全局变量
 * @param {string}cssName 全局css变量
 * @param {string}cssValue 颜色
 */
export const setCssValue = (cssName, cssValue) => {
    try {
        document.documentElement.style.setProperty(cssName, cssValue);
    }
    catch (error) {
        console.error(error);
    }
};
// 切换主题
export const switchThemeColor = (themeName) => {
    window.document.documentElement.setAttribute("data-theme", themeName);
};
// 获取LocalStorage
export const getLocalStorage = (keyName) => {
    if (!keyName)
        return null;
    const ls = localStorage.getItem(keyName);
    if (!ls)
        return null;
    return JSON.parse(ls);
};
/**
 *设置LocalStorage
 * @param {string} keyName
 * @param {object} value
 * @returns {boolean}
 */
export const setLocalStorage = (keyName, value) => {
    if (!keyName)
        return false;
    localStorage.setItem(keyName, JSON.stringify(value));
    return true;
};
/**
 * 删除LocalStorage
 * @param {string} keyName 删除key
 * @param {Boolean} isAll 是否清空LocalStorage
 */
export const delLocalStorage = (keyName, isAll = false) => {
    if (isAll)
        localStorage.clear();
    localStorage.removeItem(keyName);
};
/**
 * 验证权限
 * 权限从当前路由下meta对象的permission中获取
 */
export const hasPermission = (el, binding) => {
    const { arg, value } = binding;
    const path = router.currentRoute.value.fullPath;
    const routers = router.getRoutes();
    const routerObj = routers.find((item) => item.path === path);
    if (routerObj && routerObj.meta) {
        const { permission } = routerObj.meta;
        if (Object.prototype.toString.call(permission) !== "[object Array]")
            return;
        const flag = permission.some((item) => item === arg || item === value);
        if (!flag)
            el.parentNode.removeChild(el);
    }
};
