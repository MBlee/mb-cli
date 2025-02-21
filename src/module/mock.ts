import { Command } from "commander";
// import inquirer from 'inquirer'
import ora from "ora";
import chalk from "chalk";
import clipboard from "clipboardy";
import down from "download-git-repo";
import { mkFile,rdFile,isFile,fileType } from "../utils/fsSys.js";
import mockjs from "mockjs";
const mockData = (json:string)=>{
    const jsonObj = JSON.parse(json)
    return mockjs.mock(jsonObj)
}
const mock = (cmd: Command) => {
	cmd
		.command("mock")
		.argument("[template]","根据文件模拟数据","zzzzzz")
		.description("模拟生成数据")
		.action(async(template) => {
            template += '.json'
            const type = await isFile(template)
            if(type===fileType.NOTEXIST){
                await mkFile(template,'{}')
                const res = await rdFile(template)
                const mockRes = JSON.stringify(mockData(res))
                console.log(chalk.cyan(mockRes))
                clipboard.writeSync(res)
            }else if(type===fileType.ISFILE){
			    console.log(chalk.blue(`文件${template}已存在`));
                const res = await rdFile(template)
                const mockRes = JSON.stringify(mockData(res))
                console.log(chalk.cyan(mockRes))
                clipboard.writeSync(res)
            }else if(type===fileType.ISDIR){
    			console.log(chalk.red(`已有同名文件夹${template}`));
            }
		});
};

export { mock };
