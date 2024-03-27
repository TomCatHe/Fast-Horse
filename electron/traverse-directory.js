// 读取文件目录
const fs = require("fs");
const path = require("path");

function traverseDirectory(currentPath) {
    // 读取当前路径下的所有文件和子目录
    const files = fs.readdirSync(currentPath);

    const result = [];

    // 遍历当前路径下的所有文件和子目录
    files.forEach((file) => {
        // 拼接文件或子目录的完整路径
        const filePath = path.join(currentPath, file);
        // 获取文件或子目录的状态信息
        const stats = fs.statSync(filePath);

        if (!file.endsWith(".sql") && !stats.isDirectory()) {
            return;
        }
        // 构建文件或目录信息对象
        const fileInfo = {
            name: file,
            type: stats.isDirectory() ? "folder" : "file",
            path: filePath,
            parentFolder: path.basename(currentPath), // 添加存储上级目录的属性
        };

        // 将文件或目录信息对象添加到结果数组中
        result.push(fileInfo);

        // 如果是子目录，递归遍历子目录
        if (stats.isDirectory()) {
            fileInfo.children = traverseDirectory(filePath);
        }
    });

    return result;
}

module.exports = traverseDirectory;
