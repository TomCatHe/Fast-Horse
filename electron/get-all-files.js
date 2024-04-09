// 引入文件系统模块和路径模块
const fs = require("fs");
const path = require("path");

// 递归读取指定目录下的所有 SQL 文件
function walkDir(dir) {
  // 读取目录下的所有文件
  const files = fs.readdirSync(dir);
  const fileObjects = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const ext = path.extname(file);
    if (ext.toLowerCase() === ".sql") {
      fileObjects.push({
        fileName: file,
        filePath: filePath,
        parentDirectory: dir,
      });
    }
  });

  // 按照文件名的首字母进行排序
  fileObjects.sort((a, b) =>
    a.fileName.localeCompare(b.fileName, "zh", { sensitivity: "base" })
  );

  return fileObjects;
}

module.exports = walkDir;
