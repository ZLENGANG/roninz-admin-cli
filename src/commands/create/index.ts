import chalk from "chalk";
const action = () => {
  console.log(chalk.blue("creating..."));
};
export default {
  command: "create",
  description: "创建项目",
  action: action,
};
