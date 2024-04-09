const { contextBridge, ipcRenderer } = require("electron/renderer");
const traverseDirectory = require("./traverse-directory");
const readFileContent = require("./read-file-content");
const getAllFiles = require("./get-all-files");
const getAllFolders = require("./get-all-folders");

const directoryInfo = traverseDirectory("/Users/hecker/Downloads/testfile");

contextBridge.exposeInMainWorld("electronAPI", {
    openFile: () => directoryInfo,
    readFileContent: (filePath) => {
        return readFileContent(filePath);
    },
    getAllFiles: (directory) => {
        return getAllFiles(directory);
    },
    getAllFolders: (directory) => {
        return getAllFolders(directory);
    },
});
