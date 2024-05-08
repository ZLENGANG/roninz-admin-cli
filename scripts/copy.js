const fse = require("fs-extra");
const { join, extname } = require("path");

const cwdUrl = process.cwd();
const destUrl = join(cwdUrl, "dist/src/commands/create/project_template_ts");

const getFileListAndIncludes = (startUrl, destUrl) => {
  return new Promise((res, rej) => {
    fse.readdir(startUrl, (err, files) => {
      if (err) throw err;
      const filePromiseAll = [];
      files.forEach((file) => {
        const filedir = join(startUrl, file);
        const stats = fse.statSync(filedir);
        const isFile = stats.isFile(); //是文件
        const isDir = stats.isDirectory(); //是文件夹
        if (isFile) {
          // 将tsconfig.json无法编译的文件复制到project_template
          if (extname(file) !== ".ts") {
            const copyToJs = destUrl.replace(
              "project_template_ts",
              "project_template"
            );
            fse.ensureDirSync(copyToJs); // 确保文件夹存在
            filePromiseAll.push(
              fse.copyFile(join(startUrl, file), join(copyToJs, file))
            );
          }
          filePromiseAll.push(
            fse.copyFile(join(startUrl, file), join(destUrl, file))
          );
        }
        if (isDir) {
          fse.mkdir(join(destUrl, file)).then(() => {
            getFileListAndIncludes(
              join(startUrl, file),
              join(destUrl, file)
            ).then((filePromiseAll) => {
              Promise.all(filePromiseAll);
            });
          });
        }
      });
      res(filePromiseAll);
    });
  });
};

module.exports = () => {
  fse.mkdir(destUrl).then(() => {
    getFileListAndIncludes(
      join(cwdUrl, "src", "commands", "create", "project_template"),
      destUrl,
      false
    ).then((filePromiseAll) => {
      Promise.all(filePromiseAll);
    });
  });
};
