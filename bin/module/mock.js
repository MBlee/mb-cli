var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import chalk from "chalk";
import clipboard from "clipboardy";
import { mkFile, rdFile, isFile, fileType } from "../utils/fsSys.js";
import mockjs from "mockjs";
const mockData = (json) => {
    const jsonObj = JSON.parse(json);
    return mockjs.mock(jsonObj);
};
const mock = (cmd) => {
    cmd
        .command("mock")
        .argument("[template]", "根据文件模拟数据", "zzzzzz")
        .description("模拟生成数据")
        .action((template) => __awaiter(void 0, void 0, void 0, function* () {
        template += '.json';
        const type = yield isFile(template);
        if (type === fileType.NOTEXIST) {
            yield mkFile(template, '{}');
            const res = yield rdFile(template);
            const mockRes = JSON.stringify(mockData(res));
            console.log(chalk.cyan(mockRes));
            clipboard.writeSync(res);
        }
        else if (type === fileType.ISFILE) {
            console.log(chalk.blue(`文件${template}已存在`));
            const res = yield rdFile(template);
            const mockRes = JSON.stringify(mockData(res));
            console.log(chalk.cyan(mockRes));
            clipboard.writeSync(res);
        }
        else if (type === fileType.ISDIR) {
            console.log(chalk.red(`已有同名文件夹${template}`));
        }
    }));
};
export { mock };
