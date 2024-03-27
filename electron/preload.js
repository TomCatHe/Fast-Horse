const { contextBridge, ipcRenderer } = require("electron/renderer");
const traverseDirectory = require("./traverse-directory");
const readFileContent = require("./read-file-content");
const getAllFiles = require("./get-all-files");

const directoryInfo = traverseDirectory("C:\\Users\\hecke\\Desktop\\testnodejs");

contextBridge.exposeInMainWorld("electronAPI", {
    openFile: () => directoryInfo,
    readFileContent: (filePath) => {
        return readFileContent(filePath);
    },
    getAllFiles: (directory) => {
        return getAllFiles(directory);
    },
});
