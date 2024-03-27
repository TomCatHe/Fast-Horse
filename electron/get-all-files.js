const fs = require("fs");
const path = require("path");

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    const fileObjects = files.map((file) => {
        const filePath = path.join(dir, file);
        const isDirectory = fs.lstatSync(filePath).isDirectory();
        if (isDirectory) {
            return walkDir(filePath); // 递归处理子目录
        } else {
            const ext = path.extname(file);
            if (ext.toLowerCase() === '.sql') {
                return {
                    fileName: file,
                    filePath: filePath,
                    parentDirectory: dir
                };
            } else {
                return null;  // 过滤掉非SQL文件
            }
        }
    });
    return fileObjects.flat().filter((file) => file !== null);  // 移除空entries
}

module.exports = walkDir;
