const { contextBridge, ipcRenderer } = require("electron/renderer");
const traverseDirectory = require("./fileUtils");

const directoryInfo = traverseDirectory("/Users/hecker/Downloads/testfile");

contextBridge.exposeInMainWorld("electronAPI", {
    openFile: () => directoryInfo,
});
