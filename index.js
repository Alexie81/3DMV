const electron = require('electron');
const path = require('path');
const fs = require('fs');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
//start.js
// let {PythonShell} = require("python-shell");
// PythonShell.run("python_code.py",null,function(err, results){
//   console.log(results);
// });
let mainWindow;
//get url of window: let currentURL = mainWindow.webContents.getURL();

const iconPath = path.join(__dirname, "public/logo", "app.png");

// For security warnings ------
//-----------
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
//-----------
// ----------------------------

// this should be placed at top of main.js to handle setup events quickly
app.on('ready', () => {
  createWindow()
})

function createWindow() {
  // server.run();
  // Create the browser window.
  const {
    width,
    height
  } = electron.screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    show: true,
    autoHideMenuBar: true,
    title: '3DMV',
    icon: iconPath,
    titleBarStyle: "hidden",
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: __dirname + '/preload.js'
    }
  });
  mainWindow.loadURL(__dirname + '/public/index.html');

  mainWindow.webContents.once('dom-ready', function () {
    mainWindow.show();
    mainWindow.maximize();
    mainWindow.webContents.openDevTools()
  });



  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // server.close();
    mainWindow = null;
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//app.on('ready', createWindow) // <== this is extra so commented, enabling this can show 2 windows..


// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    // PHP SERVER QUIT
    // server.close();
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});