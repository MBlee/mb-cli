import chalk from 'chalk';
import fs from 'fs';
export var fileType;
(function (fileType) {
    fileType[fileType["NOTEXIST"] = 0] = "NOTEXIST";
    fileType[fileType["ISFILE"] = 1] = "ISFILE";
    fileType[fileType["ISDIR"] = 2] = "ISDIR";
})(fileType || (fileType = {}));
const mMkdir = (dir) => new Promise((res) => {
    fs.mkdir(dir, { recursive: true }, err => {
        if (err) {
            return console.log(`创建文件夹${dir}失败`);
        }
        console.log(`创建文件夹${dir}成功`);
        res();
    });
});
const isFile = (file) => new Promise(res => {
    fs.stat(file, (err, stat) => {
        if (err)
            return res(fileType.NOTEXIST);
        if (stat.isFile()) {
            res(fileType.ISFILE);
        }
        else {
            res(fileType.ISDIR);
        }
    });
});
const mkFile = (file, content = '') => new Promise((res => {
    isFile(file).then((type) => {
        console.log('type', type);
        if (type === fileType.NOTEXIST) {
            fs.writeFile(file, content, err => {
                if (err)
                    return console.log(chalk.redBright(`创建文件${file}失败`));
                console.log(chalk.green(`创建文件${file}成功`));
                return res();
            });
        }
        else if (type === fileType.ISFILE) {
            console.log(chalk.cyanBright(`文件${file}已存在`));
        }
        else if (type === fileType.ISDIR) {
            console.log(chalk.redBright(`已有同名文件夹${file}`));
        }
    });
}));
const rdFile = (file) => new Promise((res) => {
    isFile(file).then((type) => {
        if (type !== fileType.ISFILE)
            return;
        const fileContent = fs.readFileSync(file).toString();
        return res(fileContent);
    });
});
export { mMkdir, mkFile, rdFile, isFile };
