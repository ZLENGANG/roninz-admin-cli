const whiteList = ["/login", "/404"];
const isWhiteListPage = (path) => {
    return whiteList.find((item) => item === path);
};
export default isWhiteListPage;
