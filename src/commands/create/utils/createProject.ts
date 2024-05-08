import { join, extname } from "path";
import { AnyObject } from "../type";
import fse from "fs-extra";

const tempPath = "project_template";

export const createProject = (answers: AnyObject) => {
  const files = fse.readdirSync(join(__dirname, `../${tempPath}`), {
    withFileTypes: true
  });

  files.forEach(item => {
    const fileName = item.name
    const itemPath = join(item.path, fileName)

    // const targetPath = join(process.cwd(), answers.projectName, itemPath.split(tempPath)[1])

    if (fileName === 'src') {
      // 在运行目录下增加src文件夹
      fse.ensureDirSync(join(process.cwd(), answers.projectName, "src"))

      const originSrcPath = join(__dirname, `../${tempPath}/src`)
      handleOriginSrcDir(originSrcPath, answers)
    }
  })
};


async function handleOriginSrcDir(originSrcPath: string, answers: AnyObject) {
  const projectName = answers.projectName
  const originSrcFiles = await fse.readdir(originSrcPath, { withFileTypes: true })

  const allFileList = originSrcFiles.filter(item => item.isFile())
  const vueFileNameList = allFileList
    .filter(item => extname(item.name) === '.vue')
    .map((item) => item.name.replace(extname(item.name), ""));

  if (vueFileNameList.length === 0) {

  } else {
    allFileList.forEach(item => {
      const fileDir = join(originSrcPath, item.name)
      const targetPath = join(process.cwd(), projectName, fileDir.split(tempPath)[1])
      const fileName = item.name.replace(extname(item.name), "")

      // 如果是vue文件
      if (vueFileNameList.includes(fileName)) {
        if (extname(item.name) === '.vue') {
          const writeVueFlag = isWriteVueFile(answers,)
        }
      } else {

      }
    })
  }


}