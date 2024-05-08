import { reactive, ref } from "vue";
import { useUserInfoStore } from "@/store/modules/user";
import { useRouter } from "vue-router";
import { userLoginApi } from "@/api/user";
const userInfoStore = useUserInfoStore();
const router = useRouter();
const styleIcon = {
    width: "16px",
    height: "16px",
    fontSize: "16px",
};
const loginForm = reactive({
    name: "",
    password: "",
});
const rules = reactive({
    name: [
        {
            required: true,
            message: "Please input Account ",
            trigger: "change",
        },
    ],
    password: [
        { required: true, message: "Please input Password", trigger: "change" },
    ],
});
const ruleFormRef = ref();
const loadingFlag = ref(false);
const submitForm = async (formEl) => {
    loadingFlag.value = true;
    if (!formEl)
        return (loadingFlag.value = false);
    formEl
        .validate()
        .then(async () => {
        const { data } = await userLoginApi(loginForm);
        const { userName, token, nickName } = data;
        loadingFlag.value = false;
        if (!token) {
            return alert("测试账号 test 和admin ，密码任意字符");
        }
        userInfoStore.login({
            userName,
            token,
            nickName,
        });
        router.push("/");
    })
        .catch((fields) => {
        loadingFlag.value = false;
        console.log("error submit!", fields);
    });
};
//#end;
return {
    slot: {},
    hook: {},
};
