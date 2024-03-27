// 读取文件内容
const fs = require("fs");
const jschardet = require("jschardet");
const iconv = require("iconv-lite");

// 读取文件内容并识别编码格式
function readFileContent(filePath) {
    const buffer = fs.readFileSync(filePath);
    // 识别文件的编码格式
    const result = jschardet.detect(buffer);
    // 将文件内容从检测到的编码格式转换为UTF-8
    const content = iconv.decode(buffer, result.encoding || "utf-8");
    return content;
}

module.exports = readFileContent;
