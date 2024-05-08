const fse = require("fs-extra");
const cp = require("child_process");
const copy = require("./copy");

const isExistTemp = fse.existsSync("dist/src/commands/create/project_template");
const param = process.argv[process.argv.length - 1];

if (param === "--watch") {
  if (isExistTemp) {
    console.log("模板存在");
    watch();
  } else {
    console.log("模板不存在，开始打包");
    build().then(() => {
      watch();
    });
  }
}

if (param === "--build") {
  build();
}

function watch() {
  console.log("开始监听...");
  cp.exec("npx tsc -b -w").stdout.on("data", (data) => {
    console.log(data);
  });
}

function build() {
  return new Promise(async (resolve, reject) => {
    const res = await cp.execSync("npx tsc -b");
    if (res) {
      console.log("复制模板");
      await fse.copySync(
        "src/commands/create/project_template",
        "dist/src/commands/create/project_template"
      );
      console.log("打包完成");
      copy();
      resolve();
    }
  });
}
