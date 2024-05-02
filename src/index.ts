#!/usr/bin/env node
import pck from "../package.json";
import contact from "./commands/contact";
import { Command } from "commander";
import './helpers/log'

const program = new Command();
const nodeVer = process.versions.node;

const start = async () => {
  console.log("roninz-admin-cli当前版本：", pck.version);
  console.log("当前nodejs版本：", nodeVer);

  program.version(pck.version); // 设置版本

  program
    .command(contact.command)
    .description(contact.description)
    .action(contact.action);

  program.parse();
};

start();
