const fs = require("fs");
const path = require("path");

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    const filepaths = files.map((file) => {
        const filePath = path.join(dir, file);
        const isDirectory = fs.lstatSync(filePath).isDirectory();
        if (isDirectory) {
            return walkDir(filePath);
        } else {
            return filePath;
        }
    });
    return filepaths.flat();
}

module.exports = walkDir;
