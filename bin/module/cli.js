// import inquirer from 'inquirer'
import ora from "ora";
import chalk from "chalk";
import down from "download-git-repo";
import { mMkdir } from "../utils/fsSys.js";
const cli = (cmd) => {
    cmd
        .command("cli")
        .argument("<cliApps...>")
        .description("下载Cli模板")
        .action(() => {
        const spinner = ora(chalk.cyan("正在下载Cli模板...")).start();
        for (const cliApp of cmd.args) {
            mMkdir(cliApp).then(() => {
                down("MBlee/mb-root", cliApp, { clone: false }, (err) => {
                    spinner.succeed(chalk.green(err ? `下载至${cliApp}失败！` : `下载至${cliApp}成功`));
                });
            });
        }
    });
};
export { cli };
