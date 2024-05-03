export const questionList = [
    {
        type: "input",
        name: "version",
        message: "请输入项目的版本号",
        default: "0.0.0",
        validate(input, answers) {
            const str = input.split(".");
            if (str.length !== 3)
                return "input format(0.0.0)";
            const flag = str.every((currentValue) => Number(currentValue) >= 0);
            if (!flag)
                return "please number";
            return flag;
        },
    },
];
