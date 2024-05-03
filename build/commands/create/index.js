import chalk from "chalk";
import fse from "fs-extra";
import { join } from "path";
import inquirer from "inquirer";
import { questionList } from "./utils";
const userQuestion = (projectName) => {
    inquirer.prompt(questionList).then((res) => {
        console.log(res, "zlzlzl");
    });
};
const action = async (projectName) => {
    const cwdPath = process.cwd();
    const isExist = await fse.existsSync(join(cwdPath, projectName));
    if (isExist) {
        console.log(chalk.red(`项目名可能已存在，请更换项目名或者删除文件夹${projectName}`));
    }
    else {
        await fse.mkdirSync(`./${projectName}`);
        console.log(chalk.green(`项目创建成功`));
    }
};
export default {
    command: "create <app-name> ",
    description: "创建一个项目",
    action: action,
};
