const { contextBridge, ipcRenderer } = require("electron/renderer");
const traverseDirectory = require("./traverse-directory");
const readFileContent = require("./read-file-content");

const directoryInfo = traverseDirectory("/Users/hecker/Downloads/testfile");

contextBridge.exposeInMainWorld("electronAPI", {
    openFile: () => directoryInfo,
    readFileContent: (filePath) => {
        return readFileContent(filePath);
    },
});
