import { CliAnswers, AnyObject, QuestionExtend } from "../type";

export const questionList: QuestionExtend[] = [
  {
    type: "input",
    name: "version",
    message: "请输入项目的版本号",
    default: "0.0.0",
    validate(input: string) {
      const str = input.split(".");
      if (str.length !== 3) return "请输入正确的格式，如(0.0.0)";
      const flag = str.every((currentValue: any) => Number(currentValue) >= 0);
      if (!flag) return "请输入数字";
      return flag;
    },
  },
  {
    type: "list",
    name: "tempPath",
    message: "请选择开发的语言",
    choices: [
      {
        name: "TypeScript",
        value: "project_template_ts",
      },
      {
        name: "JavaScript",
        value: "project_template",
      },
    ],
  },
  {
    type: "list",
    name: "ui",
    message: "请选择UI框架",
    choices: [
      {
        name: "Element-UI",
        value: "element",
      },
      {
        name: "Ant Design Vue",
        value: "antdv",
      },
    ],
  },
  {
    type: "list",
    name: "css",
    message: "请选择一个css预处理器",
    choices: [
      {
        name: "scss",
        value: "scss",
      },
      {
        name: "less",
        value: "less",
      },
    ],
  },
  {
    type: "checkbox",
    name: "features",
    message: "请选择需要的功能",
    choices: [
      {
        name: "eslint and Prettier",
        value: "eslint",
      },
      {
        name: "i18n国际化",
        value: "i18n",
      },
    ],
    default: ["eslint"],
  },
  {
    type: "checkbox",
    name: "model",
    message: "请选择需要的模块（多选）",
    choices: [
      {
        name: "echars",
        value: "echarts",
      },
      {
        name: "three.js",
        value: "three",
      },
    ],
    default: ["echarts"],
  },
];

export const formatAnswers = (answers: CliAnswers) => {
  const { features, model } = answers;

  features.forEach((key) => {
    answers[key] = features.includes(key);
  });

  model.forEach((key) => {
    answers[key] = model.includes(key);
  });

  return answers;
};
