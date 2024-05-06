import { join } from "path";
import { AnyObject } from "../type";
import fse from "fs-extra";

const tempPath = "project_template";

export const createProject = (opts: AnyObject) => {
  console.log(opts, "opts");

  const files = fse.readdirSync(join(__dirname, `../${tempPath}`), {
    withFileTypes: true
  });

  files.forEach(item => {
    const fileName = item.name
    const itemPath = join(item.path, fileName)

    const targetPath = join(process.cwd(), opts.projectName, itemPath.split(tempPath)[1])

    if (fileName === 'src') {
      fse.ensureDirSync(join(process.cwd(), opts.projectName, "src"))

    }
  })
};
