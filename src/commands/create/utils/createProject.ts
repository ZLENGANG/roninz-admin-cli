import { join, extname } from "path";
import { CliAnswers } from "../type";
import fse from "fs-extra";
import { ConvertVue } from "./convertVue";

export const createProject = (answers: CliAnswers) => {
  const files = fse.readdirSync(join(__dirname, `../${answers.tempPath}`), {
    withFileTypes: true,
  });

  files.forEach((item) => {
    const fileName = item.name;
    const itemPath = join(item.path, fileName);

    // const targetPath = join(process.cwd(), answers.projectName, itemPath.split(tempPath)[1])

    if (fileName === "src") {
      // 在运行目录下增加src文件夹
      fse.ensureDirSync(join(process.cwd(), answers.projectName, "src"));

      const originSrcPath = join(__dirname, `../${answers.tempPath}/src`);
      handleOriginSrcDir(originSrcPath, answers);
    }
  });
};

async function handleOriginSrcDir(originSrcPath: string, answers: CliAnswers) {
  const projectName = answers.projectName;
  const originSrcFiles = await fse.readdir(originSrcPath, {
    withFileTypes: true,
  });

  const allFileList = originSrcFiles.filter((item) => item.isFile());
  const vueFileNameList = allFileList
    .filter((item) => extname(item.name) === ".vue")
    .map((item) => item.name.replace(extname(item.name), ""));

  if (vueFileNameList.length === 0) {
  } else {
    allFileList.forEach(async (item) => {
      // 原src路径下的文件路径
      const originSrcFilePath = join(originSrcPath, item.name);

      // 目标路径
      const targetPath = join(
        process.cwd(),
        projectName,
        originSrcFilePath.split(answers.tempPath)[1]
      );

      // 不含后缀的文件名
      const noExtfileName = item.name.replace(extname(item.name), "");

      // 如果是vue文件
      if (vueFileNameList.includes(noExtfileName)) {
        if (extname(item.name) === ".vue") {
          const reWriteVueFlag = isReWriteVueFile(answers, targetPath);
          if (reWriteVueFlag) {
            const convertVue = new ConvertVue({
              path: originSrcPath,
              fileName: noExtfileName,
              answers,
              model: ["hook_1"],
            });
            const vueFile = await convertVue.init();
            fse.outputFileSync(targetPath, vueFile);
          }
        }
      } else {
      }
    });
  }
}

function isReWriteVueFile(answers: CliAnswers, targetPath: string) {
  const file = targetPath.substring(
    targetPath.indexOf("src"),
    targetPath.length
  );

  const modelFile = {
    three: ["src/views/three/three.vue"],
  };

  for (const [key, value] of Object.entries(modelFile)) {
    if (!value.includes(file)) continue;
    if (typeof answers[key] === "boolean" && !answers[key]) {
      return false;
    }
  }

  return true;
}
