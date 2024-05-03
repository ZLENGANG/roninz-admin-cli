#!/usr/bin/env node
import pck from "../package.json";
import { Command } from "commander";
import "./helpers/log";
import fse from "fs-extra";
import { join } from "path";

const program = new Command();
const nodeVer = process.versions.node;

const start = async () => {
  console.log("roninz-admin-cli当前版本：", pck.version);
  console.log("当前nodejs版本：", nodeVer);
  console.log("================================");

  const commandDirs = await fse.readdirSync(join(__dirname, "./commands"));

  const filePromise: Promise<any>[] = [];
  commandDirs.forEach((fileName) => {
    filePromise.push(
      new Promise((res, rej) => {
        import(`./commands/${fileName}/index.js`).then((data) => {
          res(data);
        });
      })
    );
  });

  // 动态加载命令
  Promise.all(filePromise).then((res) => {
    res.forEach((data) => {
      const { command, description, action } = data.default.default;
      program.command(command).description(description).action(action);
    });
    program.parse();
  });
};

start();
