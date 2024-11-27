#!/usr/bin/env node
import { Command } from 'commander';
import { help } from './module/help.js';
import { cli } from './module/cli.js';
const cmd = new Command();
cmd.useCmd = function (cmd) {
    cmd && cmd(this);
};
cmd.version('1.0.0');
/* 命令行模块 */
cmd.useCmd(cli);
cmd.useCmd(help);
cmd.parse();
