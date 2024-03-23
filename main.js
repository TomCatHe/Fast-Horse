import { app, BrowserWindow } from 'electron';

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL('http://localhost:5173') // 使用 Vite 开发服务器的地址

  // 其他的 Electron 主进程处理代码...
}

app.whenReady().then(
    ()=> {
        createWindow()
    }
)
