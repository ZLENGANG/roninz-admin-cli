import { join } from "path";
import { AnyObject } from "../type";
import fse from "fs-extra";

const tempPath = "project_template";

export const createProject = (opts: AnyObject) => {
  console.log(opts, "opts");

  const files = fse.readdirSync(join(__dirname, `../${tempPath}`));
  console.log(files);
};
