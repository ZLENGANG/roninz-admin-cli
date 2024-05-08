import chalk from "chalk";
import fse from "fs-extra";
import { join } from "path";
// @ts-ignore
import inquirer from "inquirer";
import { questionList } from "./utils";
// @ts-ignore
import ora from "ora";
import { createProject } from "./utils/createProject";
import { AnyObject } from "./type";

const spinner = ora("正在创建项目...");

const userQuestion = (projectName: string) => {
  inquirer.prompt(questionList).then((answers: AnyObject) => {
    spinner.start();
    createProject({
      ...answers,
      projectName,
    });
    setTimeout(() => {
      spinner.stop();
    }, 1000);
  });
};

const action = async (projectName: string) => {
  const cwdPath = process.cwd();
  // const isExist = await fse.existsSync(join(cwdPath, projectName));
  // if (isExist) {
  //   console.log(
  //     chalk.red(`项目名可能已存在，请更换项目名或者删除文件夹${projectName}`)
  //   );
  // } else {
    userQuestion(projectName);
  // }
};

export default {
  command: "create <app-name> ",
  description: "创建一个项目",
  action: action,
};
